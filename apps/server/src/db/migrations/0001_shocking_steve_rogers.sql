ALTER TABLE "task" RENAME COLUMN "user_id" TO "assigned_user_id";--> statement-breakpoint
ALTER TABLE "task" DROP CONSTRAINT "task_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "creator_user_id" uuid;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_assigned_user_id_user_id_fk" FOREIGN KEY ("assigned_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_creator_user_id_user_id_fk" FOREIGN KEY ("creator_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;