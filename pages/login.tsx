import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  TextInput,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput as MantinePasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLogin } from "../hooks/useLogin";
import { setJwtToken } from "../hooks/useJwtToken";
import { IconUser } from "@tabler/icons";
import { useTimeout } from "@mantine/hooks";

const initialFormValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const login = useLogin();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { start: startLoaderDelay } = useTimeout(() => setLoading(false), 1000);

  const form = useForm({
    initialValues: initialFormValues,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof initialFormValues) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };
    const response = await login(data);
    if (!response.ok) {
      const error = await response.json();
      startLoaderDelay();
      setError(error.message);
      return;
    }
    const { token } = await response.json();
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
          {error ? (
            <Text mt="xs" color="red">
              {error}
            </Text>
          ) : null}
          <Group position="right">
            <Button
              loading={loading}
              leftIcon={<IconUser size={14} />}
              mt="xl"
              type="submit"
            >
              Sign in
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
