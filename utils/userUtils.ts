//Generating of strings
export function randomString(length = 6): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// Generating user
export type User = {
  username: string;
  email: string;
  password: string;
};

export function generateRandomUser(): User {
  const username = `user_${Math.random().toString(36).substring(2, 8)}`;
  const email = `user_${Math.random().toString(36).substring(2, 8)}@test.com`;
  const password = `Pass_${Math.random().toString(36).substring(2, 10)}`;
  return { username, email, password };
}
