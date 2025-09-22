import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const taskStatusEnum = pgEnum("status", [
	"completed",
	"pending",
	"deleted",
]);

export const taskPriorityLevelEnum = pgEnum("priorityLevel", [
	"high",
	"medium",
	"low",
]);

export const taskTypeEnum = pgEnum("task_type", ["single", "recurring"]);

export const recurringPatternEnum = pgEnum("recurring_pattern", [
	"daily",
	"weekly",
	"monthly",
	"yearly",
]);

export const category = pgTable("category", {
	id: text("id").primaryKey(),
	name: varchar({ length: 255 }).notNull().unique(),
	color: varchar({ length: 128 }),
});

export const task = pgTable("task", {
	id: text("id").primaryKey(),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }),
	status: taskStatusEnum()
		.$default(() => "pending")
		.notNull(),
	priorityLevel: taskPriorityLevelEnum()
		.notNull()
		.$default(() => "low"),
	taskType: taskTypeEnum()
		.$default(() => "single")
		.notNull(),
	scheduledDate: timestamp("scheduled_date"),
	scheduledTime: time("scheduled_time"),
	recurringPattern: recurringPatternEnum(),
	recurringInterval: integer("recurring_interval"),
	recurringDaysOfWeek: text("recurring_days_of_week"),
	recurringDayOfMonth: integer("recurring_day_of_month"),
	recurringEndDate: timestamp("recurring_end_date"),
	recurringEndTime: timestamp("recurring_end_time"),
	recurrentQuantity: integer("recurrent_quantity"),
	recurrentType: integer("recurrent_type"),
	finishedAt: timestamp("finished_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: text("user_id").references(() => user.id),
	categoryId: text("category_id").references(() => category.id),
});

export const notification = pgTable("notification", {
	id: text().primaryKey(),
	message: varchar({ length: 255 }),
	wasRead: boolean("was_read").$default(() => false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: text("user_id").references(() => user.id),
	taskId: text("task_id").references(() => task.id),
});
