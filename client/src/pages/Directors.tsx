import React, { useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import useDirectors from "../utils/hooks/useDirectors";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Input from "../components/Input";

export default function Directors(props: RouteComponentProps) {
  const { directors, directorsLoading, addDirector } = useDirectors();
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  if (directorsLoading) return <div className="text-center text-gray-600 font-bold">Loading movies...</div>;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">All directors</div>
        <Button onClick={() => setAddModal(true)}>Add director</Button>
      </div>
      {directors?.map((x) => (
        <div className="rounded mt-4 px-4 py-2 bg-gray-200 hover:shadow-md flex items-center transition-all">
          <div className="flex-1 mr-4">
            <div className="font-bold">
              {x.first_name} {x.last_name}
            </div>
            <div className="text-gray-600">Total number of movies: {x.movies.length}</div>
          </div>
          <div>
            <Link to={`/directors/${x.id}`}>
              <div className="py-2 px-4 rounded-full bg-white font-bold hover:bg-transparent hover:ring-2 hover:ring-black transition-all">
                Director Details
              </div>
            </Link>
          </div>
        </div>
      ))}

      {addModal && (
        <Modal title="Add new director" onClose={() => setAddModal(false)}>
          <Input label="First name" placeholder="New director first name" value={fname} onChange={setFname} />
          <Input label="Last name" placeholder="New director last name" value={lname} onChange={setLname} />
          <div className="h-4"></div>
          <Button
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              await addDirector(fname, lname);
              setLoading(false);
              setAddModal(false);
            }}
          >
            {loading ? "Loading..." : "Add director"}
          </Button>
        </Modal>
      )}
    </div>
  );
}
