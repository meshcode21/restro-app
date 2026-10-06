# Workflow: Billing

## Goal

Produce one authoritative bill for a dining session containing multiple orders.

## Flow

```text
Session contains orders
        ↓
Eligible order items aggregated
        ↓
Server calculates subtotal/VAT/other charges
        ↓
Bill shown to staff/customer
        ↓
Payment recorded
        ↓
Bill settlement evaluated
        ↓
Session may close
```

## Rules

- Bill belongs to the table session.
- Multiple orders can contribute to one bill.
- Order-item price snapshots preserve history.
- Financial totals are server-derived.
- NPR is the initial currency.
- VAT calculation must follow explicit business rules.
- Manual adjustments require authorization and should be auditable.

## Important edge cases

- Order cancelled after bill preview
- Manual discount
- Service charge
- Tax/VAT rounding
- Partial payment if later supported
- Payment failure
- Cash settlement
- Session closure with outstanding balance
