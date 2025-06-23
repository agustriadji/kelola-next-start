export type SignInStoreType = {
  name: string | "";
  email: string | "";
  setField: (field: "username" | "password", value: string) => void;
};
