import { z } from "zod";

export const TaskStatusSchema = z.enum(["completed", "pending", "deleted"]);

export const TaskPriorityLevelSchema = z.enum(["high", "medium", "low"]);

export const TaskTypeSchema = z.enum(["single", "recurring"]);

export const RecurringPatternSchema = z.enum([
	"daily",
	"weekly",
	"monthly",
	"yearly",
]);

export const createTaskSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().max(255).optional(),
	// status: TaskStatusSchema.default("pending"),
	// priorityLevel: TaskPriorityLevelSchema.default("low"),
	taskType: TaskTypeSchema.default("single"),
	scheduledAt: z.date().optional(),
	recurringPattern: RecurringPatternSchema.optional(),
	recurringInterval: z.number().int().min(1).optional(),
	recurringDaysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
	recurringDayOfMonth: z.number().int().min(1).max(31).optional(),
	recurringEndDate: z.date().optional(),
	recurringCount: z.number().int().min(1).optional(),
	finishedAt: z.date().optional(),
	createdAt: z
		.date()
		.optional()
		.default(() => new Date()),
	userId: z.string().uuid(),
	categoryId: z.string().uuid().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
