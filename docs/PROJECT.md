# Project Context

## Product

A Nepal-focused restaurant SaaS platform for real restaurants and restaurant groups. The final product name is intentionally not decided yet.

The product is not meant to be a legacy restaurant ERP in V1. Its core value is automating the dining workflow:

**customer arrival → table/session access → digital menu → ordering → kitchen → serving → billing → payment recording → session close → reporting**

## Core business problem

Restaurants lose time and money through verbal and paper-based ordering and disconnected manual workflows: orders can be missed or recorded incorrectly, tables can wait longer, and owners struggle to see what actually sold without checking notebooks and bills manually.

The product is built for Nepal, including practical support for NPR, VAT handling, and recording local payment methods such as eSewa and Khalti QR. Payment gateway integration itself is intentionally outside V1.

## Why a restaurant should pay instead of using Excel/notebooks/current POS

The strongest V1 value proposition is workflow reliability and operational visibility: reduce missed/wrong orders and waiting caused by manual handoffs, while giving owners a centralized view of sales across branches.

## Target customers

- Restaurants
- Cafes
- Small and medium dine-in food businesses
- Multi-branch restaurant businesses

Initial market: Nepal.

## Main users

### Super Admin

Platform operator. Handles manual restaurant onboarding, tenant setup, subscription activation, support/administration, and platform-level monitoring.

### Restaurant Owner / Admin

Manages restaurant/branch settings, tables, menus, staff, orders, billing, payments, and reports.

### Kitchen Staff

Uses the kitchen display to process incoming orders and update preparation status.

### Waiter / Floor Staff

Handles waiter requests, serving, and operational table assistance.

### Customer

Scans the table QR, joins the active session using the session access code, views the menu, orders, tracks status, requests a waiter, views the bill, and completes or records payment according to configured workflow.

## V1 scope

### In scope

- Multi-tenant organizations
- Branches
- Manual onboarding by Super Admin
- Manual subscription activation by Super Admin
- Staff users and RBAC foundation
- Tables and QR codes
- Table sessions and session access codes
- Digital menus
- Customer ordering
- Multiple customers per table session
- Multiple orders per table session
- Kitchen display workflow
- Waiter requests
- Serving/status updates
- Session-level billing
- Payment recording
- NPR and VAT support
- Recording local payment methods such as eSewa/Khalti QR
- Basic operational reports
- Core backups and security controls

## Explicitly out of scope for V1

- Inventory and recipes
- Offline mode
- Payment gateway integration
- Self-signup and automated billing
- Delivery and online ordering
- Reservations
- Payroll and HR
- Loyalty and CRM
- Accounting
- Native mobile apps

## Success after 3 months

A restaurant owner should be able to say:

> “I stopped losing orders, tables get served faster, and I can see each branch's sales without counting bills.”

## Product principles

1. **Business value first** — solve a real operational problem before adding features.
2. **Tenant isolation first** — one restaurant must never see another restaurant's data.
3. **Server-authoritative logic** — financial and domain-critical state is decided on the backend.
4. **Fast operator workflows** — kitchen and waiter screens should optimize for action, not decoration.
5. **Nepal-ready** — support local money, tax, and operational practices without hard-locking future expansion.
6. **Manual onboarding first** — V1 favors controlled rollout and support over self-service growth mechanics.
7. **Extensible foundation** — future modules should be possible without corrupting the core domain.

## Core flow

```text
Super Admin onboards restaurant
        ↓
Restaurant sets up branch/tables/menu
        ↓
Staff starts table session
        ↓
System generates session access code
        ↓
Customer scans table QR
        ↓
Customer enters session access code
        ↓
Backend authorizes device for that session
        ↓
Customer browses menu
        ↓
Customer places order
        ↓
Order reaches restaurant workflow / kitchen
        ↓
Kitchen prepares → Ready
        ↓
Waiter serves
        ↓
Customer/staff sees session bill
        ↓
Payment recorded/settled
        ↓
Session closes
        ↓
Table becomes available
```

## Product vocabulary

- **Organization** = one restaurant business / SaaS tenant
- **Branch** = physical restaurant location
- **Table** = physical dine-in table
- **Table Session** = one active dining session for a table
- **Session Access Code** = short random code used to join the active table session
- **Order** = one customer order inside a table session
- **Order Item** = line item inside an order
- **Bill** = financial total for the table session
- **Payment** = settlement record/attempt attached to a bill
- **Waiter Request** = request for staff assistance

Do not use “OTP” as the permanent domain name for the table access mechanism; it behaves more like a session-bound access PIN.
