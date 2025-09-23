import { db } from "@/db";
import { category } from "@/db/schema";
import type { CategoryDTO } from "@/dto/category/CategoryDTO";
import type { ICategoryRepository } from "../ICategoryRepository";

export class DrizzleCategoryRepository implements ICategoryRepository {

  async create(data: CategoryDTO): Promise<void> {
    const result = await db.insert(category).values({})
  }
  async getAll(): Promise<CategoryDTO> {

  }
}