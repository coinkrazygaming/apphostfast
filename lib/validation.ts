import { z } from 'zod';

// User validation
export const UserSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

// App validation
export const CreateAppSchema = z.object({
  name: z.string().min(2, 'App name too short').max(50, 'App name too long'),
  framework: z.enum([
    'next.js',
    'nuxt.js',
    'react',
    'vue.js',
    'angular',
    'express.js',
    'nestjs',
    'php',
    'wordpress',
    'static',
  ]),
  repositoryUrl: z.string().url('Invalid repository URL').optional(),
  repositoryBranch: z.string().default('main'),
  buildCommand: z.string().optional(),
  startCommand: z.string().optional(),
  envVars: z
    .record(z.string(), z.string())
    .optional()
    .default({}),
});

export const UpdateAppSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  buildCommand: z.string().optional(),
  startCommand: z.string().optional(),
  envVars: z.record(z.string(), z.string()).optional(),
});

// Domain validation
export const CreateDomainSchema = z.object({
  domain: z.string().min(3, 'Domain too short'),
  appId: z.string().uuid('Invalid app ID'),
});

// Deployment webhook
export const DeploymentWebhookSchema = z.object({
  action: z.enum(['opened', 'synchronize', 'reopened']).optional(),
  pull_request: z
    .object({
      head: z.object({
        sha: z.string(),
        ref: z.string(),
        repo: z.object({
          clone_url: z.string(),
        }),
      }),
    })
    .optional(),
  push: z
    .object({
      ref: z.string(),
      head_commit: z.object({
        id: z.string(),
        message: z.string(),
        url: z.string(),
      }),
      repository: z.object({
        clone_url: z.string(),
      }),
    })
    .optional(),
  repository: z.object({
    name: z.string(),
    full_name: z.string(),
  }),
});

// Type exports
export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type CreateApp = z.infer<typeof CreateAppSchema>;
export type UpdateApp = z.infer<typeof UpdateAppSchema>;
export type CreateDomain = z.infer<typeof CreateDomainSchema>;
