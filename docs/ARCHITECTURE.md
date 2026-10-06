# Technical Architecture

## Target architecture

Use a Turborepo monorepo managed by pnpm.

```text
repository/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Node.js + TypeScript backend API
│
├── packages/
│   ├── db/           # Drizzle + PostgreSQL schema/migrations/helpers
│   ├── types/        # Shared TypeScript contracts
│   ├── validation/   # Shared validation schemas
│   ├── ui/           # Shared UI primitives where useful
│   ├── config/       # Shared project configuration
│   └── auth/         # Shared auth utilities where appropriate
│
├── docs/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

A separate `apps/kitchen` is optional. Initially, the kitchen display may be a role-specific area of `apps/web`.

## Frontend: `apps/web`

Responsibilities:

- Customer experience
- Restaurant dashboard
- Kitchen/KDS UI
- Waiter UI
- Billing UI
- Menu/table/session administration UI
- Authentication screens
- Calling backend APIs
- Realtime subscriptions where required

The frontend must not be the only enforcement layer for authorization or business rules.

## Backend: `apps/api`

Responsibilities:

- Authentication and authorization
- Tenant/branch resolution
- Business logic
- Table-session lifecycle
- Orders and state transitions
- Billing
- Payment recording/orchestration
- Webhooks if/when gateway integration is added later
- Realtime event publication
- Rate limiting
- Audit logging
- API validation
- Database access through `packages/db`

## Database

- PostgreSQL
- Drizzle ORM

V1 tenancy model:

- One shared PostgreSQL database
- Shared tables
- Explicit organization scoping on tenant-owned data

## Multi-tenancy model

```text
Organization
 ├── Branch
 │    ├── Tables
 │    ├── Menu
 │    ├── Staff assignments
 │    └── Table Sessions
 │          └── Orders
 │                └── Order Items
 │          └── Bill
 │                └── Payments
 └── Organization-level configuration
```

Backend must derive organization context from trusted authentication. Never trust an arbitrary `organizationId` from the client.

## Realtime

Realtime is required for operational updates such as order status, kitchen changes, waiter requests, and customer order status.

**Transport is TBD.** Candidates include WebSockets, Server-Sent Events, or a managed realtime provider. Keep domain events independent from the transport.

## Payments

V1 supports recording/manual settlement for methods such as cash and local QR payments. **Payment gateway integration is explicitly out of scope for V1.**

The architecture should still leave a clean boundary for future gateway adapters and verified webhooks.

## Authentication

Staff authentication and customer table-session authorization are separate concerns.

**Staff auth provider/design: TBD.**

Customer table access is based on the active table session and its session access code, not staff identity.

## Onboarding and subscriptions

V1 uses **manual onboarding** and **manual subscription activation** through the Super Admin panel.

Self-signup and automated billing are out of scope.

## Deployment

Deployment platform is **TBD**.

Minimum production requirements:

- HTTPS
- Environment/secret management
- PostgreSQL backups
- Restore testing
- Error monitoring
- Structured logging
- Health checks
- Migration controls
- Least-privilege credentials

## Architectural boundaries

```text
UI/client
   ↓
API boundary
   ↓
Application/domain logic
   ↓
Database
```

Realtime distribution is an additional delivery path for domain state changes.

Financial state must remain server authoritative.
