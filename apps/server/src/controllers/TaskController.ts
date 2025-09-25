import { db } from "@/db";
import { task } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["completed", "pending", "deleted"]).optional(),
  priorityLevel: z.enum(["high", "medium", "low"]).optional(),
  categoryId: z.uuid("Invalid category ID").optional(),
  finishedAt: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) return new Date(val);
  }, z.date().optional()),
});

export const updateTaskSchema = createTaskSchema.extend({
  id: z.uuid("Invalid task ID"),
});

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", async (request, reply) => {
    try {
      const tasks = await db
        .select()
        .from(task)
        .where(eq(task.userId, request.user.id));
      reply.send(tasks);
    } catch (err) {
      reply.code(500).send({ error: "Failed to fetch tasks", details: err });
    }
  });

  fastify.get("/tasks/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const singleTask = await db
        .select()
        .from(task)
        .where(and(eq(task.userId, request.user.id), eq(task.id, id)));

      if (!singleTask) return reply.code(404).send({ error: "Task not found" });
      reply.send(singleTask);
    } catch (err) {
      reply.code(500).send({ error: "Failed to fetch task", details: err });
    }
  });

  fastify.post("/tasks", async (request, reply) => {
    try {
      const parsed = createTaskSchema.parse(request.body);
      const newTask = await db
        .insert(task)
        .values({ ...parsed, userId: request.user.id })
        .returning();

      reply.code(201).send(newTask[0]);
    } catch (err) {
      if (err instanceof z.ZodError)
        return reply.code(400).send({ errors: err });
      reply.code(500).send({ error: "Failed to create task", details: err });
    }
  });

  fastify.put("/tasks/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const parsed = updateTaskSchema.parse({
        ...(request.body as object),
        id,
      });

      const updated = await db
        .update(task)
        .set(parsed)
        .where(and(eq(task.id, id), eq(task.userId, request.user.id)))
        .returning();

      if (!updated.length)
        return reply.code(404).send({ error: "Task not found" });
      reply.send(updated[0]);
    } catch (err) {
      if (err instanceof z.ZodError)
        return reply.code(400).send({ errors: err });
      reply.code(500).send({ error: "Failed to update task", details: err });
    }
  });

  fastify.delete("/tasks/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const deleted = await db
        .delete(task)
        .where(and(eq(task.id, id), eq(task.userId, request.user.id)))
        .returning();

      if (!deleted.length)
        return reply.code(404).send({ error: "Task not found" });
      reply.send({ success: true });
    } catch (err) {
      reply.code(500).send({ error: "Failed to delete task", details: err });
    }
  });
}
