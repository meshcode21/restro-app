# API Contract

The API is backend-owned. Endpoint names below are provisional and can be refined during implementation.

## Style

- HTTP API
- JSON request/response
- TypeScript
- Shared validation where useful
- Consistent status codes and error codes

## Provisional route groups

```text
/api/auth
/api/admin
/api/organizations
/api/subscriptions
/api/branches
/api/tables
/api/table-sessions
/api/menus
/api/orders
/api/kitchen
/api/waiter-requests
/api/bills
/api/payments
/api/reports
```

## Platform/Super Admin APIs

Likely capabilities:

```text
POST  /api/admin/organizations
GET   /api/admin/organizations
GET   /api/admin/organizations/:id
PATCH /api/admin/organizations/:id
POST  /api/admin/organizations/:id/subscription/activate
POST  /api/admin/organizations/:id/suspend
```

Exact routes and permissions are TBD.

## Customer session APIs

Conceptual:

```text
POST /api/table-sessions/join
GET  /api/table-sessions/current
POST /api/table-sessions/leave
```

Join should validate:

- table public identifier
- active session
- session access code
- rate limits

The response creates temporary authorization for that customer device/session.

## Menu APIs

Conceptual:

```text
GET /api/public/tables/:tablePublicId/menu
GET /api/branches/:branchId/menu
```

Public customer endpoints must expose only intended menu data.

## Order APIs

Customer:

```text
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
POST /api/orders/:id/cancel
```

Staff:

```text
GET   /api/restaurant/orders
GET   /api/restaurant/orders/:id
PATCH /api/restaurant/orders/:id/status
```

Every request must be authorized against tenant/branch context and domain state.

## Kitchen APIs

```text
GET   /api/kitchen/orders
PATCH /api/kitchen/orders/:id/status
```

Exact item-level vs order-level actions are TBD.

## Waiter request APIs

```text
POST  /api/waiter-requests
GET   /api/waiter-requests
PATCH /api/waiter-requests/:id
```

## Billing APIs

```text
GET  /api/bills/:id
POST /api/bills/:id/finalize
```

Bill totals are server-derived.

## Payment APIs

V1 manual-recording concept:

```text
POST /api/bills/:id/payments
GET  /api/payments/:id
```

Gateway/webhook routes are a future boundary, not a V1 implementation requirement.

## Idempotency

Use idempotency for operations where retries can create duplicate business events, especially order submission and payment recording.

The exact mechanism is TBD.

## Errors

Use a consistent structure:

```json
{
  "error": {
    "code": "TABLE_SESSION_NOT_ACTIVE",
    "message": "The table does not have an active dining session."
  }
}
```

Do not expose SQL errors, stack traces, secrets, or implementation details.

## Pagination

Use a consistent pagination strategy. Cursor pagination may be preferable for high-volume operational feeds, but the exact approach is TBD.

## Realtime event names

Keep domain events transport-independent. Examples:

```text
order.created
order.confirmed
order.preparing
order.ready
order.served
waiter_request.created
waiter_request.resolved
bill.updated
payment.updated
table_session.closed
```

## Contract discipline

- Avoid breaking existing clients casually.
- Prefer additive API changes.
- Validate input at the backend boundary.
- Keep frontend/backend contracts testable.
