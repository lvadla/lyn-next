interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const login = async (request: LoginRequest): Promise<LoginResponse> => {
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
    return await result.json();
  };
  return login;
};
