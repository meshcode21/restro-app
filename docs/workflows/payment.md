# Workflow: Payment

## V1 goal

Record and reconcile payment methods used by the restaurant without integrating a payment gateway yet.

## Supported V1 concepts

- Cash
- eSewa QR
- Khalti QR
- Other explicitly configured/manual payment methods

## Cash flow

```text
Staff receives cash
    ↓
Authorized staff records payment
    ↓
Server validates bill + amount
    ↓
Payment record saved
    ↓
Bill settlement recalculated
```

## Local QR recording flow

```text
Customer pays using restaurant's eSewa/Khalti QR
    ↓
Restaurant verifies payment operationally
    ↓
Authorized staff records payment method + amount/reference if available
    ↓
Server stores auditable payment record
```

This is a **recording workflow**, not API-level gateway confirmation.

## Rules

- Client cannot directly mark a bill as paid without an authorized payment action.
- Payment amounts must be server-validated.
- Manual corrections require appropriate permissions.
- Duplicate payment records must be prevented or detected.
- Payment history should remain auditable.

## Future gateway boundary

Later gateway support should add provider adapters and verified callbacks/webhooks without changing the core `Bill → Payment` domain relationship.
