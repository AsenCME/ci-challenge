import React from "react";
import { Link, Router } from "@reach/router";
import { QueryClientProvider, QueryClient } from "react-query";

// pages
import DirectorDetails from "./pages/DirectorDetails";
import Directors from "./pages/Directors";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";

// react query config
const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => alert(JSON.stringify(err)),
    },
    queries: {
      onError: (err) => alert(JSON.stringify(err)),
      queryFn: async (context) => {
        const res = await fetch("http://localhost:8000/" + context.queryKey[0] + "/?format=json", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (x) => await x.json());
        return res.results;
      },
    },
  },
});

// render
function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="w-full bg-gray-300 p-4 mb-12">
        <div className="container mx-auto flex items-center justify-end">
          <Link to="/">
            <div className="hover:underline">Home</div>
          </Link>
          <div className="w-4" />
          <Link to="/movies">
            <div className="hover:underline">Movies</div>
          </Link>
          <div className="w-4" />
          <Link to="/directors">
            <div className="hover:underline">Directors</div>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <Router>
          <Home path="/" />
          <Movies path="/movies" />
          <MovieDetails path="/movies/:id" />
          <Directors path="/directors" />
          <DirectorDetails path="/directors/:id" />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
