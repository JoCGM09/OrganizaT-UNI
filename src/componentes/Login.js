import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contextos/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Ocurrió un error al ingresar a tu cuenta");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Inicia Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>          
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        ¿No tienes una cuenta? <Link to="/signup">Regístrate xdxd</Link>
      </div>
    </>
  );
}
