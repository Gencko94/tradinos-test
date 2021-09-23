import { useMutation, useQueryClient } from "react-query";
import { TASK } from "../interfaces/Task";
import { toggleTaskStatus } from "../queries/queries";

const useToggleTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleTaskStatus, {
    onSuccess: (data, { id, isDone }) => {
      queryClient.setQueryData<TASK[] | undefined>(
        "tasks",
        (prev: TASK[] | undefined) => {
          const { id, isDone } = data;

          if (prev) {
            const found = prev.findIndex((task: any) => task.id === id);

            if (typeof found !== "undefined") {
              const oldData = [...prev];

              oldData[found].isDone = isDone;
              return [...oldData];
            }
          }
        }
      );
    },
  });
};

export default useToggleTaskStatus;
