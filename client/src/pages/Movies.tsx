import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

import useMovies from "../utils/hooks/useMovies";

export default function Movies(props: RouteComponentProps) {
  const { movies, moviesLoading } = useMovies();
  if (moviesLoading) return <div className="text-center text-gray-600 font-bold">Loading movies...</div>;
  return (
    <div className="pb-12">
      <div className="text-2xl font-bold">All movies</div>
      {movies?.map((x, i) => (
        <div key={i} className="rounded mt-4 px-4 py-2 bg-gray-200 hover:shadow-md flex items-center transition-all">
          <div className="flex-1 mr-4">
            <div className="text-gray-600 tracking-widest font-bold uppercase text-xs">{x.release_year}</div>
            <div className="font-bold">{x.name}</div>
            {!x.director ? (
              "Director not found"
            ) : (
              <div className="text-gray-600">
                Directed by:{" "}
                <strong className="hover:underline">
                  <Link to={`/directors/${x.director.split("|")[0]}`}>{x.director.split("|")[1]}</Link>
                </strong>
              </div>
            )}
          </div>
          <div>
            <Link to={`/movies/${x.id}`}>
              <div className="py-2 px-4 rounded-full bg-white font-bold hover:bg-transparent hover:ring-2 hover:ring-black transition-all">
                Movie Details
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
