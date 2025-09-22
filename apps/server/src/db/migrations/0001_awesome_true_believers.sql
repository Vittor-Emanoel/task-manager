CREATE TYPE "public"."recurring_pattern" AS ENUM('daily', 'weekly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."task_type" AS ENUM('single', 'recurring');--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "taskType" "task_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "scheduled_date" timestamp;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "scheduled_time" time;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "recurringPattern" "recurring_pattern";--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "recurring_interval" integer;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "recurring_days_of_week" text;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "recurring_day_of_month" integer;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "recurring_end_date" timestamp;