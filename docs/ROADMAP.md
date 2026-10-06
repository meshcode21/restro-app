# Product Roadmap

The roadmap prioritizes proving the core dining workflow before expanding into ERP-style modules.

## Phase 0 — Monorepo foundation

- Turborepo + pnpm
- `apps/web`
- `apps/api`
- shared packages
- PostgreSQL development environment
- Drizzle setup + migrations
- lint/typecheck/test/build baseline
- environment config
- CI foundation

Definition of done: clean install, build, DB migration, and CI checks work.

## Phase 1 — Platform + tenancy

- Super Admin foundation
- Organizations/tenants
- Manual restaurant onboarding
- Manual subscription activation
- Branches
- Staff users
- Initial RBAC
- Tenant-aware request context
- Tenant-scoped data access

Definition of done: multiple restaurants can exist while their data remains strictly isolated.

## Phase 2 — Restaurant setup

- Branch settings
- Table CRUD/status
- Stable QR/public identifiers
- QR generation/printing
- Menu categories/items
- Staff setup
- Start table session
- Generate session access code

## Phase 3 — Customer ordering

- QR landing
- Access-code verification
- Temporary customer session authorization
- Digital menu
- Cart
- Order creation
- Multiple devices per table session
- Multiple orders per session
- Customer order status

Definition of done: a real group can use several phones at one table and all orders aggregate correctly into one session.

## Phase 4 — Kitchen

- KDS queue
- Incoming order workflow
- Preparation state changes
- Realtime updates
- Order aging/visibility

## Phase 5 — Waiter operations

- Call waiter/request assistance
- Staff acknowledgement
- Resolution
- Serving state

## Phase 6 — Billing

- Session bill
- Order aggregation
- Price snapshots
- NPR/VAT calculation rules
- Discounts/service charge if finalized
- Bill display

Definition of done: one session with multiple orders produces one correct bill.

## Phase 7 — Payment recording

- Payment methods
- Cash recording
- eSewa QR recording
- Khalti QR recording
- Manual payment audit trail
- Payment corrections/permissions

Payment gateway integration is explicitly deferred.

## Phase 8 — Basic reporting

- Sales summary
- Order counts
- Payment summary
- Branch comparison
- Basic table utilization
- Reasonable export support where useful

Success target: owners can see branch sales without counting bills manually.

## Phase 9 — Production hardening

- Production deployment
- Automated backups
- Restore test
- Monitoring/error tracking
- Rate limiting
- Security review
- Tenant-isolation tests
- Concurrency/retry tests
- Operational runbooks

## Future modules

Possible later capabilities:

- inventory/recipes
- delivery/online ordering
- reservations
- payroll/HR
- loyalty/CRM
- accounting
- advanced analytics
- native mobile apps
- payment gateway integrations
- self-service onboarding/subscriptions
