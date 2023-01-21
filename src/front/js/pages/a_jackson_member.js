import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AJacksonMember = () => {
  const [datosMiembro, setDatosMiembro] = useState("");

  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/members/` + params.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
     
    })
      .then((response) => response.json())
      .then((result) => setDatosMiembro(result));
  }, []);



  const modificar = () =>{
    fetch(`${process.env.BACKEND_URL}/api/members/` + params.id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        first_name: datosMiembro.first_name,
        last_name: datosMiembro.last_name,
        age: datosMiembro.age
      }),
    })
      .then((response) => response.json())
      .then((result) => setDatosMiembro(result))
  
  }

  return (
    <>
      <div className="container text-center mt-5">
        <h1>{datosMiembro.first_name} Jackson </h1>
        <div>
          <input
            onChange={(e) =>
              setDatosMiembro({ ...datosMiembro, first_name: e.target.value })
            }
            defaultValue={datosMiembro?.first_name}
          />
          <input
            onChange={(e) =>
              setDatosMiembro({ ...datosMiembro, last_name: e.target.value })
            }
            defaultValue={datosMiembro?.last_name}
          />
          <input
            onChange={(e) =>
              setDatosMiembro({ ...datosMiembro, age: e.target.value })
            }
            defaultValue={datosMiembro?.age}
          />
          <button onClick={() => modificar()}>Modificar</button>
        </div>
      </div>
    </>
  );
};

export default AJacksonMember;
