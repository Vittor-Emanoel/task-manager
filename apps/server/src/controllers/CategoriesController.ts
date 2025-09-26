import { db } from "@/db";
import { category } from "@/db/schema";
import type { FastifyInstance } from "fastify";

export async function categoriesRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const categories = await db.select().from(category);
    reply.send(categories);
  });
}
