import { User } from "@/lib/auth";

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}
