import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contextos/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("") 
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Revisa tu correo para próximas instrucciones')
    } catch {
      setError("Ocurrió un error al reiniciar tu contraseña");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reiniciar contraseña</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reiniciar contraseña
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Iniciar sesión</Link>
          </div>          
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        ¿No tienes una cuenta? <Link to="/signup">Regístrate xdxd</Link>
      </div>
    </>
  );
}
