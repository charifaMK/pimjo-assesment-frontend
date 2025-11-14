# Pimjo Assessment

A modern, full-stack web application built with Next.js 16, featuring user authentication, dashboard functionality, and a responsive landing page. This project demonstrates advanced React patterns, database integration, and contemporary web development practices.

## 🚀 Features

### Authentication System
- **Secure Authentication**: Complete auth flow with sign-in, sign-up, and sign-out functionality
- **OAuth Integration**: Support for Google and GitHub authentication
- **Session Management**: Secure session handling with JWT tokens
- **Password Security**: Encrypted password storage using bcryptjs

### User Dashboard
- **User Overview**: Comprehensive user management interface with paginated data tables
- **Search & Filter**: Real-time search and filtering capabilities
- **Statistics Cards**: Visual representation of user metrics and analytics
- **Delete Operations**: Safe user deletion with confirmation dialogs
- **Responsive Design**: Mobile-optimized dashboard layout

### Landing Page
- **Hero Section**: Compelling introduction with call-to-action buttons
- **Features Showcase**: Highlighted product features and benefits
- **Statistics Display**: Key metrics and achievements
- **Template Gallery**: Visual showcase of available templates
- **Testimonials**: Customer reviews and feedback
- **Newsletter Integration**: Email subscription functionality

### UI/UX Features
- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Component Library**: Reusable UI components built with Radix UI
- **Dark Mode**: Theme switching capability with next-themes
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Comprehensive error reporting and user feedback
- **Accessibility**: WCAG-compliant components and navigation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Theme**: next-themes for dark mode support

### Backend & Database
- **Database**: PostgreSQL
- **ORM**: Prisma 5.22
- **Authentication**: Custom JWT implementation with Supabase
- **API Routes**: Next.js API routes for authentication
- **Database Migrations**: Prisma migration system

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript 5
- **Build Tool**: Next.js built-in bundler
- **Environment**: Environment variables for configuration

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── overview/          # Dashboard page
│   ├── signin/            # Sign-in page
│   └── signup/            # Sign-up page
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── auth/             # Authentication components
│   ├── landing/          # Landing page components
│   ├── overview/         # Dashboard components
│   └── ...               # Other feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── utils/                # Helper functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- PostgreSQL database
- Supabase account (for authentication + db)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khalidh1b/pimjo-assesment-frontend.git
   cd pimjo-assesment
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   DIRECT_URL="postgresql://username:password@localhost:5432/database_name"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   JWT_SECRET="your-jwt-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Run database migrations
   pnpm db:migrate
   
   # Seed database (optional)
   pnpm db:seed
   
   # Setup database indexes
   pnpm setup-db-indexes
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database with sample data
- `pnpm setup-db-indexes` - Setup database performance indexes

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

### User Management
- **Users**: Core user accounts with authentication data
- **Sessions**: Active user sessions for security
- **Accounts**: OAuth provider integrations
- **Verification**: Email verification tokens

### Key Features
- Optimized database indexes for performance
- Cascade deletes for data integrity
- Unique constraints for data consistency
- Timestamp tracking for audit trails

## 🔐 Authentication Flow

1. **Registration**: Users can sign up with email/password or OAuth providers
2. **Verification**: Email verification process for account activation
3. **Session Management**: Secure JWT-based session handling
4. **Protected Routes**: Middleware-based route protection
5. **OAuth Integration**: Google and GitHub authentication support

## 🎨 UI Components

The application uses a comprehensive component library built on:

- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Consistent iconography
- **shadcn/ui**: Pre-built component templates

### Key Components
- Authentication forms with validation
- Data tables with pagination
- Modal dialogs and confirmations
- Navigation with mega menus
- Loading states and skeletons
- Error boundaries and reporting

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: Tailwind's responsive utilities
- **Touch-Friendly**: Mobile-optimized interactions
- **Performance**: Optimized images and lazy loading

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_URL`: Direct database connection for migrations
- `NEXT_PUBLIC_SUPABASE_*`: Supabase configuration
- `JWT_SECRET`: Secret for JWT token signing

### Database Configuration
- PostgreSQL with Prisma ORM
- Automated migrations
- Performance indexes
- Connection pooling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is a private assessment submission. All rights reserved.

## 🆘 Support

For questions or issues regarding this assessment project, please refer to the project documentation or contact.