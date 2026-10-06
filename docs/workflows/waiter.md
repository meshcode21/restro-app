# Workflow: Waiter

## Goal

Handle requests for human assistance and serving status efficiently.

## Waiter request flow

```text
Customer taps Call Waiter
    ↓
Create waiter request
    ↓
Staff sees request
    ↓
Acknowledge
    ↓
Resolve
```

Suggested states:

```text
OPEN
ACKNOWLEDGED
RESOLVED
CANCELLED
```

## Serving flow

```text
READY
  ↓
Waiter serves
  ↓
SERVED
```

The exact serving workflow may be refined after observing real restaurant operations.

## Rules

- Request belongs to a table session.
- Staff must be authorized for the branch.
- Realtime improves speed but server state remains authoritative.
- Avoid making staff navigate through unrelated admin screens to resolve requests.
