import { signUp, SignUpOutput } from "aws-amplify/auth";

type HandleSignUp = {
  username: string;
  password: string;
  email: string;
  nickname: string;
};

export const handleSignUp = async ({
  username,
  password,
  email,
  nickname,
}: HandleSignUp): Promise<any | undefined> => {
  try {
    const { nextStep }: SignUpOutput = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          nickname,
        },
        autoSignIn: true,
      },
    });
    return { nextStep };
  } catch (error) {
    console.log("error signing up:", error);
  }
};
