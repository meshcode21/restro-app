CREATE TYPE "public"."branch_member_role" AS ENUM('manager', 'cashier', 'waiter', 'kitchen', 'staff');--> statement-breakpoint
CREATE TYPE "public"."branch_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'confirmed', 'preparing', 'ready', 'served', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."platform_member_role" AS ENUM('owner', 'admin', 'support', 'billing');--> statement-breakpoint
CREATE TYPE "public"."platform_member_status" AS ENUM('active', 'invited', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('starter', 'pro', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'past_due', 'canceled', 'trialing');--> statement-breakpoint
CREATE TYPE "public"."table_session_status" AS ENUM('active', 'closed');--> statement-breakpoint
CREATE TYPE "public"."table_status" AS ENUM('available', 'occupied', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."tenant_member_role" AS ENUM('super_admin', 'admin', 'branch_member');--> statement-breakpoint
CREATE TYPE "public"."tenant_member_status" AS ENUM('active', 'invited', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('trial', 'active', 'suspended', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'suspended', 'deleted');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"password_hash" text,
	"avatar_url" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"phone_verified" boolean DEFAULT false NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo_url" text,
	"phone" text,
	"email" text,
	"status" "tenant_status" DEFAULT 'trial' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tenant_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "tenant_member_role" NOT NULL,
	"status" "tenant_member_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_tenant_member" UNIQUE("tenant_id","user_id"),
	CONSTRAINT "uq_tenant_members_id_org" UNIQUE("id","tenant_id")
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"address" text,
	"city" text,
	"phone" text,
	"status" "branch_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_branch_slug_per_tenant" UNIQUE("tenant_id","slug"),
	CONSTRAINT "uq_branches_id_org" UNIQUE("id","tenant_id")
);
--> statement-breakpoint
CREATE TABLE "branch_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"tenant_member_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"role" "branch_member_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_branch_member" UNIQUE("tenant_member_id","branch_id")
);
--> statement-breakpoint
CREATE TABLE "tables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"name" text NOT NULL,
	"qr_token" text NOT NULL,
	"capacity" integer DEFAULT 4 NOT NULL,
	"status" "table_status" DEFAULT 'available' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tables_qr_token_unique" UNIQUE("qr_token"),
	CONSTRAINT "uq_table_name_per_branch" UNIQUE("branch_id","name"),
	CONSTRAINT "uq_tables_id_branch_org" UNIQUE("id","branch_id","tenant_id"),
	CONSTRAINT "chk_table_capacity" CHECK ("tables"."capacity" > 0)
);
--> statement-breakpoint
CREATE TABLE "table_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"table_id" uuid NOT NULL,
	"access_code_hash" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"closed_at" timestamp with time zone,
	"status" "table_session_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_table_sessions_scope" UNIQUE("id","table_id","branch_id","tenant_id"),
	CONSTRAINT "chk_session_expiry" CHECK ("table_sessions"."expires_at" > "table_sessions"."started_at"),
	CONSTRAINT "chk_session_closed" CHECK (("table_sessions"."status" = 'active' AND "table_sessions"."closed_at" IS NULL) OR ("table_sessions"."status" = 'closed' AND "table_sessions"."closed_at" IS NOT NULL))
);
--> statement-breakpoint
CREATE TABLE "table_session_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"table_session_id" uuid NOT NULL,
	"device_id" text NOT NULL,
	"customer_name" text,
	"phone" text,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_participant_device_per_session" UNIQUE("table_session_id","device_id"),
	CONSTRAINT "uq_participants_id_session" UNIQUE("id","table_session_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_category_name_per_tenant" UNIQUE("tenant_id","name"),
	CONSTRAINT "uq_categories_id_org" UNIQUE("id","tenant_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"category_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"image_url" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_products_id_org" UNIQUE("id","tenant_id")
);
--> statement-breakpoint
CREATE TABLE "branch_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_product_per_branch" UNIQUE("branch_id","product_id"),
	CONSTRAINT "chk_product_price" CHECK ("branch_products"."price" >= 0)
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"branch_id" uuid NOT NULL,
	"table_id" uuid NOT NULL,
	"table_session_id" uuid NOT NULL,
	"participant_id" uuid,
	"order_number" text NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"subtotal" numeric(12, 2) DEFAULT '0' NOT NULL,
	"tax_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"discount_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"total_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_order_number_per_branch" UNIQUE("branch_id","order_number"),
	CONSTRAINT "uq_orders_id_org" UNIQUE("id","tenant_id"),
	CONSTRAINT "chk_order_subtotal" CHECK ("orders"."subtotal" >= 0),
	CONSTRAINT "chk_order_tax" CHECK ("orders"."tax_amount" >= 0),
	CONSTRAINT "chk_order_discount" CHECK ("orders"."discount_amount" >= 0),
	CONSTRAINT "chk_order_total" CHECK ("orders"."total_amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid,
	"product_name" text NOT NULL,
	"unit_price" numeric(12, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"subtotal" numeric(12, 2) NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_order_item_price" CHECK ("order_items"."unit_price" >= 0),
	CONSTRAINT "chk_order_item_quantity" CHECK ("order_items"."quantity" > 0),
	CONSTRAINT "chk_order_item_subtotal" CHECK ("order_items"."subtotal" >= 0)
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"plan" "subscription_plan" DEFAULT 'starter' NOT NULL,
	"status" "subscription_status" DEFAULT 'trialing' NOT NULL,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"activated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_tenant_id_unique" UNIQUE("tenant_id")
);
--> statement-breakpoint
CREATE TABLE "platform_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "platform_member_role" DEFAULT 'admin' NOT NULL,
	"status" "platform_member_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "platform_members_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant_members" ADD CONSTRAINT "tenant_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_members" ADD CONSTRAINT "branch_members_tenant_member_id_tenant_id_tenant_members_id_tenant_id_fk" FOREIGN KEY ("tenant_member_id","tenant_id") REFERENCES "public"."tenant_members"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_members" ADD CONSTRAINT "branch_members_branch_id_tenant_id_branches_id_tenant_id_fk" FOREIGN KEY ("branch_id","tenant_id") REFERENCES "public"."branches"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tables" ADD CONSTRAINT "tables_branch_id_tenant_id_branches_id_tenant_id_fk" FOREIGN KEY ("branch_id","tenant_id") REFERENCES "public"."branches"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table_sessions" ADD CONSTRAINT "table_sessions_table_id_branch_id_tenant_id_tables_id_branch_id_tenant_id_fk" FOREIGN KEY ("table_id","branch_id","tenant_id") REFERENCES "public"."tables"("id","branch_id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "table_session_participants" ADD CONSTRAINT "table_session_participants_table_session_id_table_sessions_id_fk" FOREIGN KEY ("table_session_id") REFERENCES "public"."table_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_tenant_id_categories_id_tenant_id_fk" FOREIGN KEY ("category_id","tenant_id") REFERENCES "public"."categories"("id","tenant_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_products" ADD CONSTRAINT "branch_products_branch_id_tenant_id_branches_id_tenant_id_fk" FOREIGN KEY ("branch_id","tenant_id") REFERENCES "public"."branches"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branch_products" ADD CONSTRAINT "branch_products_product_id_tenant_id_products_id_tenant_id_fk" FOREIGN KEY ("product_id","tenant_id") REFERENCES "public"."products"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_table_session_id_table_id_branch_id_tenant_id_table_sessions_id_table_id_branch_id_tenant_id_fk" FOREIGN KEY ("table_session_id","table_id","branch_id","tenant_id") REFERENCES "public"."table_sessions"("id","table_id","branch_id","tenant_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_participant_id_table_session_id_table_session_participants_id_table_session_id_fk" FOREIGN KEY ("participant_id","table_session_id") REFERENCES "public"."table_session_participants"("id","table_session_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_tenant_id_orders_id_tenant_id_fk" FOREIGN KEY ("order_id","tenant_id") REFERENCES "public"."orders"("id","tenant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_tenant_id_products_id_tenant_id_fk" FOREIGN KEY ("product_id","tenant_id") REFERENCES "public"."products"("id","tenant_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_members" ADD CONSTRAINT "platform_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;