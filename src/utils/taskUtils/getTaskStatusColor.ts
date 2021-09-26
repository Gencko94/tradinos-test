export const getTaskStatusColor = (formattedLabel: string) => {
  if (formattedLabel === "Completed") {
    return "success";
  } else if (formattedLabel === "Expired") {
    return "error";
  } else {
    return "warning";
  }
};
