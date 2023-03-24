import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const { isLoading, isError, data, error, refetch } = useQuery(
//     ["WholeMenu"],
//     () => axios.get("/api/category/").then((res) => res.data)
    
//   );
const useMenuStore = create((set) => ({
    menu: {}
}))

export default useMenuStore;