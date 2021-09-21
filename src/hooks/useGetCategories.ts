import { useQuery } from "react-query";
import { getCategories } from "../queries/queries";

const useGetCategories = () => {
  return useQuery("categories", getCategories);
};

export default useGetCategories;
