import { useQuery } from "react-query";
import { TASK } from "../interfaces/Task";
import { getTasks } from "../queries/queries";

const useGetTasks = () => {
  return useQuery<TASK[]>("tasks", getTasks);
};

export default useGetTasks;
