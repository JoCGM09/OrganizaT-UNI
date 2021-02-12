import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contextos/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordConfirmRef.current.value !== passwordRef.current.value) {
        return setError('Las contraseñas no coinciden')
    }

    try {
       setError('')
       setLoading(true) 
       await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
        setError('Ocurrió un error al crear una cuenta')
    }
    setLoading(false)
  } 


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Regístrate</h2>
          {JSON.stringify(currentUser)}
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
            <Form.Group id="password-confirm">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Registrarme
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        ¿Ya tienes una cuenta? Inicia Sesión
      </div>
    </>
  );
}
