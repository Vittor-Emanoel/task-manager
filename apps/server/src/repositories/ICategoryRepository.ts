import type { CategoryDTO } from "@/dto/category/CategoryDTO";

export interface ICategoryRepository {
  create(data: CategoryDTO): Promise<void>
  getAll(): Promise<CategoryDTO>
}