import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import rateLimit from '@/lib/rate-limit';

// Types
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

// Rate limiting for contact form (5 submissions per hour per IP)
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const identifier = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      'anonymous';
    try {
      await limiter.check(5, identifier); // 5 requests per hour
    } catch {
      return NextResponse.json(
        { 
          error: 'Too many submissions. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message', 'inquiryType'];
    const missingFields = requiredFields.filter(field => !body[field as keyof ContactFormData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          missingFields,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      );
    }

    // Validate inquiry type
    const validInquiryTypes = ['sales', 'support', 'partnership', 'media', 'careers', 'other'];
    if (!validInquiryTypes.includes(body.inquiryType)) {
      return NextResponse.json(
        { 
          error: 'Invalid inquiry type',
          code: 'INVALID_INQUIRY_TYPE'
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Extract client information
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create message data
    const messageData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      company: body.company?.trim(),
      phone: body.phone?.trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
      inquiryType: body.inquiryType,
      ipAddress,
      userAgent,
      status: 'unread'
    };

    // Save message to database
    const message = new Message(messageData);
    const savedMessage = await message.save();

    // Log for admin monitoring (optional)
    console.log(`New contact message from ${body.email} - Subject: ${body.subject}`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      messageId: savedMessage._id,
      submittedAt: savedMessage.createdAt
    }, { status: 201 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: 'Invalid data provided',
          details: error.message,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Handle duplicate email within short timeframe (optional spam protection)
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { 
          error: 'A message from this email was recently submitted. Please wait before sending another.',
          code: 'DUPLICATE_SUBMISSION'
        },
        { status: 429 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// GET method for admin to retrieve messages (optional - for future admin panel)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const inquiryType = searchParams.get('inquiryType');

    await connectToDatabase();

    // Build query
    const query: Record<string, string> = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Message.countDocuments(query);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}