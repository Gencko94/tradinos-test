import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { TASK } from "../interfaces/Task";
import { deleteTask } from "../queries/queries";

const useDeleteTask = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: (data, { id }) => {
      queryClient.setQueryData<TASK[] | undefined>("tasks", (prev) => {
        if (prev) {
          return prev.filter((task) => task.id !== id);
        }
      });
    },
  });
};

export default useDeleteTask;