import React, { useEffect, useState } from "react";
import { handleSignUpConfirmation } from "src/services/cognito/confirm-sign-up/confirm-sign-up";
import { handleSignIn } from "src/services/cognito/sign-in/sign-in";
import { handleSignUp } from "src/services/cognito/sign-up/sign-up";
import {
  Button,
  Card,
  Container,
  Input,
  Label,
  Paragraph,
  RowItem,
  TitleCard,
} from "./authentication.styles";
import { currentSession } from "src/services/cognito/get-token/get-token";
import { useNavigate } from "react-router-dom";

export const Authentication = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();

  const [typeFormToShow, setTypeFormToShow] = useState("SIGN_IN");

  const resetConfirmSignUp = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmationCode("");
  };

  const resetSignIn = () => {
    setUsername("");
    setPassword("");
  };

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      nickname: username,
    };
    const { nextStep } = await handleSignUp(data);

    setTypeFormToShow(nextStep.signUpStep);
  };

  const handleConfirmationSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = { username: username, confirmationCode: confirmationCode };
    const { nextStep } = await handleSignUpConfirmation(data);
    setTypeFormToShow(nextStep.signUpStep);
    await signIn();
    if (nextStep.signUpStep !== "COMPLETE_AUTO_SIGN_UP") resetConfirmSignUp();
  };

  const handleSignInSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await signIn();
    resetSignIn();
  };

  const signIn = async () => {
    const { isSignedIn } = await handleSignIn({ username, password });

    const token = await currentSession();

    localStorage.setItem("user", JSON.stringify({
      token: token.toString(),
      isLogged: isSignedIn
    }));

    navigate("/home");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(!user) return;

    const dataUser = JSON.parse(user);
    if(dataUser.isLogged){
      navigate("/home");
    }
  }, []);

  return (
    <Container>
      {typeFormToShow === "SIGN_UP" && (
        <Card onSubmit={handleSignUpSubmit}>
          <TitleCard>Sign Up</TitleCard>
          <RowItem>
            <Label>Username</Label>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
          </RowItem>
          <RowItem>
            <Label>Email</Label>
            <Input type="text" onChange={(e) => setEmail(e.target.value)} />
          </RowItem>
          <RowItem>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </RowItem>
          <RowItem>
            <Button type="submit">Sign up</Button>
          </RowItem>
          <Paragraph>
            ¿Ya tienes una cuenta?
            <span onClick={() => setTypeFormToShow("SIGN_IN")}>Sign In</span>
          </Paragraph>
        </Card>
      )}
      {typeFormToShow === "CONFIRM_SIGN_UP" && (
        <Card onSubmit={handleConfirmationSignUpSubmit}>
          <TitleCard>Confirmation</TitleCard>
          <RowItem>
            <Label>Confirmation code</Label>
            <Input
              type="text"
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </RowItem>
          <RowItem>
            <Button type="submit">Confirm</Button>
          </RowItem>
        </Card>
      )}
      {typeFormToShow === "SIGN_IN" && (
        <Card onSubmit={handleSignInSubmit}>
          <TitleCard>Sign In</TitleCard>
          <RowItem>
            <Label>Username</Label>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} />
          </RowItem>
          <RowItem>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </RowItem>
          <RowItem>
            <Button type="submit">Sign in</Button>
          </RowItem>
          <Paragraph>
            ¿No tienes una cuenta?
            <span onClick={() => setTypeFormToShow("SIGN_UP")}>Sign Up</span>
          </Paragraph>
        </Card>
      )}
    </Container>
  );
};
