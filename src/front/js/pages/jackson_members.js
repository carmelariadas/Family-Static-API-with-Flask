import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Jackson_Members = () => {
  const [members, setMembers] = useState("");

  useEffect(() => {
    const options = {
      methods: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    fetch(
      `${process.env.BACKEND_URL}/api/members`,
      options
    )
      .then((response) => response.json())
      .then((result) => setMembers(result));
  }, []);

  return ( 
    <>
      <div className="container text-center mt-5">
        <h1>Pagina de Jackson_Members</h1>
        <div>
          <div>
            {members
              ? members.map((element, index) => (
                  <h2 key={index}>
                    {element.first_name}{" "}{element.id}
                    <Link to={"/members/" + element.id}>Modificar</Link>
                  </h2>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jackson_Members;
