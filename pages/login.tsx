import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  TextInput,
  Button,
  Container,
  Group,
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
          <TextInput
            required
            id="email"
            label="Email"
            placeholder="johnsmith@tibber.com"
            {...form.getInputProps("email")}
          />
          <MantinePasswordInput
            required
            id="password"
            label="Password"
            placeholder="Your password"
            mt="md"
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
