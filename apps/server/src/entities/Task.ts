import { randomUUID } from "node:crypto"

type TaskStatus = "completed" | "pending" | "deleted"
type TaskPrioriyLevel = "high" | "medium" | "low"

export class Task {
  readonly id: string
  readonly title: string
  readonly description: string | null
  readonly status: TaskStatus
  readonly priorityLevel: TaskPrioriyLevel
  readonly finishedAt: Date | null
  readonly createdAt: Date
  readonly userId: string | null
  readonly categoryId: string | null



  constructor(attr: Task.Attributes) {
    this.id = attr.id ?? randomUUID()
    this.title = attr.title
    this.description = attr.description
    this.status = attr.status
    this.priorityLevel = attr.priorityLevel
    this.finishedAt = attr.finishedAt
    this.createdAt = attr.createdAt
    this.userId = attr.userId
    this.categoryId = attr.categoryId
  }

}

namespace Task {
  export type Attributes = {
    id?: string
    title: string
    description: string | null
    status: TaskStatus
    priorityLevel: TaskPrioriyLevel
    userId: string | null
    categoryId: string | null
    finishedAt: Date | null
    createdAt: Date
  }
}