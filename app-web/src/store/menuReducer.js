import { create } from "zustand";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// const { isLoading, isError, data, error, refetch } = useQuery(
//     ["WholeMenu"],
//     () => axios.get("/api/category/").then((res) => res.data)

//   );
// if (isLoading) return "Loading...";

// if (error) return "An error has occurred: " + error.message;
// const getMenu = () => {
//   axios.get("/api/category/").then((res) => res.data);
// };
// console.log(getMenu.data);

const useMenuStore = create((set) => ({
  menu: [],
  setMenu:(menu) => set({ menu:menu}),
}));

const useAllItemStore = create((set) => ({
  allItems: [],
  getAllItem: (menu) => {
    let items = [];
    for (let category of menu) {
      for (let item of category.items) {
        items.push(item);
      }
    }
    set({ allItems: items });
  },
}));

export { useMenuStore, useAllItemStore };
