import { useQuery } from "react-query";
import { CATEGORY } from "../interfaces/Category";
import { getCategories } from "../queries/queries";

const useGetCategories = () => {
  return useQuery<CATEGORY[]>("categories", getCategories, {
    staleTime: 60 * 5,
  });
};

export default useGetCategories;
