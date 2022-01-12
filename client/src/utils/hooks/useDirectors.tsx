import { useQuery, useQueryClient } from "react-query";
import { Movie } from "./useMovies";

export interface Director {
  id: number;
  first_name: string;
  last_name: string;
  movies: Movie[];
}
export default function useDirectors() {
  const cache = useQueryClient();
  const { data: directors, isLoading: directorsLoading, refetch: getDirectors } = useQuery<Director[]>("directors");

  const addDirector = async (first_name: string, last_name: string) => {
    try {
      const res = await fetch("http://localhost:8000/directors/", {
        method: "POST",
        body: JSON.stringify({ first_name, last_name }),
        headers: { "Content-Type": "application/json" },
      }).then((x) => x.json());
      cache.setQueryData<Director[]>("directors", (data) => {
        if (!data?.length) return [res];
        return [...data, res];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDirector = async (id: number, first_name: string, last_name: string) => {
    try {
      const res = await fetch(`http://localhost:8000/directors/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ first_name, last_name }),
        headers: { "Content-Type": "application/json" },
      }).then((x) => x.json());
      cache.setQueryData<Director[]>("directors", (data) => {
        const idx = data?.findIndex((x) => x.id === id);
        if (!idx || idx === -1 || !data?.length) return data || [];
        data[idx] = res;
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { directors, directorsLoading, getDirectors, addDirector, updateDirector };
}
