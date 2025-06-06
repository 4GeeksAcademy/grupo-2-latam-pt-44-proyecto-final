import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { showError, showInfo, showSuccess } from "../utils/toastUtils";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, dispatch } = useGlobalReducer()

  const IniciarSesion = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        showInfo("¡Todos los campos deben ser llenados!");
        return;
      }

      const cuenta = { email, password };

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuenta),
      });

      const data = await response.json(); // leemos la respuesta
      console.log(data)

      if (response.ok) {
        showSuccess(data.msg || "¡Te has logeado con éxito!");

        // Guarda el token en sessionStorage
        sessionStorage.setItem("token", data.access_token);
        console.log("Token guardado en sessionStorage:", sessionStorage.getItem("token"));

        dispatch({
          type: "login",
          payload: {
            token: data.access_token,
            role: data.role,
          }
        })
        if (data.role === "CLIENTE") {
          navigate("/cliente/crear-orden")
        }
        else if (data.role === "COCINA") {
          navigate("/kitchen")
        }
        else if (data.role === "ADMIN") {
          navigate("/admin")
        }
        else {
          navigate("/")
        }

      // navigate("/dashboard"); // si quieres redirigir
      } else {
        showError(data.msg || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.log(error);
      showError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <form className="row justify-content-center p-4" onSubmit={IniciarSesion}>
      <div className="col-md-6">
        <h1 className="text-center mb-5">Iniciar Sesión</h1>

        <div className="mb-5">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            id="inputEmail"
            style={{ borderRadius: "0" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            id="inputPassword"
            style={{ borderRadius: "0" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-50">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </form>
  );
};