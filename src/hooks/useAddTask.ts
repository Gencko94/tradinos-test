import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { createNewTask } from "../queries/queries";

const useAddTask = () => {
  const history = useHistory();
  return useMutation(createNewTask, {
    onSuccess: (data) => {
      history.push("/tasks");
    },
  });
};

export default useAddTask;
