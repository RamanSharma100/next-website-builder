import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
  DB_USERNAME: z.string().optional(),
  DB_PASSWORD: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABSE_SERVICE_ROLE_KEY: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_SCHEME: z.string(),
  UPLOADTHING_SECRET: z.string(),
  UPLOADTHING_APP_ID: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_CLIENT_ID: z.string().optional(),
  NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT: z.string(),
  NEXT_PUBLIC_PLATFORM_ONETIME_FEE: z.string(),
  NEXT_PUBLIC_PLATFORM_AGENY_PERCENT: z.string(),
  NEXT_PLURA_PRODUCT_ID: z.string().optional(),
  DATABPASE_PASSWORD: z.string().optional(),
  DATABASE_URL: z.string(),
  PROD_DATABASE_URL: z.string().optional(),
  LOCAL_DATABASE_URL: z.string(),
  NEXT_PUBLIC_BUILDER_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Env {}
  }
}
