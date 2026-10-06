# Workflow: Kitchen

## Goal

Give kitchen staff a focused queue for preparation work.

## Flow

```text
Customer submits order
    ↓
Backend validates order
    ↓
Order enters restaurant workflow
    ↓
Kitchen receives realtime update
    ↓
PREPARING
    ↓
READY
    ↓
Waiter serves
    ↓
SERVED
```

## KDS priorities

Show clearly:

- table
- order ID
- order age
- items
- quantities
- customizations
- current status
- next action

## Rules

- Kitchen only sees authorized branch orders.
- Kitchen does not modify payment state.
- State transitions are backend-authorized.
- Realtime is a delivery mechanism, not the source of truth.
- Reconnects must not permanently lose operational updates.
