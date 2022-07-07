import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import styles from "./log-in.module.css";

export default () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [email, setEmail] = useState("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const login = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) return;

    await fetch("./api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email)
    });

    const user = await mutate(
      "/api/profile",
      fetch("/api/profile").then((response) => response.json())
    );

    if (user?.ok && user?.email) {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={login}>
        <div>
          <p>Email:</p>
          <input
            onChange={changeEmail}
            type="text"
            required
            placeholder="Enter your email."
          />
        </div>
        <button className={styles["login-button"]} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
