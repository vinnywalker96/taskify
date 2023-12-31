import React, { useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { signIn, signOut, useSession,  } from "next-auth/react";
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session && status === 'authenticated') {
        router.push('/board')
      }
  }, [router, session, status])

  return (
    <>
    <div>
      <Card className="login-card">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            {/*<Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>*/}
            <Button variant="primary" type="submit" onClick={() => signIn()}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    
    </>
    
  );
};

export default Login;