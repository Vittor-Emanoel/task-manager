import {
	boolean,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar
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
