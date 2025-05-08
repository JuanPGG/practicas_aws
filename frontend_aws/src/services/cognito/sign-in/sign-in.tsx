import { signIn } from "aws-amplify/auth";

type HandleSignIn = {
  username: string;
  password: string;
};

export async function handleSignIn({
  username,
  password,
}: HandleSignIn): Promise<any | undefined> {
  try {
    const { isSignedIn } = await signIn({ username, password });
    return { isSignedIn };
  } catch (error) {
    console.log("error signing in", error);
    return error;
  }
}
