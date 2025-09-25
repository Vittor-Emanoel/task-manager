import { auth } from "@/lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.raw.headers),
    });

    console.log(session);

    if (!session) {
      reply.code(401).send({ error: "Unauthorized" });
      return;
    }
    request.user = session.user;
  } catch (err) {
    reply.code(401).send({ error: "Invalid session" });
  }
}
