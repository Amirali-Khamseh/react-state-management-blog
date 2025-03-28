export type User = {
  id: string;
  name: string;
  email: string;
};

export function authenticate(): Promise<User | undefined> {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve({ id: "1", name: "Amir", email: "amir@test.com" }),
      1000
    )
  );
}
