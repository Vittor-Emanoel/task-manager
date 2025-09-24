import type { CreateTaskUseCase } from "@/useCases/tasks/CreateTaskUseCase";
import { createTaskSchema } from "@task-ai/validators";
import type { FastifyReply, FastifyRequest } from "fastify";

export class CreateTaskController {
	constructor(private readonly createTaskUseCase: CreateTaskUseCase) { }

	async handler(request: FastifyRequest, reply: FastifyReply) {
		try {
			const taskBody = createTaskSchema.parse(request.body)

			const response = await this.createTaskUseCase.execute(taskBody)

			return reply.send()
		} catch (error) {

		}
	}
}
