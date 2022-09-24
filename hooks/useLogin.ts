interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  const login = async (request: LoginRequest): Promise<Response> => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login.credentials`,
      {
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    return result;
  };
  return login;
};
