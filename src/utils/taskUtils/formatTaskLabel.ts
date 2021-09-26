import { isAfter } from "date-fns";

export const formatTaskLabel = (isDone: boolean, deadline: Date | string) => {
  if (isDone) {
    return "Completed";
  } else if (isAfter(new Date(deadline), new Date())) {
    return "In Progress";
  } else {
    return "Expired";
  }
};
