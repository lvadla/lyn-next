import { useRouter } from "next/router";
import React from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const router = useRouter();
  const login = useLogin();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const data = {
      username: target.username.value,
      password: target.password.value,
    };
    const { token } = await login(data);
    //FIXME: bad. localStorage is insecure. need to move this
    localStorage.setItem("token", token);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
