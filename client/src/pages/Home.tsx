import React from "react";
import { Link, RouteComponentProps } from "@reach/router";

export default function Home(props: RouteComponentProps) {
  return (
    <div>
      <div className="text-2xl font-bold">Movies App</div>
      <div>Navigate to one of the pages to view all movies or directors and create new ones or edit existing entries.</div>
      <div className="mt-4 flex items-center justify-center">
        <Link to="/movies">
          <div className="px-4 rounded-full cursor-pointer py-2 bg-gray-300 mx-4 text-black hover:bg-black hover:text-white transition-all">
            See all movies
          </div>
        </Link>
        <Link to="/directors">
          <div className="px-4 rounded-full cursor-pointer py-2 bg-gray-300 mx-4 text-black hover:bg-black hover:text-white transition-all">
            See all directors
          </div>
        </Link>
      </div>
    </div>
  );
}
