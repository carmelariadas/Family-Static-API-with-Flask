import React, { useEffect, useState } from "react";

const Add_Delete_Members = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState("");

  const [first_name_member, setFirst_name_member] = useState("");

  const create_member = () => {
    fetch(
      `${process.env.BACKEND_URL}/api/add_member`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          age: age,
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  const delete_member = () => {
    fetch(
      `${process.env.BACKEND_URL}/api/delete_member/` +
        first_name_member,
      {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <input
              onChange={(e) => setFirst_name(e.target.value)}
              className="form-control"
              placeholder="first name"
            />
            <br />
            <input
              onChange={(e) => setLast_name(e.target.value)}
              className="form-control"
              placeholder="last name"
            />
            <br />
            <input
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              placeholder="age"
            />
            <br />
            <button onClick={create_member}>Create member</button>
          </div>
          <div className="col"></div>
        </div>
      </div>

      <div className="container text-center mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <input
              onChange={(e) => setFirst_name_member(e.target.value)}
              className="form-control"
              placeholder="nombre"
            />
            <button className="mt-4" onClick={delete_member}>
              Delete member
            </button>
          </div>

          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Add_Delete_Members;
