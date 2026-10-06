# Coding Standards

## Philosophy

Write code that is explicit, readable, testable, and maintainable. Prefer simple code over clever abstractions.

## TypeScript

- Strict TypeScript.
- Avoid `any` unless a boundary genuinely requires it.
- Prefer domain-specific types.
- Narrow `unknown` safely.
- Do not duplicate shared contracts unnecessarily.

## Naming

Use domain language consistently:

```text
tableSession
sessionAccessCode
orderItem
waiterRequest
organizationId
branchId
```

Avoid vague names such as `data`, `obj`, `thing`, or `record` when the domain name is known.

## Backend structure

A practical structure is:

```text
route/controller
    ↓
input validation
    ↓
authorization
    ↓
application/domain logic
    ↓
database/repository
```

Do not force layers that add no value, but keep critical rules discoverable.

## Validation

- Frontend validation improves UX.
- Backend validation is authoritative.
- Database constraints should protect important invariants where practical.

## API

Keep consistent:

- status codes
- error codes
- response envelopes
- pagination
- naming

## Database

- Use Drizzle.
- Use transactions for atomic business operations.
- Avoid N+1 queries where it matters.
- Index based on real query patterns.
- Never bypass tenant scoping.

## Next.js / React

- Prefer Server Components where appropriate.
- Use Client Components when interaction/browser state requires them.
- Keep server-only code out of browser bundles.
- Do not duplicate core business logic in UI components.

## UI

Kitchen, waiter, and restaurant operations should be optimized for speed and clarity. Avoid unnecessary animation or decorative complexity in operational screens.

## Shared packages

Create shared packages when multiple apps genuinely benefit from the same stable abstraction. Do not create packages solely to add folder structure.

## Dependencies

Before adding a dependency:

1. Check whether existing tools already solve the problem.
2. Consider runtime/bundle impact.
3. Consider maintenance quality.
4. Add only when the value is clear.

## Tests

Prioritize tests for:

- tenant isolation
- authorization/RBAC
- table session rules
- order state transitions
- bill calculations
- payment recording
- duplicate/retry behavior
- critical API endpoints

## Commits

Prefer focused commits, e.g.:

```text
feat: add table session creation
feat: add customer order submission
fix: enforce branch scope on kitchen orders
test: cover duplicate payment recording
docs: record realtime transport decision
```

## AI-generated code

AI output is not trusted by default. Verify authorization, tenant scope, state transitions, transactions, concurrency, error handling, and tests. Compiling code is not proof of correctness.
