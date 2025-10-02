import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { authMiddleware } from "@/middlewares/AuthMiddleware";
import type { User } from "better-auth";
import type { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/me",
    {
      preHandler: [authMiddleware],
    },
    async (request, reply) => {
      try {
        const user = request.user as User;

        if (!user) {
          return reply.code(401).send({ error: "Unauthorized" });
        }

        reply.send(user);
      } catch (err) {
        reply
          .code(500)
          .send({ error: "Failed to fetch user data", details: err });
      }
    }
  );

  fastify.get('/users', {
    preHandler: [authMiddleware],
  }, async (_, reply) => {
    try {
      const users = await db.select().from(userTable);

      reply.send(users);
    } catch (err) {
      reply
        .code(500)
        .send({ error: "Failed to fetch user data", details: err });
    }
  })
}
