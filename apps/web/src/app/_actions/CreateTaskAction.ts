"use server";

import { httpClient } from "@/lib/api";

interface ICreateTaskActionParams {
  name: string;
    description: string;
    categoryId: string;
}

export async function CreateTaskAction(data: ICreateTaskActionParams) {
  try {
    const result = await httpClient.post("/tasks", data)
    console.log(result, "aaa")

  } catch (error) {

  }

}
