# Security Requirements

This is a real SaaS intended for real restaurants from day one. Security, tenant isolation, and backups are mandatory V1 concerns.

## Multi-tenant isolation

**Critical rule:** a request must never access another organization's data by manipulating IDs.

Tenant identity must come from trusted authenticated context.

For branch-scoped resources, enforce:

`authenticated organization → authorized branch → resource`

Frontend route hiding is not authorization.

## Authentication

Staff authentication and customer table-session authorization are separate concerns.

Staff authentication provider/design: **TBD**.

Customer access is granted only after joining an active table session with the valid session access code.

## Platform Administration Authorization

Platform-level operations (super admin, support) are managed independently via the `platform_members` table.
- A user must have an active `platform_members` record with the required role.
- Platform membership must be provisioned via a secure seed or controlled setup, never via public registration or client-side input.
- Endpoints serving platform functions (`apps/platform-app`) must verify this membership explicitly. Front-end route hiding is not sufficient.

## Session access code

Requirements:

- cryptographically secure random generation
- short human-enterable code such as 6 digits
- bound to one active session
- brute-force/rate-limit protection
- invalidated on session close
- secure representation/hash where practical
- never a permanent table password

## QR security

A fixed QR identifies the table but does not authorize ordering. A copied/photo-shared QR should not be sufficient to create an order.

## Authorization

Always check:

- authenticated actor
- organization ownership
- branch access
- role/permission
- resource ownership
- domain state

## Input validation

Validate all untrusted input, including:

- path/query params
- request bodies
- access codes
- quantities
- customizations
- financial fields
- public identifiers

## Financial security

Never trust client-provided:

- totals
- tax amount
- payment success state
- payment references

The server calculates financial totals and records payment state.

## Payment recording

V1 payment methods such as cash, eSewa QR, or Khalti QR are recorded as operational payment records. This is not gateway verification.

Only authorized staff should be able to record or correct offline/manual payments.

Future gateway integrations must verify provider callbacks/webhooks server-side.

## Rate limiting

Prioritize:

- table session access-code verification
- authentication
- order submission
- payment recording
- public abuse-sensitive endpoints

## Secrets

Never commit credentials, API keys, database passwords, signing secrets, or private keys.

Use environment/secret management.

## Logging

Use structured logs and request/correlation IDs where practical.

Do not log passwords, session tokens, secrets, or unnecessary personal information.

## Auditability

Audit privileged actions such as:

- organization creation/onboarding
- subscription activation/suspension
- menu price changes
- order cancellation by staff
- bill adjustments
- manual payment recording/correction
- session closure

## Backups

Backups are mandatory for production.

Minimum baseline:

- automated PostgreSQL backups
- defined backup retention
- backup monitoring/failure alerting
- periodic restore testing
- documented recovery procedure

A backup that has never been restored/tested should not be considered proven.

Exact backup provider/tooling: **TBD**.

## Data privacy

Collect only the customer information needed for the workflow. Do not collect phone number/identity information unless a feature actually needs it.

Define retention policies before expanding customer data collection.

## Frontend security

- browser state is untrusted
- no secrets in client bundles
- privileged operations protected server-side
- secure session/cookie practices according to auth design
- safe handling of user-generated text
- CSRF protection where applicable to the chosen auth architecture

## Dependency security

- Keep dependencies minimal.
- Review newly introduced dependencies.
- Keep lockfiles committed.
- Update dependencies regularly.
- Include dependency/security checks in CI where practical.

## Production baseline

Before onboarding real restaurants:

- HTTPS
- secure secrets
- automated backups
- restore test
- monitoring/error tracking
- rate limiting
- migration controls
- least-privilege DB/service credentials
- tenant-isolation tests
- audit trail for privileged financial/admin actions
