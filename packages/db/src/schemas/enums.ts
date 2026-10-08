import { pgEnum } from 'drizzle-orm/pg-core';

export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'deleted']);
export const organizationStatusEnum = pgEnum('organization_status', ['trial', 'active', 'suspended', 'cancelled']);
export const organizationMemberRoleEnum = pgEnum('organization_member_role', ['owner', 'admin', 'member']);
export const organizationMemberStatusEnum = pgEnum('organization_member_status', ['active', 'invited', 'suspended']);
export const branchStatusEnum = pgEnum('branch_status', ['active', 'inactive']);
export const branchMemberRoleEnum = pgEnum('branch_member_role', ['manager', 'cashier', 'waiter', 'kitchen', 'staff']);
export const tableStatusEnum = pgEnum('table_status', ['available', 'occupied', 'inactive']);
export const tableSessionStatusEnum = pgEnum('table_session_status', ['active', 'closed']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled']);
