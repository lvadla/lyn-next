import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Autocomplete,
  AutocompleteProps,
  Button,
  Container,
  Group,
  Loader,
  Paper,
  PasswordInput as MantinePasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLogin } from "../hooks/useLogin";
import { setJwtToken } from "../hooks/useJwtToken";

const initialFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const login = useLogin();

  const form = useForm({
    initialValues: initialFormValues,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof initialFormValues) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const { token } = await login(data);
    //FIXME: better. sessionStorage is probably fleeting. testing needed
    setJwtToken(token);
    router.push("/");
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <AutocompleteLoading {...form.getInputProps("email")} />
          <MantinePasswordInput
            label="Password"
            required={true}
            mt="md"
            placeholder="Your password"
            id="password"
            {...form.getInputProps("password")}
          />
          <Group position="right">
            <Button mt="xl" type="submit">
              Sign in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

export function AutocompleteLoading(props: AutocompleteProps) {
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
      {...props}
      required={true}
      value={value}
      onChange={handleChange}
      rightSection={loading ? <Loader size={16} /> : null}
      label="Email"
      placeholder="Your email address"
      data={data}
    />
  );
}
