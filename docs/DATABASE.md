# Database Context

## Primary database

PostgreSQL

## ORM

Drizzle ORM

## Conceptual entity model

```text
Platform
└── Organizations (tenants)
     ├── Subscription
     ├── Branches
     │    ├── Tables
     │    │    └── Table Sessions
     │    │          ├── Customer Devices / Session Members
     │    │          ├── Orders
     │    │          │    └── Order Items
     │    │          ├── Waiter Requests
     │    │          └── Bill
     │    │               └── Payments
     │    ├── Menu Categories
     │    └── Menu Items
     └── Staff memberships / roles
```

## Likely core tables

### organizations

Represents a tenant/business.

Possible fields:

- id
- name
- slug
- status
- created_at
- updated_at

### subscriptions

V1 records manual subscription state.

Possible fields:

- id
- organization_id
- plan
- status
- starts_at
- ends_at
- activated_by
- created_at
- updated_at

Exact plan model is TBD.

### branches

Possible fields:

- id
- organization_id
- name
- address/contact metadata
- status
- created_at
- updated_at

### users

Authenticated staff identities.

Exact auth-provider mapping is TBD.

### memberships / role assignments

Connect staff users to organizations/branches and roles.

Exact RBAC shape is TBD.

### tables

Physical dining tables.

Possible fields:

- id
- branch_id
- public_identifier
- display_name/number
- status
- created_at
- updated_at

QR codes should reference an opaque public identifier, not sensitive internals.

### table_sessions

Possible fields:

- id
- table_id
- access_code_hash (or secure equivalent)
- status
- started_at
- closed_at
- created_by
- created_at
- updated_at

Invariant:

**At most one active session per table.**

### session_members / customer_devices

Tracks authorized devices/customers within a session.

Possible fields:

- id
- table_session_id
- authorization identifier/hash
- joined_at
- last_seen_at
- revoked_at

Exact privacy/token model is TBD.

### menu_categories

Branch/menu-scoped categories.

### menu_items

Possible fields:

- id
- branch_id
- category_id
- name
- description
- current_price
- availability
- image/reference metadata
- created_at
- updated_at

### orders

Possible fields:

- id
- organization_id
- branch_id
- table_session_id
- placed_by_session_member_id where needed
- status
- subtotal_minor
- vat_minor
- discount_minor
- service_charge_minor
- total_minor
- created_at
- updated_at

### order_items

Possible fields:

- id
- order_id
- menu_item_id
- item_name_snapshot
- unit_price_minor_snapshot
- quantity
- customization data
- subtotal_minor
- status

### waiter_requests

Possible fields:

- id
- branch_id
- table_session_id
- type
- status
- requested_at
- acknowledged_at
- resolved_at

### bills

Possible fields:

- id
- organization_id
- branch_id
- table_session_id
- status
- subtotal_minor
- vat_minor
- discount_minor
- service_charge_minor
- total_minor
- created_at
- updated_at

### payments

Possible fields:

- id
- bill_id
- method
- provider_label
- provider_reference
- amount_minor
- currency
- status
- recorded_by
- recorded_at
- notes/metadata
- created_at
- updated_at

For V1, `provider_label` may identify a manually recorded method such as `ESEWA_QR` or `KHALTI_QR`. Do not model it as gateway confirmation unless a gateway integration is actually implemented.

## Data constraints

Enforce, at minimum:

- branch belongs to organization
- table belongs to branch
- session belongs to table
- order belongs to session and correct branch/organization
- bill belongs to session
- payment belongs to bill
- active-session uniqueness per table
- non-negative money amounts
- valid quantities
- appropriate foreign keys

## Monetary values

Prefer integer minor units for money rather than floating point.

Example:

```text
NPR 125.50 → 12550 paisa
```

The exact money helper/library is TBD, but floating point should not be the persisted financial representation.

## Tax/VAT

V1 needs explicit VAT representation. The exact VAT policy and calculation rules must be documented before production billing logic is finalized.

## IDs

ID strategy is **TBD**. Candidates include UUID/UUIDv7 or another suitable sortable identifier.

## Indexing

Prioritize indexes for real access patterns:

- organization_id
- branch_id
- table_id
- table_session_id
- order status + branch
- bill status
- created_at on operational lists
- unique public identifiers
- relevant payment references

Do not add indexes indiscriminately.

## Transactions

Use transactions for operations that must be atomic, for example:

- starting a table session
- creating an order and its items
- recording coupled bill/payment state changes
- closing a session with related state updates

## Migrations

All schema changes must use tracked migrations. Never silently change production schema outside the migration process.

## Tenant safety

Repository/service APIs should make it difficult to forget organization scoping. Prefer trusted tenant context over arbitrary client-provided tenant IDs.
