export const uri = "http://localhost:4000";
// export const uri = "https://tradinos-mock-api.herokuapp.com";
import axios from "axios";
import { NEW_TASK } from "../components/Pages/NewTask/NewTaskForm";

export const getTask = async (id: string) => {
  const res = await axios.get(`${uri}/task/${id}`);
  return res.data.task;
};
export const getTasks = async () => {
  const res = await axios.get(`${uri}/tasks`);
  return res.data.tasks;
};
export const getCategories = async () => {
  const res = await axios.get(`${uri}/categories`);
  return res.data.categories;
};
export const createNewTask = async (task: NEW_TASK) => {
  const res = await axios.post(`${uri}/tasks`, task);
  return res.data;
};
export const toggleTaskStatus = async ({
  id,
  isDone,
}: {
  id?: string;
  isDone: boolean;
}) => {
  const res = await axios.patch(`${uri}/tasks`, { id, isDone });
  return res.data;
};
