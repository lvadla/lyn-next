import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Autocomplete,
  Button,
  Container,
  Loader,
  Paper,
  PasswordInput as MantinePasswordInput,
} from "@mantine/core";
import { useLogin } from "../hooks/useLogin";
import { setJwtToken } from "../hooks/useJwtToken";

const Login = () => {
  const router = useRouter();
  const login = useLogin();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const data = {
      email: target.email.value,
      password: target.password.value,
    };
    const { token } = await login(data);
    //FIXME: better. sessionStorage is probably fleeting. testing needed
    setJwtToken(token);
    router.push("/");
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <AutocompleteLoading />
          <MantinePasswordInput
            label="Password"
            required={true}
            mt="md"
            placeholder="Your password"
            id="password"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

export function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["tibber.com", "gmail.com", "outlook.com", "fastmail.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 500);
    }
  };
  return (
    <Autocomplete
      required={true}
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size={16} /> : null}
      label="Email"
      placeholder="Your email address"
    />
  );
}
