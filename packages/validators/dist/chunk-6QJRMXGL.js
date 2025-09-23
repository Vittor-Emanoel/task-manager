// src/task.ts
import { z } from "zod";
var TaskStatusSchema = z.enum(["completed", "pending", "deleted"]);
var TaskPriorityLevelSchema = z.enum(["high", "medium", "low"]);
var TaskTypeSchema = z.enum(["single", "recurring"]);
var RecurringPatternSchema = z.enum([
  "daily",
  "weekly",
  "monthly",
  "yearly"
]);
var createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  status: TaskStatusSchema.default("pending"),
  priorityLevel: TaskPriorityLevelSchema.default("low"),
  taskType: TaskTypeSchema.default("single"),
  // agendamento
  scheduledDate: z.date().optional(),
  scheduledTime: z.number().int().min(0).max(2359).optional(),
  // formato inteiro tipo 930 para 09:30
  // recorrência
  recurringPattern: RecurringPatternSchema.optional(),
  recurringInterval: z.number().int().min(1).optional(),
  recurringDaysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
  recurringDayOfMonth: z.number().int().min(1).max(31).optional(),
  recurringEndDate: z.date().optional(),
  recurringEndTime: z.date().optional(),
  recurringCount: z.number().int().min(1).optional(),
  finishedAt: z.date().optional(),
  createdAt: z.date().optional().default(() => /* @__PURE__ */ new Date()),
  // relacionamentos
  userId: z.uuid(),
  categoryId: z.uuid()
});

export {
  TaskStatusSchema,
  TaskPriorityLevelSchema,
  TaskTypeSchema,
  RecurringPatternSchema,
  createTaskSchema
};
