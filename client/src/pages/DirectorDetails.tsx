import React, { useMemo, useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import useDirectors from "../utils/hooks/useDirectors";
import useMovies from "../utils/hooks/useMovies";

import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function DirectorDetails(props: RouteComponentProps) {
  const directorId = useMemo(() => Number((props as any).id), [props]);
  const { directors, updateDirector } = useDirectors();
  const { addMovie } = useMovies();
  const director = directors?.find((x) => x.id === directorId);

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fname, setFname] = useState(director?.first_name || "");
  const [lname, setLname] = useState(director?.last_name || "");

  const [addModal, setAddModal] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  // note: since this is not a retrieve function from the database, but rather a get from the cache, it might fail
  // works for this use case, though
  if (!director) return <div className="text-center text-gray-600">Director with ID {directorId} not found</div>;
  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="text-2xl font-bold flex-1 mr-4">Director details</div>
        <Button onClick={() => setAddModal(true)}>Add movie</Button>
        <div className="w-4"></div>
        <Button
          onClick={async () => {
            if (loading) return;
            if (editing) {
              setLoading(true);
              await updateDirector(directorId, fname, lname);
              setLoading(false);
            } else {
              setFname(director.first_name);
              setLname(director.last_name);
            }
            setEditing((prev) => !prev);
          }}
        >
          {editing ? (loading ? "Loading..." : "Confirm changes") : "Edit"}
        </Button>
      </div>
      {editing ? (
        <>
          <Input label="First name" placeholder="Asen" value={fname} onChange={setFname} />
          <Input label="Last name" placeholder="Gerogiev" value={lname} onChange={setLname} />
        </>
      ) : (
        <>
          <div>
            First name: <strong>{director.first_name}</strong>
          </div>
          <div>
            Last name: <strong>{director.last_name}</strong>
          </div>
          <div className="mt-4">Movies by this director:</div>
          <div>
            {director.movies.map((x, i) => (
              <Link key={i} to={`/movies/${x.id}`}>
                <div className="ml-4 font-bold text-gray-600 hover:underline">
                  {x.name} ({x.release_year})
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {addModal && (
        <Modal onClose={() => setAddModal(false)} title="Add movie">
          <Input label="Name" placeholder="Name of movie" value={name} onChange={setName} />
          <Input
            label="Release year"
            placeholder="Year when this movie was released"
            value={String(year)}
            onChange={(v) => setYear(Number(v))}
          />
          <Button
            onClick={async () => {
              setLoading(true);
              await addMovie(name, year, director.id);
              setLoading(false);
              setName("");
              setYear(new Date().getFullYear());
              setAddModal(false);
            }}
          >
            Add movie
          </Button>
        </Modal>
      )}
    </div>
  );
}
