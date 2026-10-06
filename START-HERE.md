# Start Here

This context pack is intended to be committed to the project before serious AI-assisted coding begins.

## First files an AI agent should understand

1. `AGENTS.md`
2. `docs/PROJECT.md`
3. `docs/ARCHITECTURE.md`
4. `docs/DOMAIN_RULES.md`
5. `docs/DECISIONS.md`
6. `docs/ROADMAP.md`

Then read the specific workflow and technical document related to the current task.

## Important current decisions

- Product name: **not decided yet**
- Monorepo: **Turborepo + pnpm**
- Frontend: **Next.js + TypeScript**
- Backend: **separate Node.js + TypeScript API**
- Database: **PostgreSQL**
- ORM: **Drizzle**
- Tenancy: **shared DB/shared tables with strict tenant scoping**
- Onboarding: **manual via Super Admin**
- Subscription activation: **manual via Super Admin**
- V1 payment gateway integration: **out of scope**
- V1 self-signup/automated billing: **out of scope**
- Realtime transport: **TBD**
- Auth provider: **TBD**
- Exact RBAC matrix: **TBD**
- Deployment: **TBD**

## Core V1 boundary

Do not expand the product beyond the core restaurant dining workflow without an explicit product decision.
