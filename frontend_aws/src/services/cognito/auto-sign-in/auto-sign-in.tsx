import { signIn } from "aws-amplify/auth";

type AutoSignIn = {
  username: string;
  password: string;
};

export async function autoSignIn({
  username,
  password,
}: AutoSignIn): Promise<any | undefined> {
  try {
    const { isSignedIn } = await signIn({ username, password });
    return { isSignedIn };
  } catch (error) {
    console.log("error signing in", error);
    return error;
  }
}
