import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "API Endpoint Not Found",
      message: "The requested API endpoint does not exist or has been moved.",
      code: "API_NOT_FOUND",
      timestamp: new Date().toISOString(),
      suggestions: [
        "Check the API documentation for correct endpoints",
        "Verify the request method (GET, POST, PUT, DELETE)",
        "Ensure you're using the correct API version",
        "Contact support if this issue persists",
      ],
      availableEndpoints: {
        auth: ["POST /api/auth/register", "GET /api/auth/[...nextauth]"],
        user: ["GET /api/user/profile", "PUT /api/user/profile"],
        workflows: [
          "GET /api/workflows",
          "POST /api/workflows",
          "GET /api/workflows/[id]",
          "PUT /api/workflows/[id]",
          "DELETE /api/workflows/[id]",
        ],
        admin: [
          "GET /api/admin/users",
          "GET /api/admin/stats",
          "GET /api/admin/workflows",
          "GET /api/admin/messages",
        ],
        upload: ["POST /api/upload/image", "POST /api/upload/public"],
        contact: ["POST /api/contact"],
      },
      documentation: "/docs/api",
      support: "/contact",
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-API-Error": "ENDPOINT_NOT_FOUND",
      },
    }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      error: "API Endpoint Not Found",
      message:
        "The requested API endpoint does not exist or does not accept POST requests.",
      code: "API_METHOD_NOT_FOUND",
      timestamp: new Date().toISOString(),
      allowedMethods: ["GET"],
      documentation: "/docs/api",
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET",
      },
    }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      error: "API Endpoint Not Found",
      message:
        "The requested API endpoint does not exist or does not accept PUT requests.",
      code: "API_METHOD_NOT_FOUND",
      timestamp: new Date().toISOString(),
      allowedMethods: ["GET"],
      documentation: "/docs/api",
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET",
      },
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      error: "API Endpoint Not Found",
      message:
        "The requested API endpoint does not exist or does not accept DELETE requests.",
      code: "API_METHOD_NOT_FOUND",
      timestamp: new Date().toISOString(),
      allowedMethods: ["GET"],
      documentation: "/docs/api",
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET",
      },
    }
  );
}

export async function PATCH() {
  return NextResponse.json(
    {
      error: "API Endpoint Not Found",
      message:
        "The requested API endpoint does not exist or does not accept PATCH requests.",
      code: "API_METHOD_NOT_FOUND",
      timestamp: new Date().toISOString(),
      allowedMethods: ["GET"],
      documentation: "/docs/api",
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        Allow: "GET",
      },
    }
  );
}
