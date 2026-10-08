# Architecture Decisions

This file prevents AI agents and contributors from repeatedly reopening settled decisions.

## ADR-001 — Monorepo

**Status:** Accepted

Use Turborepo with pnpm.

**Reason:** Multiple apps/packages need shared contracts, validation, DB types, UI primitives, and configuration.

## ADR-002 — Separate frontend/backend apps

**Status:** Accepted

Use Next.js for the frontend and a separate Node.js + TypeScript backend API.

**Reason:** Clear separation of UI and business logic, a clean API boundary, and room for future clients.

## ADR-003 — PostgreSQL

**Status:** Accepted

Use PostgreSQL as the primary database.

**Reason:** Strong relational/transactional fit for organizations, branches, tables, sessions, orders, bills, and payments.

## ADR-004 — Drizzle ORM

**Status:** Accepted

Use Drizzle ORM.

**Reason:** TypeScript-first, explicit database control, and alignment with the project's existing PostgreSQL/Drizzle preference. Prisma remains a valid alternative in general, but not the current project decision.

## ADR-005 — Shared DB/shared tables tenancy for V1

**Status:** Accepted

Use one shared PostgreSQL database with explicit organization scoping on tenant-owned rows.

**Reason:** Lower operational complexity and cost for V1 while supporting many restaurants.

## ADR-006 — Table session is first-class

**Status:** Accepted

Use `TableSession` between `Table` and `Order`.

**Reason:** One physical table can host multiple dining sessions over time, and one active session can contain multiple customers and multiple orders with one session-level bill.

## ADR-007 — QR + session access code

**Status:** Accepted

The physical QR identifies the table. A separate active-session access code is required before ordering.

**Reason:** A copied/photo-shared QR should not be enough to place an order.

## ADR-008 — Multiple customers per session

**Status:** Accepted

Multiple devices can join one table session and create separate orders.

**Reason:** This matches real group dining behavior.

## ADR-009 — Manual onboarding/subscription activation in V1

**Status:** Accepted

Super Admin manually creates/onboards restaurant tenants and activates subscriptions.

**Reason:** V1 prioritizes controlled rollout and support. Self-signup and automated billing are explicitly out of scope.

## ADR-010 — Nepal-first financial context

**Status:** Accepted

V1 supports NPR, VAT handling, and recording local payment methods such as eSewa/Khalti QR. Gateway integration is out of scope.

**Reason:** The initial customer market is Nepal, so the product must fit local operations without prematurely building gateway infrastructure.

## ADR-011 — Price snapshots on order items

**Status:** Accepted

Persist item name/price snapshots on order items.

**Reason:** Historical orders and bills must not change when current menu prices are edited.

## ADR-012 — Separate frontend apps for Service Provider and Service Taker

**Status:** Accepted

Separate the frontend into two apps: `apps/organization-app` (for restaurants/service takers) and `apps/platform-app` (for the platform/service provider super admin).

**Reason:** Clear separation of concerns and security boundaries. The platform admin interface (manual onboarding, subscriptions) is logically distinct from the restaurant operations interface (digital menu, KDS, billing).

## ADR-013 — Separate Platform Administration Membership

**Status:** Accepted

Separate platform-level administration from restaurant organization management by introducing a `platform_members` table, distinct from `users` and `organization_members`.

**Reason:** A user may have both platform and organization memberships, but each grants access independently. This prevents privilege escalation (e.g., a support employee gaining restaurant management access, or a restaurant owner gaining platform administration access). Platform membership must be explicitly provisioned via secure setup, never via public registration.

## Open decisions

Record each choice here once finalized:

- Backend framework (Express/Fastify/NestJS/etc.)
- Staff auth provider/design
- Customer session-token design
- Realtime transport
- Exact RBAC roles/permission matrix
- ID strategy
- Money/tax calculation library/model
- Exact VAT rules
- Deployment platform
- File/image storage
- SMS provider, if added
- Monitoring/error tracking stack
- CI/CD platform
- Subscription plans/pricing model
- Exact order/item state machines
