import { useMutation, useQueryClient } from "react-query";
import { moveTask } from "../queries/queries";
import update from "immutability-helper";
import { TASK } from "../interfaces/Task";

const useMoveTask = () => {
  const queryClient = useQueryClient();
  // @ts-ignore
  return useMutation(moveTask, {
    onMutate: async ({ id, newIndex, oldIndex }) => {
      await queryClient.cancelQueries("tasks");

      queryClient.setQueryData<TASK[] | undefined>("tasks", (prev) => {
        if (typeof prev !== "undefined") {
          const prevTasks = [...prev];
          const card = prevTasks.find((i) => i.id === id);
          if (typeof card !== "undefined") {
            update(prevTasks, {
              $splice: [
                [oldIndex, 1],
                [newIndex, 0, card],
              ],
            });
            return [...prevTasks];
          }
        }
      });
    },
    onError: (err, newTodo, { previousTodos }) => {
      // queryClient.setQueryData("tasks", previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
};

export default useMoveTask;
