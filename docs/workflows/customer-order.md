# Workflow: Customer Ordering

## Goal

Allow multiple customers at one table to independently place orders in the same active dining session.

## Flow

```text
Scan table QR
    ↓
Load table context
    ↓
Enter session access code
    ↓
Backend validates active session + code
    ↓
Create temporary customer session authorization
    ↓
Show digital menu
    ↓
Add items to cart
    ↓
Submit order
    ↓
Backend validates + calculates totals
    ↓
Create order + items transactionally
    ↓
Publish order-created event
    ↓
Customer sees order status
```

## Rules

- QR alone does not authorize ordering.
- The code must match the active table session.
- Each device is authorized only for that session.
- Backend recalculates item availability and financial totals.
- Closed sessions cannot accept new orders.
- Duplicate/retry submissions must be safe.
- Multiple devices can order independently within the same session.

## Failure cases

Handle:

- invalid/expired code
- no active session
- rate limit exceeded
- menu item unavailable
- menu price changed before submission
- duplicate request/retry
- network loss
- session closed while customer is browsing
