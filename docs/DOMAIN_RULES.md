# Domain Rules

This document is the business source of truth.

## Organization

- One organization is one SaaS restaurant business/tenant.
- An organization may have multiple branches.
- Tenant-owned data must not cross organization boundaries.
- Super Admin is a platform-level role and may operate across tenants according to platform permissions.

## Branch

- A branch belongs to exactly one organization.
- Tables, menu, orders, table sessions, waiter requests, and operational activity are branch-scoped where appropriate.

## Table

- A table belongs to one branch.
- A table has a stable public identifier represented by its physical QR code.
- The QR identifies table context but does not authorize ordering by itself.
- A table may have at most one active table session.

Suggested operational states:

```text
AVAILABLE
OCCUPIED
CLEANING
RESERVED
```

Exact state set can evolve, but it must remain consistent with the session lifecycle.

## Table session

- A table session represents one dining session at one table.
- One table cannot have two active sessions simultaneously.
- Staff starts a session.
- Starting a session creates a new random session access code.
- The code is valid only for that active session.
- Multiple customers/devices may join the same session.
- Each joined device may receive temporary authorization.
- Multiple orders may be created within the same session.
- The final bill aggregates the session's orders.
- Closing a session invalidates further customer ordering access.

## Session access code

Treat this as a **Session Access Code**, not a traditional identity OTP.

Requirements:

- Short human-enterable code, e.g. 6 digits.
- Cryptographically secure random generation.
- Bound to the active table session.
- Rate-limited against brute force.
- Invalidated on session close.
- Prefer storing a secure representation/hash rather than a reusable plaintext credential.
- Printed delivery is supported operationally.
- SMS delivery can be added later.

## Customer ordering

- Customer must belong to an active table session.
- Backend must verify the session authorization.
- Menu availability is checked server-side.
- Quantity is validated.
- Price/totals are calculated server-side.
- Order items persist price/name snapshots for historical accuracy.
- Closed sessions cannot accept orders.
- Duplicate submissions must be handled safely.

## Order lifecycle

Suggested lifecycle:

```text
PENDING
→ CONFIRMED
→ PREPARING
→ READY
→ SERVED
```

Alternative terminal state:

```text
CANCELLED
```

Do not allow arbitrary client state transitions. The backend must validate who can perform each transition and under what conditions.

## Kitchen

- Kitchen sees authorized orders for its branch.
- Kitchen processes preparation statuses.
- Kitchen does not control financial settlement.
- Customer-facing status should reflect server state, not stale UI state.

## Waiter requests

- A waiter request belongs to a table session.
- It is visible to authorized staff for the branch.
- It has a lifecycle and can be acknowledged/resolved.

Suggested states:

```text
OPEN
ACKNOWLEDGED
RESOLVED
CANCELLED
```

## Billing

- A bill belongs to a table session.
- Multiple orders can contribute to one bill.
- Historical prices come from order-item snapshots.
- Bill totals are calculated by server-side rules.
- NPR is the initial currency.
- VAT handling is part of V1 and must be represented explicitly in the financial model.
- Any service charge/discount behavior must be based on explicit configured rules, not ad-hoc frontend calculations.

## Payment recording

V1 may record:

- Cash
- eSewa QR
- Khalti QR
- Other configured/manual methods as needed

**Payment gateway integration is out of scope for V1.**

Recording a payment is still a server-authorized financial action and should be auditable.

## Session closing

A session may close only when its operational and financial rules allow it.

At minimum:

- No unresolved business blocker.
- Bill is settled according to configured policy, or an authorized staff member records an allowed offline settlement.
- New orders are blocked after closure.
- Customer session authorization no longer permits ordering.
- Table transitions toward `AVAILABLE` or the next operational state.

## Subscription

- Restaurant subscription activation is manual in V1.
- Subscription status is controlled by authorized Super Admin/platform actions.
- Customer self-signup and automated recurring billing are not V1 requirements.

## Configuration

Potential restaurant configuration includes:

- Self-order enabled/disabled
- Waiter-call enabled/disabled
- Payment timing policy
- Supported payment methods
- VAT/service-charge/discount settings

Only implement configuration that supports a real V1 workflow.
