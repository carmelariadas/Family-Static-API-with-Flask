import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logeo = () => {
    // fetch(process.env.BACKEND_URL + "/api/login", { asi tambie serviria (viene de layout)
    fetch(
      `${process.env.BACKEND_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    )
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        } else {
          setError("erroneo");
        }
      })
      .then((result) => {
        if (result.token != undefined) {
          localStorage.setItem("token", result.token);
          navigate("/members");
        }
      });
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Login</h1>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="mb-3 row">
              <label for="inputEmail" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label for="inputPassword" className="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="inputPassword"
                />
              </div>
            </div>
            <button onClick={logeo} type="submit" class="btn btn-primary mb-3">
              Confirm identity
            </button>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div
            className={error == "erroneo" ? "alert alert-danger" : "d-none"}
            role="alert"
          >
            <h4>Ususario y/o contraseña erroneos</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
