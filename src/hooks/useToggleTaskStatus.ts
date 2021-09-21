import { useMutation } from "react-query";
import { toggleTaskStatus } from "../queries/queries";

const useToggleTaskStatus = () => {
  return useMutation(toggleTaskStatus);
};

export default useToggleTaskStatus;
