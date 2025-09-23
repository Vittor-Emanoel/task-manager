import { createTaskSchema } from "@task-ai/validators";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateTaskController {
	static async handler(request: FastifyRequest, reply: FastifyReply) {
		const response = createTaskSchema.parse(request.body)
		
		return reply.send(response)
	}
}
