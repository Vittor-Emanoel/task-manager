import { db } from "@/db";
import { task } from "@/db/schema";
import { authMiddleware } from "@/middlewares/AuthMiddleware";
import { and, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { z } from "zod";


export const createTaskSchema = z.object({
  title: z.string().min(1, "'title' is required"),
  description: z.string().optional(),
  status: z.enum(["completed", "pending", "deleted"]).optional(),
  priorityLevel: z.enum(["high", "medium", "low"]).optional(),
  assignedUserId: z.uuid("'assignmentId' uuid invalid").optional(),
  completionDate: z.date(),
  categoryId: z.uuid("'categoryId' uuid invalid").optional(),
  finishedAt: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) return new Date(val);
  }, z.date().optional()),
});

export const updateTaskSchema = createTaskSchema;

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/tasks",
    {
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      try {
        const tasks = await db
          .select()
          .from(task)
          .where(eq(task.creatorUserId, request.user.id));
        reply.send(tasks);
      } catch (err) {
        reply.code(500).send({ error: "Failed to fetch tasks", details: err });
      }
    }
  );

  fastify.get("/tasks/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const singleTask = await db
        .select()
        .from(task)
        .where(and(eq(task.creatorUserId, request.user.id), eq(task.id, id)));

      if (!singleTask) return reply.code(404).send({ error: "Task not found" });
      reply.send(singleTask);
    } catch (err) {
      reply.code(500).send({ error: "Failed to fetch task", details: err });
    }
  });

  fastify.post(
    "/tasks",
    {
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      try {
        const parsed = createTaskSchema.parse(request.body);
        const newTask = await db
          .insert(task)
          .values({
            ...parsed,
            creatorUserId: request.user.id,
            priorityLevel: "medium",
          })
          .returning();

        reply.code(201).send(newTask[0]);
      } catch (err) {
        if (err instanceof z.ZodError)
          return reply.code(400).send({ errors: err });
        reply.code(500).send({ error: "Failed to create task", details: err });
      }
    }
  );

  fastify.put(
    "/tasks/:id",
    {
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const parsed = updateTaskSchema.parse(request.body);

        const [updatedTask] = await db
          .update(task)
          .set(parsed)
          .where(and(eq(task.id, id), eq(task.creatorUserId, request.user.id)))
          .returning();

        if (!updatedTask) {
          return reply.code(404).send({ error: "Task not found" });
        }

        reply.send(updatedTask);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.code(400).send({ errors: error });
        }

        reply.code(500).send({ message: "Failed to update task", error });
      }
    }
  );

  fastify.delete("/tasks/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const deleted = await db
        .delete(task)
        .where(and(eq(task.id, id), eq(task.creatorUserId, request.user.id)))
        .returning();

      if (!deleted.length)
        return reply.code(404).send({ error: "Task not found" });
      reply.send({ success: true });
    } catch (err) {
      reply.code(500).send({ error: "Failed to delete task", details: err });
    }
  });
}
