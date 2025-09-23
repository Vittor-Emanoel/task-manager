import type { FastifyInstance } from "fastify";
import { CreateTaskController } from "./controllers/tasks/CreateTasksController";


export async function categoryRoutes(fastify: FastifyInstance) {
	fastify.post("/", CreateTaskController.handler);
	fastify.get("/", () => { });
	fastify.put("/:id", () => { });
}

export async function taskRoutes(fastify: FastifyInstance) {
	fastify.post("/", CreateTaskController.handler);
	fastify.get("/", () => { });
	fastify.put("/:id", () => { });
}
