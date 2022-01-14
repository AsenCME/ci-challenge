import React, { useMemo } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import useMovies from "../utils/hooks/useMovies";

export default function MovieDetails(props: RouteComponentProps) {
  const movieId = useMemo(() => Number((props as any).id), [props]);
  const { movies } = useMovies();
  const movie = useMemo(() => movies?.find((x) => x.id === movieId), [movieId, movies]);

  if (!movie) return <div>Movie not found</div>;
  return (
    <div>
      <div className="text-2xl font-bold">{movie.name}</div>
      <div className="text-gray-600">Released in {movie.release_year}</div>
      <div className="text-gray-600">
        Directed by{" "}
        <Link to={`/directors/${movie.director.split("|")[0]}`}>
          <span className="font-bold hover:underline">{movie.director.split("|")[1]}</span>
        </Link>
      </div>
    </div>
  );
}
