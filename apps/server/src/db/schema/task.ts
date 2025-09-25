import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
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

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull().unique(),
  color: varchar({ length: 128 }),
});

export const task = pgTable("task", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  status: taskStatusEnum().notNull().default("pending"),
  priorityLevel: taskPriorityLevelEnum().notNull().default("low"),

  finishedAt: timestamp("finished_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: uuid("user_id").references(() => user.id),
  categoryId: uuid("category_id").references(() => category.id),
});

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  message: varchar({ length: 255 }),
  wasRead: boolean("was_read").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: uuid("user_id").references(() => user.id),
  taskId: uuid("task_id").references(() => task.id),
});
