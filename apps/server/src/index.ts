import fastifyCors from "@fastify/cors";
import "dotenv/config";
import Fastify from "fastify";
import { authRoutes } from "./controllers/AuthController";
import { taskRoutes } from "./controllers/TaskController";
import { userRoutes } from "./controllers/UserController";

const baseCorsConfig = {
  origin: process.env.CORS_ORIGIN || "",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
};

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, baseCorsConfig);
fastify.register(authRoutes);
fastify.register(taskRoutes);
fastify.register(userRoutes);

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3000");
});
