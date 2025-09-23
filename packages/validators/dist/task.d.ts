import { z } from 'zod';

declare const TaskStatusSchema: z.ZodEnum<{
    completed: "completed";
    pending: "pending";
    deleted: "deleted";
}>;
declare const TaskPriorityLevelSchema: z.ZodEnum<{
    high: "high";
    medium: "medium";
    low: "low";
}>;
declare const TaskTypeSchema: z.ZodEnum<{
    single: "single";
    recurring: "recurring";
}>;
declare const RecurringPatternSchema: z.ZodEnum<{
    daily: "daily";
    weekly: "weekly";
    monthly: "monthly";
    yearly: "yearly";
}>;
declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        completed: "completed";
        pending: "pending";
        deleted: "deleted";
    }>>;
    priorityLevel: z.ZodDefault<z.ZodEnum<{
        high: "high";
        medium: "medium";
        low: "low";
    }>>;
    taskType: z.ZodDefault<z.ZodEnum<{
        single: "single";
        recurring: "recurring";
    }>>;
    scheduledAt: z.ZodOptional<z.ZodDate>;
    recurringPattern: z.ZodOptional<z.ZodEnum<{
        daily: "daily";
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
    }>>;
    recurringInterval: z.ZodOptional<z.ZodNumber>;
    recurringDaysOfWeek: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
    recurringDayOfMonth: z.ZodOptional<z.ZodNumber>;
    recurringEndDate: z.ZodOptional<z.ZodDate>;
    recurringCount: z.ZodOptional<z.ZodNumber>;
    finishedAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDefault<z.ZodOptional<z.ZodDate>>;
    userId: z.ZodString;
    categoryId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type CreateTaskInput = z.infer<typeof createTaskSchema>;

export { type CreateTaskInput, RecurringPatternSchema, TaskPriorityLevelSchema, TaskStatusSchema, TaskTypeSchema, createTaskSchema };
