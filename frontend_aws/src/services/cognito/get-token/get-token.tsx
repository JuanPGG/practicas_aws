import { fetchAuthSession, JWT } from "aws-amplify/auth";

export async function currentSession(): Promise<JWT> {
  try {
    const { /* accessToken, */ idToken } = (await fetchAuthSession()).tokens ?? {};
    return idToken as JWT;
  } catch (error) {
    alert(error);
    return error as any;
  }
}