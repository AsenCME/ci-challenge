import { useQuery, useQueryClient } from "react-query";
import { Director } from "./useDirectors";

export interface Movie {
  id: number;
  name: string;
  release_year: number;
  director: string;
}
export default function useMovies() {
  const cache = useQueryClient();
  const { data: movies, isLoading: moviesLoading, refetch: getMovies } = useQuery<Movie[]>("movies");

  const getOne = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/movies/${id}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((x) => x.json());
      cache.setQueryData<Movie[]>("movies", (data) =>
        data?.some((x) => x.id === id) ? [...(data || [])] : [...(data || []), res]
      );
      cache.setQueryData<Director[]>("directors", (data) => {
        const idx = data?.findIndex((x) => x.id === res.director.split("|")[0]);
        if (idx === undefined || idx === -1 || !data?.length) return data || [];
        data[idx].movies = [...data[idx].movies, res];
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addMovie = async (name: string, release_year: number, director: number) => {
    try {
      const res = await fetch(`http://localhost:8000/movies/`, {
        method: "POST",
        body: JSON.stringify({ name, release_year, director }),
        headers: { "Content-Type": "application/json" },
      }).then((x) => x.json());
      console.log(res);
      cache.setQueryData<Movie[]>("movies", (data) => [...(data || []), res]);
      cache.setQueryData<Director[]>("directors", (data) => {
        const idx = data?.findIndex((x) => x.id === director);
        console.log("[found] ", idx);
        if (idx === undefined || idx === -1 || !data?.length) return data || [];
        data[idx].movies = [...data[idx].movies, res];
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovie = async (id: number, name: string, release_year: number, director: number) => {
    try {
      const res = await fetch(`http://localhost:8000/movies/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ name, release_year, director }),
        headers: { "Content-Type": "application/json" },
      }).then((x) => x.json());
      cache.setQueryData<Movie[]>("movies", (data) => {
        const idx = data?.findIndex((x) => x.id === id);
        if (idx === undefined || idx === -1 || !data?.length) return data || [];
        data[idx] = res;
        return data;
      });
      cache.setQueryData<Director[]>("directors", (data) => {
        const idx = data?.findIndex((x) => x.id === director);
        if (idx === undefined || idx === -1 || !data?.length) return data || [];
        data[idx].movies = [...data[idx].movies, res];
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { movies, moviesLoading, getMovies, addMovie, updateMovie, getOne };
}
