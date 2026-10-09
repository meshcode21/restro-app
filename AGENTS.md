# AGENTS.md

## Purpose

This repository is a production-oriented, Nepal-focused, multi-tenant restaurant SaaS.
Read the project context before making architectural or domain-level changes.

## Required context

Before implementing a feature, read:

1. `docs/PROJECT.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DOMAIN_RULES.md`
4. `docs/DATABASE.md`
5. `docs/API.md`
6. `docs/SECURITY.md`
7. `docs/CODING_STANDARDS.md`
8. `docs/DECISIONS.md`
9. `docs/ROADMAP.md`

For workflow-specific work, also read the relevant file in `docs/workflows/`.

## Working rules

- `docs/DOMAIN_RULES.md` is the source of truth for business behavior.
- `docs/DECISIONS.md` records accepted architectural decisions and open decisions.
- Do not silently replace accepted architecture with a different approach.
- Do not introduce a new dependency without a clear reason.
- Never trust a client-provided tenant/tenant ID for authorization.
- Every tenant-owned query must be scoped to the authenticated tenant.
- Strictly maintain the separation between platform administration (`platform_members`) and restaurant tenant management (`tenant_members`).
- Never add platform-level roles or authorization flags to the `users` table. Platform access must be verified exclusively against active records in `platform_members`.
- Never implement public registration or self-provisioning for platform administration roles.
- Backend authorization and business validation are mandatory even when the frontend validates too.
- Prefer small, focused changes over broad refactors.
- Inspect existing code before introducing a new abstraction.
- Avoid building V1 features that are explicitly out of scope.
- When using shadcn/ui components, be aware they use Base UI primitives. Use the `render={<Element />}` prop instead of the Radix UI `asChild` prop to avoid TypeScript errors.
- Keep backend controllers thin. Isolate business logic in `apps/server/src/services/*.service.ts`. Controllers only handle request parsing and HTTP responses.
- Ensure type-safe API responses using `Response<ApiResponse<T>>` in Express controllers. Define `ApiResponse` and data payload types in `@workspace/types`.
- Use `AppError` class in services to throw errors with specific codes (`UNAUTHORIZED`, `FORBIDDEN`). Catch and map in controller. Do not cast `Error` to `any`.

## Product guardrails

V1 is primarily about:

`table/session access → digital menu → ordering → kitchen → serving → billing → payment recording → reports`

Do not turn V1 into a full restaurant ERP. Inventory/recipes, offline mode, payment gateway integration, self-signup/automated billing, delivery, reservations, payroll/HR, loyalty/CRM, accounting, and native mobile apps are intentionally out of scope.

## Implementation workflow

1. Read the relevant docs.
2. Identify the app/package that owns the change.
3. Implement the smallest coherent change.
4. Add/update tests for changed behavior.
5. Run relevant lint, typecheck, tests, and build commands.
6. Update docs when behavior or architecture changes.
7. Summarize what changed and what was validated.
8. Proactively check off completed items or mark them as `(UI Prototyped)` in `docs/ROADMAP.md` immediately after finishing a significant implementation chunk. Do not wait for the user to ask.

## Do not do automatically

- Restructure the monorepo.
- Change database or ORM.
- Add automated self-signup/subscriptions in V1.
- Add payment gateway integration in V1.
- Bypass tenant authorization for convenience.
- Treat a table session code as a permanent password.
- Mark online payment as successful from client state alone.
- Add ERP modules that are explicitly outside V1.
- Start long-running dev servers (e.g., `pnpm dev`) as background daemons automatically unless explicitly requested, to avoid blocking ports.

## Documentation maintenance

When an accepted architectural decision changes, update `docs/DECISIONS.md`.
When a business rule changes, update `docs/DOMAIN_RULES.md`.
When a workflow changes, update its workflow document.
When roadmap scope changes, update `docs/ROADMAP.md`.
