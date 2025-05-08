import { confirmSignUp } from "aws-amplify/auth";

type HandleSignUpConfirmation = {
  username: string;
  confirmationCode: string;
};

export async function handleSignUpConfirmation({
  username,
  confirmationCode,
}: HandleSignUpConfirmation): Promise<any | undefined> {
  try {
    const { nextStep } = await confirmSignUp({
      username,
      confirmationCode,
    });
    return { nextStep };
  } catch (error) {
    console.log("error confirming sign up", error);
    return error;
  }
}
