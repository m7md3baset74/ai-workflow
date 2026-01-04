# 🚀 Webflow Automation Platform

<div align="center">
  <img src="/public/preview.png" alt="Webflow App Preview" width="100%" />
  
  ### A Modern SaaS Platform for Workflow Automation & Management
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-green)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

## ✨ Features

### 🎨 Modern UI/UX

- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Custom Theming**: Advanced theme customization with color picker
- **Glassmorphism UI**: Modern design with backdrop blur effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions

### 🔐 Authentication & Authorization

- **NextAuth.js Integration**: Secure authentication system
- **Multiple Providers**: Email/Password and Google OAuth support
- **Session Management**: Persistent user sessions with JWT
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Complete profile management with image uploads

### 💼 Subscription & Payments

- **Stripe Integration**: Secure payment processing
- **Multiple Plans**: Free, Professional, Business, and Enterprise tiers
- **Subscription Management**: Upgrade, downgrade, and cancellation
- **Billing Portal**: Self-service billing management
- **Webhook Handling**: Real-time payment status updates

### ⚡ Workflow Automation

- **Visual Workflow Builder**: Drag-and-drop interface with React Flow
- **Multiple Node Types**: Triggers, actions, conditions, and loops
- **Real-time Validation**: Live error detection and feedback
- **Workflow Execution**: Run and test workflows
- **Export/Import**: JSON-based workflow sharing
- **Version Control**: Track workflow changes and history

### 👑 Premium Admin Features

- **User Management**: Complete user CRUD operations
- **Workflow Monitoring**: Track all user workflows
- **Message Management**: Handle contact form submissions
- **Newsletter System**: Manage email subscribers
- **Analytics Dashboard**: Real-time platform statistics
- **Premium Access**: Locked features with purchase integration

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS v4 with custom configuration
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Workflow Engine**: React Flow (@xyflow/react)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion

### Backend

- **API**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v5
- **File Upload**: Cloudinary integration
- **Payments**: Stripe API
- **Email**: Nodemailer (optional)

### DevOps & Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git
- **Deployment**: Vercel (recommended)

---

## 📁 Project Structure

```
webflow-app-yt/
├── public/                          # Static assets
│   ├── preview.png                  # Preview image
│   └── *.svg                        # Icon files
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (public)/               # Public routes (no auth required)
│   │   │   ├── about/              # About page
│   │   │   ├── blog/               # Blog section
│   │   │   ├── contact/            # Contact form
│   │   │   ├── features/           # Features showcase
│   │   │   ├── pricing/            # Pricing plans
│   │   │   ├── privacy/            # Privacy policy
│   │   │   ├── terms/              # Terms of service
│   │   │   └── ...                 # More public pages
│   │   │
│   │   ├── admin/                  # Admin dashboard (premium)
│   │   │   ├── dashboard/          # Admin overview
│   │   │   ├── users/              # User management (premium)
│   │   │   ├── workflows/          # Workflow monitoring (premium)
│   │   │   ├── messages/           # Message management (premium)
│   │   │   ├── newsletter/         # Newsletter management (premium)
│   │   │   ├── paid-members/       # Subscriber management (premium)
│   │   │   └── settings/           # Admin settings (premium)
│   │   │
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── signin/             # Sign in page
│   │   │   └── signup/             # Sign up page
│   │   │
│   │   ├── workflow/               # Workflow management
│   │   │   ├── new/                # Create new workflow
│   │   │   └── [id]/               # Edit workflow
│   │   │
│   │   ├── api/                    # API Routes
│   │   │   ├── auth/               # NextAuth endpoints
│   │   │   ├── admin/              # Admin API routes
│   │   │   ├── workflows/          # Workflow CRUD
│   │   │   ├── stripe/             # Payment webhooks
│   │   │   ├── subscription/       # Subscription management
│   │   │   ├── contact/            # Contact form handler
│   │   │   ├── newsletter/         # Newsletter subscription
│   │   │   ├── upload/             # File upload handler
│   │   │   └── user/               # User management
│   │   │
│   │   ├── dashboard/              # User dashboard
│   │   ├── profile/                # User profile
│   │   ├── billing/                # Billing management
│   │   ├── payment-success/        # Payment success page
│   │   ├── docs/                   # Documentation
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles
│   │   └── error.tsx               # Error boundary
│   │
│   ├── components/                 # React components
│   │   ├── layout/                 # Layout components
│   │   │   └── AppLayout.tsx       # Main app layout
│   │   │
│   │   ├── navigation/             # Navigation components
│   │   │   ├── Header.tsx          # Site header
│   │   │   └── Footer.tsx          # Site footer
│   │   │
│   │   ├── providers/              # Context providers
│   │   │   ├── SessionProvider.tsx # Auth session
│   │   │   ├── ThemeProvider.tsx   # Theme context
│   │   │   └── ThemeCustomizerProvider.tsx
│   │   │
│   │   ├── ui/                     # UI components
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── dialog.tsx          # Modal dialog
│   │   │   ├── input.tsx           # Input field
│   │   │   ├── badge.tsx           # Badge component
│   │   │   ├── paid-feature.tsx    # Premium feature lock
│   │   │   └── ...                 # More UI components
│   │   │
│   │   └── workflow/               # Workflow components
│   │       ├── WorkflowCanvas.tsx  # Main canvas
│   │       ├── NodePalette.tsx     # Node sidebar
│   │       └── ...                 # More workflow components
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-mobile.ts           # Mobile detection
│   │   ├── use-subscription-updates.ts
│   │   └── use-workflow-limits.ts
│   │
│   ├── lib/                        # Utilities & configs
│   │   ├── models/                 # Mongoose models
│   │   │   ├── User.ts             # User model
│   │   │   ├── Workflow.ts         # Workflow model
│   │   │   ├── Message.ts          # Contact message model
│   │   │   └── Newsletter.ts       # Newsletter model
│   │   │
│   │   ├── auth.ts                 # NextAuth config
│   │   ├── mongodb.ts              # MongoDB connection
│   │   ├── stripe.ts               # Stripe configuration
│   │   ├── cloudinary.ts           # Cloudinary setup
│   │   ├── plans.ts                # Subscription plans
│   │   ├── types.ts                # TypeScript types
│   │   ├── utils.ts                # Utility functions
│   │   ├── rate-limit.ts           # API rate limiting
│   │   └── admin-middleware.ts     # Admin auth middleware
│   │
│   ├── store/                      # State management
│   │   └── workflowStore.ts        # Workflow state
│   │
│   └── types/                      # TypeScript definitions
│       └── admin.ts                # Admin types
│
├── types/                          # Global type definitions
│   └── next-auth.d.ts              # NextAuth type extensions
│
├── .env                            # Environment variables
├── .env.example                    # Example env file
├── .gitignore                      # Git ignore rules
├── components.json                 # Shadcn UI config
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies
├── pnpm-lock.yaml                  # Lock file
├── postcss.config.mjs              # PostCSS config
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

---

## 🗺️ Pages & Routes

### Public Pages (No Authentication Required)

| Route           | Description                                 |
| --------------- | ------------------------------------------- |
| `/`             | Landing page with hero section and features |
| `/about`        | About the platform and team                 |
| `/features`     | Detailed feature showcase                   |
| `/pricing`      | Subscription plans and pricing              |
| `/blog`         | Blog articles and updates                   |
| `/contact`      | Contact form                                |
| `/faq`          | Frequently asked questions                  |
| `/privacy`      | Privacy policy                              |
| `/terms`        | Terms of service                            |
| `/security`     | Security information                        |
| `/integrations` | Available integrations                      |
| `/templates`    | Workflow templates                          |
| `/guides`       | User guides                                 |
| `/tutorials`    | Video tutorials                             |
| `/changelog`    | Product updates                             |

### Authentication Pages

| Route          | Description       |
| -------------- | ----------------- |
| `/auth/signin` | User sign in      |
| `/auth/signup` | User registration |

### Protected Pages (Authentication Required)

| Route               | Description                   |
| ------------------- | ----------------------------- |
| `/dashboard`        | User dashboard with workflows |
| `/workflow/new`     | Create new workflow           |
| `/workflow/[id]`    | Edit existing workflow        |
| `/profile`          | User profile management       |
| `/profile/complete` | Complete profile setup        |
| `/billing`          | Subscription and billing      |
| `/payment-success`  | Payment confirmation          |
| `/docs`             | Documentation                 |

### Admin Pages (Premium Access Required)

| Route                 | Description                 | Access  |
| --------------------- | --------------------------- | ------- |
| `/admin/dashboard`    | Admin overview & statistics | Free    |
| `/admin/users`        | User management             | Premium |
| `/admin/workflows`    | Monitor all workflows       | Premium |
| `/admin/messages`     | Contact messages            | Premium |
| `/admin/newsletter`   | Email subscribers           | Premium |
| `/admin/paid-members` | Subscription management     | Premium |
| `/admin/settings`     | System configuration        | Premium |

---

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **pnpm**: Package manager ([Install](https://pnpm.io/installation))
  ```bash
  npm install -g pnpm
  ```
- **MongoDB**: Database (choose one):
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended)
  - [MongoDB Community](https://www.mongodb.com/try/download/community) (Local)
- **Git**: Version control ([Download](https://git-scm.com/))

### Optional Services

- **Google Cloud Account**: For Google OAuth ([Console](https://console.cloud.google.com))
- **Stripe Account**: For payment processing ([Sign Up](https://dashboard.stripe.com/register))
- **Cloudinary Account**: For image uploads ([Sign Up](https://cloudinary.com/users/register/free))

---

## � Installation

### 1. Clone the Repository

```bash
git clone https://github.com/noorjsdivs/webflow-app-yt.git
cd webflow-app-yt
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

---

## 🔧 Environment Setup

### Complete `.env` Configuration

Open the `.env` file and configure the following variables:

#### 1. MongoDB Configuration

**Option A: MongoDB Atlas (Recommended for Production)**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account and log in
3. Click **"Build a Database"**
4. Choose **"Free"** tier (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Click **"Create"**
7. Set up database access:
   - Click **"Database Access"** in left sidebar
   - Click **"Add New Database User"**
   - Create username and password
   - Set privileges to **"Read and write to any database"**
8. Set up network access:
   - Click **"Network Access"** in left sidebar
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0) or add your IP
9. Get connection string:
   - Click **"Database"** in left sidebar
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `webflow`)

```env
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/webflow?retryWrites=true&w=majority"
```

**Option B: Local MongoDB**

```env
MONGODB_URI="mongodb://localhost:27017/webflow-app"
```

#### 2. NextAuth.js Configuration

Generate a secure secret:

```bash
openssl rand -base64 32
```

Add to `.env`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-generated-secret-here"
```

For production:

```env
NEXTAUTH_URL=https://yourdomain.com
```

#### 3. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing:
   - Click **"Select a project"** dropdown
   - Click **"New Project"**
   - Enter project name and click **"Create"**
3. Enable Google+ API:
   - Go to **"APIs & Services"** → **"Library"**
   - Search for **"Google+ API"**
   - Click and enable it
4. Create OAuth credentials:
   - Go to **"APIs & Services"** → **"Credentials"**
   - Click **"Create Credentials"** → **"OAuth client ID"**
   - Configure consent screen if prompted:
     - Choose **"External"**
     - Fill in app name, user support email, developer email
     - Add scopes: `email`, `profile`
     - Add test users if needed
   - Select **"Web application"** as application type
   - Add authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://yourdomain.com/api/auth/callback/google`
   - Click **"Create"**
5. Copy credentials to `.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

#### 4. Cloudinary Setup (For Image Uploads)

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. From your dashboard, get:
   - Cloud Name
   - API Key
   - API Secret
4. Add to `.env`:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 5. Stripe Configuration (For Payments)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create an account and verify email
3. Get your API keys:
   - Click **"Developers"** in top right
   - Click **"API keys"**
   - Copy **"Publishable key"** and **"Secret key"**
4. Create products and prices:
   - Go to **"Products"** in dashboard
   - Create products for each plan:
     - Professional Plan
     - Business Plan
   - For each product, create two prices:
     - Monthly subscription
     - Yearly subscription
   - Copy the Price IDs (starts with `price_`)
5. Set up webhooks:
   - Go to **"Developers"** → **"Webhooks"**
   - Click **"Add endpoint"**
   - Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the **"Signing secret"**

For local testing, use Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Add to `.env`:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs from your Stripe products
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_...
STRIPE_PROFESSIONAL_YEARLY_PRICE_ID=price_...
STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_...
STRIPE_BUSINESS_YEARLY_PRICE_ID=price_...
```

#### 6. Premium Purchase Link

For the premium admin features, set your purchase link:

```env
NEXT_PUBLIC_PURCHASE_LINK=https://buymeacoffee.com/yourusername
```

Or use your own payment link.

#### 7. Application Configuration

```env
NODE_ENV=development
```

For production:

```env
NODE_ENV=production
```

### Complete `.env` Example

```env
# MongoDB Configuration
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/webflow?retryWrites=true&w=majority"

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-generated-secret-32-chars"

# Google OAuth Configuration
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=your-secret

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_SECRET_KEY=sk_test_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-secret
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_xxx
STRIPE_PROFESSIONAL_YEARLY_PRICE_ID=price_xxx
STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_xxx
STRIPE_BUSINESS_YEARLY_PRICE_ID=price_xxx

# Premium Purchase Link
NEXT_PUBLIC_PURCHASE_LINK=https://buymeacoffee.com/yourusername

# Application Configuration
NODE_ENV=development
```

---

---

## 🎯 Running the Application

### Development Mode

```bash
pnpm dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Other Commands

```bash
# Run linting
pnpm lint

# Type checking
pnpm type-check
```

---

## 📖 Usage Guide

### Getting Started

1. **Sign Up**

   - Visit [http://localhost:3000](http://localhost:3000)
   - Click **"Sign Up"** or **"Get Started"**
   - Create account with email or Google

2. **Complete Profile**

   - Add profile picture
   - Fill in personal information
   - Set preferences

3. **Explore Dashboard**
   - View your workflows
   - Check subscription status
   - Access quick actions

### Creating Your First Workflow

1. Click **"Create Workflow"** or **"New Workflow"**
2. Enter workflow name and description
3. Drag nodes from the sidebar to canvas
4. Connect nodes by dragging from output to input
5. Configure each node by clicking on it
6. Save your workflow
7. Test execution with **"Run"** button

### Subscription Plans

| Plan             | Price  | Workflows | Executions | Features                         |
| ---------------- | ------ | --------- | ---------- | -------------------------------- |
| **Free**         | $0     | 5         | 1,000/mo   | Basic features, Email support    |
| **Professional** | $29/mo | Unlimited | 10,000/mo  | All features, Priority support   |
| **Business**     | $99/mo | Unlimited | 50,000/mo  | Advanced features, Phone support |
| **Enterprise**   | Custom | Unlimited | Custom     | Dedicated manager, SLA           |

### Premium Admin Access

Some admin features require a one-time premium purchase:

- User Management
- Workflow Monitoring
- Message Management
- Newsletter Management
- Paid Members Management
- Advanced Settings

Purchase link: Set in `NEXT_PUBLIC_PURCHASE_LINK` environment variable

---

## 🚢 Deployment

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/noorjsdivs/webflow-app-yt)

#### Step-by-Step Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click **"Import Project"**
   - Select your GitHub repository
   - Configure project settings

3. **Set Environment Variables**

   In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

   ```
   MONGODB_URI
   NEXTAUTH_URL (use your Vercel domain)
   NEXTAUTH_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID
   STRIPE_PROFESSIONAL_YEARLY_PRICE_ID
   STRIPE_BUSINESS_MONTHLY_PRICE_ID
   STRIPE_BUSINESS_YEARLY_PRICE_ID
   NEXT_PUBLIC_PURCHASE_LINK
   NODE_ENV=production
   ```

4. **Update OAuth Redirect URIs**

   - Google Cloud Console: Add `https://your-domain.vercel.app/api/auth/callback/google`
   - Update `NEXTAUTH_URL` to your Vercel domain

5. **Update Stripe Webhook**

   - Add new webhook endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
   - Update `STRIPE_WEBHOOK_SECRET` with new signing secret

6. **Deploy**
   - Click **"Deploy"**
   - Wait for build to complete
   - Visit your deployed application

### Deploy to Other Platforms

#### Railway

1. Create account at [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Add environment variables
4. Deploy

#### Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build project: `pnpm build`
3. Deploy: `netlify deploy --prod`

### Database Setup for Production

**MongoDB Atlas (Recommended)**

1. Create production cluster
2. Set IP whitelist to `0.0.0.0/0` (all IPs) or specific Vercel IPs
3. Create database user with strong password
4. Update `MONGODB_URI` in production environment variables

---

## 🔧 Development Tips

### Adding New Features

1. **Create API Route**: Add to `src/app/api/`
2. **Add Components**: Create in `src/components/`
3. **Define Types**: Add to `src/lib/types.ts`
4. **Update Models**: Modify Mongoose schemas in `src/lib/models/`
5. **Test**: Thoroughly test new features

### Customizing Themes

Edit `src/app/globals.css` to customize:

- Color variables
- Font families
- Spacing system
- Animation durations

### Adding Node Types

1. Define in workflow types
2. Add icon and configuration
3. Update workflow canvas
4. Implement execution logic

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the Repository**

   ```bash
   git clone https://github.com/your-username/webflow-app-yt.git
   cd webflow-app-yt
   ```

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**

   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

4. **Commit Changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to GitHub**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open Pull Request**
   - Go to GitHub repository
   - Click **"New Pull Request"**
   - Describe your changes
   - Submit for review

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

- Ensure MongoDB is running locally
- Check connection string format
- Verify network access in MongoDB Atlas
- Check firewall settings

#### NextAuth Configuration Error

```
Error: [next-auth][error][NO_SECRET]
```

**Solutions:**

- Set `NEXTAUTH_SECRET` in `.env`
- Generate new secret: `openssl rand -base64 32`
- Ensure `.env` is not in `.gitignore` for local development

#### Build Errors

```
Error: Module not found
```

**Solutions:**

```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm dev
```

#### Stripe Webhook Issues

```
Error: No signatures found matching the expected signature
```

**Solutions:**

- Use Stripe CLI for local testing
- Verify webhook secret matches
- Check endpoint URL is correct
- Ensure raw body parsing is enabled

### Getting Help

- 📖 [Documentation](https://your-docs-link.com)
- 💬 [Discord Community](https://discord.gg/your-server)
- 🐛 [GitHub Issues](https://github.com/noorjsdivs/webflow-app-yt/issues)
- 📧 Email: support@yourapp.com

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [React Flow](https://reactflow.dev/) - Workflow visualization
- [MongoDB](https://www.mongodb.com/) - Database
- [Stripe](https://stripe.com/) - Payment processing
- [Vercel](https://vercel.com/) - Hosting platform
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons

---

## 📞 Contact & Support

- **Developer**: Noor Mohammad
- **GitHub**: [@noorjsdivs](https://github.com/noorjsdivs)
- **YouTube**: [ReactBD](https://youtube.com/@reactBD)
- **Website**: [reactbd.com](https://reactbd.com)

---

## 🗺️ Roadmap

### Phase 1 - Core Features ✅

- [x] User authentication
- [x] Workflow builder
- [x] Database integration
- [x] Basic subscription system

### Phase 2 - Enhanced Features 🚧

- [x] Admin dashboard
- [x] Payment integration
- [x] Theme customization
- [ ] Real-time collaboration
- [ ] Workflow templates
- [ ] Advanced analytics

### Phase 3 - Integrations 📅

- [ ] Slack integration
- [ ] Google Sheets integration
- [ ] Email service integration
- [ ] Webhook support
- [ ] API marketplace
- [ ] Custom node SDK

### Phase 4 - Enterprise Features 📅

- [ ] Team management
- [ ] Role-based access control
- [ ] Audit logs
- [ ] SSO integration
- [ ] White labeling
- [ ] Dedicated instances

---

<div align="center">
  
  ### Built with ❤️ using Next.js, React Flow, and MongoDB
  
  ⭐ Star this repository if you find it helpful!
  
  [Report Bug](https://github.com/noorjsdivs/webflow-app-yt/issues) · [Request Feature](https://github.com/noorjsdivs/webflow-app-yt/issues) · [Documentation](https://your-docs-link.com)
  
</div>

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Adding New Node Types

1. **Define Node Type**: Add to `NODE_TYPES` in `src/lib/types.ts`
2. **Add Icon**: Import icon in components
3. **Update Configuration**: Add config form in `NodeConfigModal.tsx`
4. **Handle Execution**: Add execution logic in workflow run API

### Customizing Themes

Edit `src/app/globals.css` to customize:

- Color schemes
- Node styling
- Animations
- React Flow appearance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check network connectivity and firewall settings

**NextAuth Configuration Error**

- Ensure `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain

**Google OAuth Not Working**

- Check client ID and secret are correct
- Verify redirect URI is properly configured
- Ensure Google+ API is enabled

**Build Errors**

- Clear `.next` directory and `node_modules`
- Run `npm install` again
- Check for TypeScript errors

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Review MongoDB and NextAuth.js documentation
- Check React Flow documentation for workflow-related issues

## 🎯 Roadmap

- [ ] Real third-party integrations (Slack, Google Sheets, etc.)
- [ ] Workflow scheduling and cron management
- [ ] Advanced conditional logic
- [ ] Workflow templates marketplace
- [ ] Team collaboration features
- [ ] Workflow analytics and monitoring
- [ ] Custom node development SDK

---

Built with ❤️ using Next.js, React Flow, and MongoDB
