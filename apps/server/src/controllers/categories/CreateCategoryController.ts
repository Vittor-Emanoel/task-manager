import { categorySchema } from "@task-ai/validators";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateCategoryController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, color } = categorySchema.parse(request.body)

    return reply.send(response)
  }
}
