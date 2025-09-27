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
}
