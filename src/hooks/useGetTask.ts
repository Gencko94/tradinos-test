import { useQuery } from "react-query";
import { TASK } from "../interfaces/Task";
import { getTask } from "../queries/queries";

export const useGetTask = (id: string) => {
  return useQuery<TASK>(["task", id], () => getTask(id));
};
