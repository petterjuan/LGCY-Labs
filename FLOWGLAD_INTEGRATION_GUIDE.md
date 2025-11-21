# Flowglad Integration Guide - LGCY Labs Codebase Analysis

A comprehensive guide for integrating Flowglad payments and billing into the LGCY Labs application.

---

## 1. Framework & Language Detection

### Framework
- **Type**: Next.js (App Router)
- **Version**: 16.0.3
- **Router Type**: App Router (`app/` directory structure)

### Language
- **Server**: TypeScript 5.5.0
- **Client**: React 18.2.0 + TypeScript

### Package Manager
- **Manager**: npm
- **Lock File**: package-lock.json

### Dependency File
- **Location**: `package.json`
- **Key Dependencies**:
  - `next`: 16.0.3
  - `react`: 18.2.0
  - `react-dom`: 18.2.0
  - `typescript`: 5.5.0
  - `@vercel/analytics`: 1.5.0 (for conversion tracking)
  - `framer-motion`: 10.12.5 (animations)
  - `tailwindcss`: 3.4.1 (styling)

---

## 2. File Structure & Paths

All paths are relative from the project root (`/workspaces/LGCY-Labs/`).

### API Routes Directory
- **Location**: `app/api/`
- **Pattern**: File-based routing with `route.ts` exports
- **Example Route**: `app/api/contact/route.ts`

### Utility Functions & Shared Code
- **Location**: `lib/`
- **Subdirectory**: `lib/ai/` (AI-related utilities)
- **Current Utilities**: 
  - `lib/ai/lead-scorer.ts` (Lead scoring with OpenAI)

### UI Components
- **Location**: `components/`
- **Current Components**:
  - `components/Navbar.tsx`
  - `components/Hero.tsx`
  - `components/Footer.tsx`
  - `components/Card.tsx`
  - `components/CTAButton.tsx`

### Page Sections (Reusable Section Components)
- **Location**: `sections/`
- **Current Sections**:
  - `sections/Contact.tsx`
  - `sections/Products.tsx`
  - `sections/Services.tsx`
  - `sections/Solutions.tsx`
  - `sections/Trust.tsx`
  - `sections/Founder.tsx`

### Main Server Files
- **Root Layout**: `app/layout.tsx`
- **Home Page**: `app/page.tsx`
- **Styling**: `app/styles/globals.css`

### Configuration Files
- **Next.js Config**: `next.config.js`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.ts`
- **PostCSS Config**: `postcss.config.cjs`

---

## 3. Authentication System

### Current Status
**No authentication system is currently implemented.**

The application is a **marketing website with contact/lead capture functionality**. There is no user authentication, session management, or user accounts system in place.

### Implication for Flowglad Integration
Before implementing Flowglad billing, you will need to:
1. Implement an authentication system (recommended: BetterAuth, Clerk, or Supabase Auth)
2. Create a user model with customer identification
3. Add session management to server-side routes

---

## 4. Customer Model (B2C vs B2B)

### Current Model
**B2B with B2C elements** - The product targets enterprises and agencies, but also serves individual founders.

### Customer Types Identified from Marketing Copy
Based on the `sections/Services.tsx` and `sections/Contact.tsx`:

1. **Primary Target**: Enterprise/Agency customers
   - Services priced at $2,500-$20,000+ per engagement
   - References to "agencies," "enterprises," "fractional leadership"

2. **Secondary Target**: Individual founders
   - Free consultation offerings
   - Self-serve products ($299 boilerplate)

### Customer ID Source
**NOT YET IMPLEMENTED** - No user database or customer model exists.

When implementing Flowglad, you will need to:
- Create a `Customer` or `User` model
- Define customer identification: likely `user.id` (UUID recommended - `uuid` package is already installed)
- Track organization/team affiliation for B2B features

---

## 5. Frontend Framework

### Framework Details
- **Framework**: React 18.2.0
- **Rendering**: Server-Side Rendering (SSR) via Next.js App Router
- **Component Pattern**: Mix of Server and Client components

### State Management
**Currently Used**:
- React `useState` hook for local component state
- No global state management library (Redux, Zustand, etc.)
- Vercel Analytics for conversion tracking

### Provider Pattern

#### Current Implementation
**No React providers are currently implemented.**

The application uses a simple layout structure without provider wrappers. See `app/layout.tsx`:

```tsx
import "./styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral text-gray-800">
        {/* Google Analytics scripts */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}

        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
```

#### Provider Structure Pattern for Flowglad Integration
For adding Flowglad, you should create a providers file:

```tsx
// components/providers.tsx
'use client';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
// Future: import { FlowgladProvider } from '@flowglad/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Flowglad Provider would go here */}
      {/* <FlowgladProvider apiKey={process.env.NEXT_PUBLIC_FLOWGLAD_KEY}> */}
        {children}
      {/* </FlowgladProvider> */}
      <Analytics />
    </>
  );
}
```

Then update `app/layout.tsx`:

```tsx
import { Providers } from '../components/providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Client-Side Auth Hook
**Not applicable** - No authentication system exists yet.

---

## 6. Route Handler Pattern

### API Route Definition
Next.js App Router file-based routing with `route.ts` exports.

### Route File Location
- **Pattern**: `app/api/[path]/route.ts`
- **Existing Example**: `app/api/contact/route.ts`

### JSON Response Pattern
Using `NextResponse.json()` from `next/server`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
```

### Complete API Route Example

Below is the complete contact form handler showing the full pattern:

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

class FreeAILeadScorer {
  private hf: any;

  constructor() {
    if (process.env.HUGGINGFACE_HUB_TOKEN) {
      import('@huggingface/inference').then((module) => {
        this.hf = new module.HfInference(process.env.HUGGINGFACE_HUB_TOKEN);
      }).catch(error => {
        console.log('Hugging Face import failed:', error.message);
      });
    }
  }

  async scoreLead(formData: any) {
    console.log('🎯 [API] AI Analysis Started for:', formData.email);
    
    const aiAnalysis = await this.tryHuggingFace(formData);
    if (aiAnalysis) return aiAnalysis;

    return { ...this.smartFallback(formData), aiEnabled: false, aiProvider: 'fallback' };
  }

  private async tryHuggingFace(formData: any) {
    if (!this.hf || !process.env.HUGGINGFACE_HUB_TOKEN) {
      console.log('🔧 [API] No Hugging Face token available');
      return null;
    }

    try {
      console.log('🚀 [API] Calling FREE Hugging Face AI...');
      
      const prompt = `Analyze this business lead: ${JSON.stringify(formData)}. Respond with JSON: {priority: string, revenuePotential: number, recommendedAction: string, riskScore: number}`;
      
      const response = await this.hf.textGeneration({
        model: "microsoft/DialoGPT-large",
        inputs: prompt,
        parameters: { max_new_tokens: 150, temperature: 0.3 }
      });

      console.log('📨 [API] Hugging Face Response:', response);

      if (response.generated_text) {
        const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          console.log('✅ [API] AI Analysis Success:', analysis);
          return { ...analysis, aiEnabled: true, aiProvider: 'huggingface' };
        }
      }
    } catch (error) {
      console.log('❌ [API] Hugging Face Error:', error.message);
    }
    return null;
  }

  private smartFallback(formData: any) {
    console.log('🔄 [API] Using smart fallback analysis');
    const email = formData.email?.toLowerCase() || '';
    const message = formData.message?.toLowerCase() || '';
    const name = formData.name || '';
    
    let priority: 'urgent' | 'high' | 'medium' | 'low' = 'medium';
    let revenuePotential = 50;
    let recommendedAction = 'Follow up within 24 hours';
    let riskScore = 30;

    if (message.includes('urgent') || message.includes('$') || message.includes('revenue loss')) {
      priority = 'urgent';
      revenuePotential = 85;
      recommendedAction = 'Contact within 15 minutes';
    } else if (message.includes('enterprise') || name.includes('ceo') || name.includes('director')) {
      priority = 'high';
      revenuePotential = 75;
      recommendedAction = 'Schedule demo today';
    }

    console.log('📊 [API] Fallback Analysis Result:', { priority, revenuePotential, riskScore });
    return { priority, revenuePotential, recommendedAction, riskScore };
  }
}

export async function POST(request: NextRequest) {
  console.log('📥 [API] Contact form received request');
  
  try {
    const formData = await request.json();
    console.log('👤 [API] Lead Details:', { name: formData.name, email: formData.email });
    
    const scorer = new FreeAILeadScorer();
    const analysis = await scorer.scoreLead(formData);

    console.log('🎯 [API] FINAL ANALYSIS COMPLETE:');
    console.log('   Email:', formData.email);
    console.log('   Priority:', analysis.priority);
    console.log('   Revenue Potential:', analysis.revenuePotential);
    console.log('   Risk Score:', analysis.riskScore);
    console.log('   AI Provider:', analysis.aiProvider);
    console.log('   --- END ANALYSIS ---');

    return NextResponse.json({ 
      success: true, 
      message: 'AI analysis complete',
      analysis 
    });

  } catch (error) {
    console.error('💥 [API] Contact Form Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
```

### Key Patterns
1. **Request Parsing**: `request.json()` for JSON body
2. **Error Handling**: try/catch block with detailed logging
3. **Response**: `NextResponse.json()` with status codes (200 on success, 500 on error)
4. **Logging**: Console logging for debugging (prefixed with emojis for clarity)

---

## 7. Validation & Error Handling Patterns

### Validation Library
**None currently implemented.** 

The application uses basic input validation in client-side forms (HTML5 `required` attributes).

### Validation Pattern Example

Current client-side validation in `sections/Contact.tsx`:

```tsx
<input
  type="text"
  id="name"
  required
  value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  placeholder="Juan Petter"
/>
<input
  type="email"
  id="email"
  required
  value={formData.email}
  onChange={(e) => setFormData({...formData, email: e.target.value})}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
  placeholder="you@company.com"
/>
```

### Recommendation for Flowglad Integration
Install and use **Zod** for schema validation:

```bash
npm install zod
```

Example validation pattern:

```typescript
// lib/validation/flowglad.ts
import { z } from 'zod';

export const CreateSubscriptionSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  planId: z.string().min(1, 'Plan ID required'),
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name required'),
});

export type CreateSubscription = z.infer<typeof CreateSubscriptionSchema>;
```

### Error Handling Pattern

Current implementation in `sections/Contact.tsx`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      // Track successful conversion
      trackConversion('contact_form_success');
      setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you within 24 hours.' });
      setFormData({ name: '', email: '', message: '' });
    } else {
      trackConversion('contact_form_error');
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Error Response Pattern

Complete error handling example for Flowglad API:

```typescript
// app/api/billing/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CreateSubscriptionSchema } from '@/lib/validation/flowglad';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = CreateSubscriptionSchema.parse(body);

    // Process with Flowglad
    // ... billing logic ...

    return NextResponse.json(
      { success: true, subscriptionId: '...' },
      { status: 201 }
    );

  } catch (error) {
    // Validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    // Server error
    console.error('Subscription creation failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create subscription' 
      },
      { status: 500 }
    );
  }
}
```

---

## 8. Type System

### Language & Type Support
- **Language**: TypeScript 5.5.0
- **Type Mode**: Strict mode enabled (`"strict": true` in `tsconfig.json`)
- **Type Support**: Full TypeScript with interfaces and type aliases

### TypeScript Configuration
From `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "esModuleInterop": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

### Type Definition Examples from Codebase

**CTAButton Component Types**:
```typescript
type Props = {
  children: React.ReactNode;
  href: string;
  variant?: "solid" | "outline";
};
```

**Contact Form State Type**:
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const [submitStatus, setSubmitStatus] = useState<{type: string, message: string} | null>(null);
```

---

## 9. Helper Function Patterns

### Location
- **Directory**: `lib/`
- **Subdirectory**: `lib/ai/` for AI-related helpers
- **Organization**: Currently organized by domain (e.g., `ai/` for AI functions)

### Existing Helper Function Example

**Lead Scorer Utility** (`lib/ai/lead-scorer.ts`):

```typescript
import { OpenAI } from 'openai';

export class LeadScorer {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  async scoreLead(formData: any) {
    const prompt = `
      As an AI revenue optimization expert, analyze this lead and provide:
      1. Priority: "urgent" (respond within 15min), "high" (2hrs), "medium" (24hrs)
      2. Revenue Potential: 0-100 scale
      3. Recommended Action: specific next steps
      4. Risk Score: likelihood of being spam/competitor

      Lead: ${JSON.stringify(formData)}

      Respond ONLY in JSON: {priority: string, revenuePotential: number, recommendedAction: string, riskScore: number}
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Fallback analysis
      return {
        priority: 'medium',
        revenuePotential: 50,
        recommendedAction: 'Follow up within 24 hours',
        riskScore: 30
      };
    }
  }
}
```

### Code Organization Style

**Patterns Used**:
1. **Class-based organization**: Grouping related functions in classes (e.g., `LeadScorer`)
2. **Error handling**: Try/catch blocks with fallback logic
3. **Environment-aware**: Checks for API keys before attempting operations
4. **Logging**: Console logging with context (emoji prefixes for clarity)
5. **Early returns**: Checking conditions before deep processing

### Helper Function Pattern Recommendations for Flowglad

**Suggested structure** (`lib/billing/flowglad.ts`):

```typescript
import { v4 as uuidv4 } from 'uuid';

export class FlowgladBillingHelper {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.FLOWGLAD_API_KEY!;
    if (!this.apiKey) {
      throw new Error('FLOWGLAD_API_KEY is not set');
    }
  }

  async createCustomer(email: string, name: string) {
    const customerId = uuidv4();
    
    try {
      console.log('💳 Creating Flowglad customer:', email);
      
      // Call Flowglad API
      const response = await fetch('https://api.flowglad.com/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: customerId,
          email,
          name,
          metadata: {
            createdAt: new Date().toISOString(),
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Flowglad API error: ${response.statusText}`);
      }

      const customer = await response.json();
      console.log('✅ Customer created:', customerId);
      return customer;

    } catch (error) {
      console.error('❌ Failed to create customer:', error);
      throw error;
    }
  }

  async createSubscription(customerId: string, planId: string) {
    try {
      console.log('📅 Creating subscription:', { customerId, planId });
      
      const response = await fetch('https://api.flowglad.com/subscriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          planId,
          startDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Flowglad API error: ${response.statusText}`);
      }

      const subscription = await response.json();
      console.log('✅ Subscription created:', subscription.id);
      return subscription;

    } catch (error) {
      console.error('❌ Failed to create subscription:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      console.log('🛑 Canceling subscription:', subscriptionId);
      
      const response = await fetch(`https://api.flowglad.com/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Flowglad API error: ${response.statusText}`);
      }

      console.log('✅ Subscription canceled:', subscriptionId);
      return true;

    } catch (error) {
      console.error('❌ Failed to cancel subscription:', error);
      throw error;
    }
  }
}
```

### Import Structure
```typescript
// Pattern 1: Class export
export class ClassName { }

// Pattern 2: Function export
export function helperFunction() { }

// Usage
import { ClassName } from '@/lib/billing/flowglad';
import { helperFunction } from '@/lib/utils/helpers';
```

---

## 10. Provider Composition Pattern

### Current Status
**No providers currently implemented.**

The application uses a simple layout without context providers or custom wrapper components.

### Recommended Provider Structure for Flowglad Integration

**Create a new providers file** (`components/providers.tsx`):

```tsx
'use client';

import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Future: Import Flowglad provider when ready
// import { FlowgladProvider } from '@flowglad/react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Flowglad would wrap children for billing context */}
      {/* <FlowgladProvider 
        apiKey={process.env.NEXT_PUBLIC_FLOWGLAD_KEY}
        environment={process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'}
      > */}
        {children}
      {/* </FlowgladProvider> */}
      
      <Analytics />
    </>
  );
}
```

### Updated Root Layout with Providers

Modify `app/layout.tsx` to include providers:

```tsx
import "./styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";
import { Providers } from "../components/providers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lgcylabs.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
  description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth. Fortune 500 reliability meets revenue-focused automation.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
    description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth.",
    url: SITE_URL,
    siteName: "LGCY Labs",
    images: ["/images/og-image.svg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LGCY Labs — Stop Revenue Leaks with Self-Healing AI Systems",
    description: "Enterprise-grade AI systems that prevent revenue leaks and generate predictable growth.",
    images: ["/images/og-image.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral text-gray-800">
        {/* Google Analytics scripts */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
            </Script>
          </>
        )}

        <Navbar />
        <main className="min-h-[70vh]">
          <Providers>
            {children}
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Provider Composition Pattern
The pattern above shows:
1. **Client-side only** (`'use client'` directive)
2. **Single provider composition** wrapping children
3. **Nesting**: Flowglad provider wraps content, Analytics as sibling
4. **Environment-aware**: Using environment variables for configuration

---

## 11. Environment Variables

### Environment File Name
- **Development**: `.env.local`
- **Template**: `.env.example`

### Environment File Content

**`.env.example`**:
```dotenv
NEXT_PUBLIC_SITE_URL=your_production_url
NEXT_PUBLIC_CONTACT_EMAIL=petter2025us@outlook.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_url
NEXT_PUBLIC_GITHUB_URL=your_github_url
NEXT_PUBLIC_HF_URL=your_huggingface_url
```

### Environment Variable Access Pattern

**Client-side** (public variables only, prefixed with `NEXT_PUBLIC_`):
```typescript
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lgcylabs.vercel.app";
```

**Server-side** (all variables):
```typescript
const apiKey = process.env.OPENAI_API_KEY!;
const hfToken = process.env.HUGGINGFACE_HUB_TOKEN;
```

### Recommended Flowglad Environment Variables

Add to `.env.example` and `.env.local`:

```dotenv
# Flowglad Configuration (Server-side only)
FLOWGLAD_API_KEY=your_flowglad_api_key
FLOWGLAD_WEBHOOK_SECRET=your_webhook_secret

# Flowglad Configuration (Public - Client-side)
NEXT_PUBLIC_FLOWGLAD_API_KEY=your_public_flowglad_key
NEXT_PUBLIC_FLOWGLAD_ENVIRONMENT=production

# Database (if using Flowglad with database)
DATABASE_URL=your_database_url
```

---

## 12. Existing Billing Code (If Any)

### Current Status
**No existing billing or payment integration code exists.**

The application contains:
1. ✅ Lead scoring AI (`lib/ai/lead-scorer.ts`)
2. ✅ Marketing website structure
3. ✅ Contact form with AI analysis (`app/api/contact/route.ts`)
4. ❌ No payment processing
5. ❌ No subscription management
6. ❌ No usage metering
7. ❌ No feature toggles

### Products & Services (Marketing Copy)

From `sections/Products.tsx`:

**Current Products** (hardcoded, no billing integration):

```tsx
<Card>
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded mb-4">
    <h3 className="text-xl font-bold">AI E-commerce Boilerplate</h3>
    <div className="text-2xl font-bold mt-2">$299</div>
  </div>
  <p className="text-gray-600">Complete AI storefront with recommendations, automated inventory & built-in funnels.</p>
</Card>

<Card>
  <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded mb-4">
    <h3 className="text-xl font-bold">AI Workflow Automation</h3>
    <div className="text-lg font-bold mt-2">Agencies & Enterprises</div>
  </div>
  <p className="text-gray-600">Automate complex workflows and eliminate manual bottlenecks.</p>
</Card>

<Card>
  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded mb-4">
    <h3 className="text-xl font-bold">E-commerce Intelligence</h3>
    <div className="text-lg font-bold mt-2">Analytics Dashboard</div>
  </div>
  <p className="text-gray-600">Predict trends, optimize pricing, and maximize LTV with predictive analytics.</p>
</Card>
```

### Services (from `sections/Services.tsx`)

```tsx
<Card>
  <div className="text-center mb-4">
    <h3 className="text-2xl font-bold">Technical Growth Audit</h3>
    <div className="text-2xl font-bold text-primary mt-3">$2,500</div>
    <div className="text-sm text-green-600 font-semibold mt-1">Identifies $10K-$50K in immediate revenue opportunities</div>
    <div className="text-sm text-gray-600 mt-1">1-week comprehensive analysis</div>
  </div>
</Card>

<Card className="border-2 border-accent md:scale-105 shadow-lg relative">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-blue-900 px-4 py-1 rounded-full font-bold text-sm">MOST POPULAR</div>
  <div className="text-center mb-4 pt-4">
    <h3 className="text-2xl font-bold">Revenue-Generating AI System</h3>
    <div className="text-3xl font-bold text-primary mt-3">$20,000</div>
    <div className="text-sm text-green-600 font-semibold mt-1">Typically delivers $100K+ ROI within 6 months</div>
    <div className="text-sm text-gray-600 mt-1">4–6 week implementation</div>
  </div>
</Card>

<Card>
  <div className="text-center mb-4">
    <h3 className="text-2xl font-bold">Fractional AI Leadership</h3>
    <div className="text-2xl font-bold text-primary mt-3">$5,000<span className="text-lg">/mo</span></div>
    <div className="text-sm text-green-600 font-semibold mt-1">Like having a world-class AI engineer on retainer</div>
    <div className="text-sm text-gray-600 mt-1">Ongoing strategic guidance</div>
  </div>
</Card>
```

### Plan Structure for Flowglad Mapping

**Product Plan IDs to Create**:

| Plan Name | Type | Price | Billing Cycle | Plan ID (recommended) |
|-----------|------|-------|---------------|----------------------|
| AI E-commerce Boilerplate | One-time | $299 | One-time purchase | `plan_boilerplate_299` |
| Technical Growth Audit | One-time | $2,500 | One-time purchase | `plan_audit_2500` |
| Revenue-Generating AI System | One-time | $20,000 | One-time purchase | `plan_ai_system_20000` |
| Fractional AI Leadership | Subscription | $5,000/mo | Monthly recurring | `plan_leadership_5000_monthly` |

---

## 13. Component Locations

### Pricing / Products Component
- **Location**: `sections/Products.tsx`
- **Type**: Server component listing all products
- **Current Features**: Displays hardcoded product cards with prices
- **Status**: Ready to integrate with Flowglad product catalog

**Current code**:
```tsx
import Card from "../components/Card";

export default function Products() {
  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Ready-to-Deploy Solutions</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Battle-tested foundations to accelerate time-to-value.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Product cards here */}
      </div>
    </section>
  );
}
```

### Services / Pricing Page
- **Location**: `sections/Services.tsx`
- **Type**: Server component with service tiers
- **Current Features**: Shows service offerings with pricing
- **Status**: Ready for Flowglad billing integration

### Navbar / Navigation Component
- **Location**: `components/Navbar.tsx`
- **Type**: Client component (`'use client'`)
- **Current Features**: 
  - Navigation links to sections
  - Mobile hamburger menu
  - CTA button to contact
- **Suggested Enhancement**: Add account/billing menu after auth implementation

**Current code (relevant sections)**:
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "#founder", label: "Founder" },
    { href: "#solutions", label: "Solutions" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-md">
              {/* Logo SVG */}
            </div>
            <Link href="/" className="font-semibold text-lg text-gray-900">
              LGCY Labs
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg font-semibold"
            >
              Build With Us
            </a>
          </nav>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            {/* Menu icon code */}
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-primary rounded transition-colors font-medium">
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="block px-3 py-2.5 bg-primary text-white rounded font-semibold hover:bg-blue-700 transition-colors">
                Build With Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
```

### Contact / Lead Capture Component
- **Location**: `sections/Contact.tsx`
- **Type**: Client component (`'use client'`)
- **Current Features**:
  - Contact form with name, email, message
  - Calendly booking integration
  - AI-powered lead analysis
  - Conversion tracking
- **Status**: Foundational component, ready to add billing/subscription flows

**Key sections from Contact.tsx**:
```tsx
'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: string, message: string} | null>(null);

  const trackConversion = (type: string) => {
    // Track in Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type, {
        event_category: 'conversion',
        event_label: 'contact_form',
        value: 1
      });
    }
    console.log(`📈 Conversion tracked: ${type}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        trackConversion('contact_form_success');
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you within 24 hours.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        trackConversion('contact_form_error');
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackCalendlyClick = () => {
    trackConversion('calendly_booking_click');
    window.open('https://calendly.com/petter2025us/30min', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      {/* Calendly booking button */}
      <button 
        onClick={trackCalendlyClick}
        className="bg-green-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg shadow-lg hover:shadow-xl"
      >
        Book Your Free Session Now
      </button>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Form inputs */}
      </form>

      {/* Email link */}
      <a 
        href="mailto:petter2025us@outlook.com"
        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        onClick={() => trackConversion('email_click')}
      >
        petter2025us@outlook.com
      </a>
    </section>
  );
}
```

### Main Home/Dashboard Page
- **Location**: `app/page.tsx`
- **Type**: Server component
- **Current Features**: Landing page with all sections

**Current code**:
```tsx
import Hero from "../components/Hero";
import Founder from "../sections/Founder";
import Solutions from "../sections/Solutions";
import Products from "../sections/Products";
import Services from "../sections/Services";
import Trust from "../sections/Trust";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-6">
        <Founder />
        <Trust />
        <Solutions />
        <Products />
        <Services />
        <Contact />
      </div>
    </>
  );
}
```

---

## 14. Summary & Integration Roadmap

### Current State
- ✅ Next.js 16 with App Router (TypeScript)
- ✅ React 18 with server components
- ✅ Tailwind CSS styling
- ✅ Lead capture with AI analysis
- ✅ Conversion tracking setup
- ❌ **No authentication**
- ❌ **No database**
- ❌ **No payment processing**

### Recommended Integration Steps

#### Phase 1: Foundation (Required)
1. **Add Authentication**
   - Install BetterAuth, Clerk, or Supabase Auth
   - Create user model with customer ID field
   - Add auth routes and middleware

2. **Add Database**
   - Choose: Supabase, Prisma + PostgreSQL, or Firebase
   - Create schema for users, subscriptions, billing events

3. **Create Billing Directory Structure**
   ```
   lib/
   ├── billing/
   │   ├── flowglad.ts (Flowglad helper class)
   │   ├── types.ts (Billing types)
   │   └── webhooks.ts (Webhook handlers)
   app/api/
   ├── billing/
   │   ├── create-subscription/route.ts
   │   ├── cancel-subscription/route.ts
   │   ├── list-subscriptions/route.ts
   │   └── webhooks/flowglad/route.ts
   ```

#### Phase 2: Flowglad Integration
1. **Add Flowglad SDK**
   ```bash
   npm install @flowglad/sdk
   ```

2. **Create Flowglad Provider** (`components/providers.tsx`)
   - Wrap with FlowgladProvider
   - Initialize with API key and environment

3. **Implement Billing Routes**
   - POST `/api/billing/create-subscription` - Create new subscription
   - POST `/api/billing/cancel-subscription` - Cancel subscription
   - GET `/api/billing/list-subscriptions` - List user subscriptions
   - POST `/api/billing/webhooks/flowglad` - Handle Flowglad webhooks

4. **Create Billing UI Components**
   - Pricing component with Flowglad products
   - Subscription management dashboard
   - Billing history view

#### Phase 3: Frontend Integration
1. **Update Products & Services Pages**
   - Fetch products from Flowglad
   - Display pricing dynamically
   - Add "Subscribe" buttons

2. **Add Account Pages**
   - `/app/account/billing` - Subscription management
   - `/app/account/settings` - User settings
   - Add to Navbar user menu

3. **Connect Contact Form**
   - Option to subscribe during contact form
   - Link subscriptions to leads

### Key Environment Variables
```dotenv
# Auth (example: Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Flowglad
FLOWGLAD_API_KEY=...
NEXT_PUBLIC_FLOWGLAD_API_KEY=...
NEXT_PUBLIC_FLOWGLAD_ENVIRONMENT=production

# Database
DATABASE_URL=...
```

### Type Definitions to Create

```typescript
// lib/billing/types.ts

export interface FlowgladCustomer {
  id: string;
  email: string;
  name: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface FlowgladSubscription {
  id: string;
  customerId: string;
  planId: string;
  status: 'active' | 'paused' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  canceledAt?: Date;
}

export interface FlowgladPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'annual' | 'one_time';
  features: string[];
}

export interface WebhookEvent {
  id: string;
  type: 'subscription.created' | 'subscription.updated' | 'subscription.canceled' | 'invoice.paid' | 'invoice.failed';
  data: Record<string, any>;
  timestamp: Date;
}
```

---

## File Reference Guide

All paths relative from `/workspaces/LGCY-Labs/`:

| File Path | Purpose | Type |
|-----------|---------|------|
| `package.json` | Dependencies and scripts | Configuration |
| `tsconfig.json` | TypeScript configuration | Configuration |
| `tailwind.config.ts` | Tailwind CSS customization | Configuration |
| `next.config.js` | Next.js configuration | Configuration |
| `app/layout.tsx` | Root layout with Navbar/Footer | Layout |
| `app/page.tsx` | Home page (landing page) | Page |
| `app/api/contact/route.ts` | Contact form API endpoint | API Route |
| `app/styles/globals.css` | Global styles | Styles |
| `components/Navbar.tsx` | Navigation component | Component |
| `components/Hero.tsx` | Hero section | Component |
| `components/CTAButton.tsx` | Call-to-action button | Component |
| `components/Card.tsx` | Reusable card component | Component |
| `components/Footer.tsx` | Footer component | Component |
| `sections/Contact.tsx` | Contact form section | Section |
| `sections/Products.tsx` | Products listing | Section |
| `sections/Services.tsx` | Services pricing | Section |
| `sections/Solutions.tsx` | Solutions section | Section |
| `sections/Trust.tsx` | Trust/testimonials section | Section |
| `sections/Founder.tsx` | Founder intro section | Section |
| `lib/ai/lead-scorer.ts` | AI lead scoring utility | Utility |
| `.env.example` | Environment variables template | Configuration |
| `.env.local` | Local environment variables | Configuration |

---

## Notes for Flowglad Implementation Team

1. **No Auth System Exists**: Must implement authentication before billing (recommend BetterAuth or Clerk)
2. **No Database**: Need to set up database layer for storing subscriptions and billing events
3. **Existing AI Integration**: Great foundation - can leverage lead scoring for customer segmentation
4. **Conversion Tracking Ready**: Analytics infrastructure already in place for tracking billing events
5. **Modular Component Structure**: Easy to add new billing components without affecting existing code
6. **Type Safety**: Full TypeScript coverage ensures reliability for billing logic
7. **Error Handling Pattern**: Consistent error handling with logging - good foundation for billing operations

---

**Document Generated**: November 21, 2025  
**Codebase**: LGCY Labs  
**Framework**: Next.js 16 (App Router) + React 18 + TypeScript 5.5.0  
**Status**: Ready for Flowglad integration phase 1 (Authentication & Database)
