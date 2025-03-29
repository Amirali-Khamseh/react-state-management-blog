export function authorize(id: string): Promise<string[]> {
  if (id === "1") {
    return new Promise((resolve) => setTimeout(() => resolve(["admin"]), 1000));
  }
  return new Promise((reject) =>
    setTimeout(() => reject(["NOT an Admin"]), 1000)
  );
}
