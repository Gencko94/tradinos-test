import { useQuery } from "react-query";
import { CATEGORY } from "../interfaces/Category";
import { getCategories } from "../queries/queries";

const useGetCategories = () => {
  return useQuery<CATEGORY[]>("categories", getCategories);
};

export default useGetCategories;
