import React, { useState } from "react";

import Input from "../../shared/elements/Input";
import Link from "../../shared/elements/Link";
import { useAuth } from "../../shared/hook/AuthContextHook";

const SignIn = () => {
  const [username, setUsername] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [validation, setValidation] = useState<string | "">("");

  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("https://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send plaintext password
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { token, expirationTime } = data;

      // Call the login function from AuthContext
      login(token, expirationTime);

      setValidation("");
    } catch (error) {
      console.error("Login error:", error);
      setValidation("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col space-y-2  items-center shadow-lg h-fit pb-10 pt-8 m-5 bg-white rounded-lg border border-gray-300 w-2xs">
      <form
        className="flex flex-col items-center text-sm space-y-5 w-3xs"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          title="Username"
          setValue={setUsername}
          value={username}
        />
        <Input
          type="password"
          title="Password"
          setValue={setPassword}
          value={password}
        />
        <button
          type="submit"
          className="w-fit px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 md:w-auto hover:cursor-pointer"
        >
          Login
        </button>
      </form>
      <Link
        location="/signup"
        label="Click here to create an account."
        newTab={false}
      />
      <span className="text-xs text-red-600">{validation}</span>
    </div>
  );
};

export default SignIn;
