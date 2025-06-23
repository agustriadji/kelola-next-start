import { signInSchema, SignInSchemaType } from "@/schemas/authSchema";
import { signInUser } from "@/services/authentication/signIn";
import { setToDB } from "@/utils/idb";

export const handleFormSubmit = async (data: SignInSchemaType) => {
  const parse = signInSchema.safeParse(data);
  if (parse.data) {
    const { username, password } = parse.data;
    const response = await signInUser(username, password);
    if (response) {
      await setToDB("auth", response.data);
    }
    return response;
  } else {
    return { success: false, error: "Invalid data", data: null };
  }
};
