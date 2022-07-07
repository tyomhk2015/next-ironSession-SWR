import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./create-account.module.css";

export default () => {
  const router = useRouter();
  const [account, setAccount] = useState({ name: "", email: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        setAccount((prev) => ({ ...prev, name: event.target.value }));
        break;
      case "email":
        setAccount((prev) => ({ ...prev, email: event.target.value }));
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!account.email || !account.name) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    fetch("/api/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account)
    }).then(() => {
      setAccount({ name: "", email: "" });
      alert("Account has been created!\nLogin at Login page.");
      setLoading(false);
      router.push("/log-in");
    });
  };
  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p className={styles["error"]}>Fill the form below</p>}
      <form onSubmit={onSubmitHandler}>
        <div>
          <p>Name:</p>
          <input
            type="text"
            id="name"
            onChange={onChangeHandler}
            required
            placeholder="Enter your name."
          />
        </div>
        <div>
          <p>Email:</p>
          <input
            type="text"
            id="email"
            onChange={onChangeHandler}
            required
            placeholder="Enter your email."
          />
        </div>
        <button className={styles["submit-button"]} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};
