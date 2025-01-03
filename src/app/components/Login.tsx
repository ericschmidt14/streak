"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  border,
  defaultPadding,
  defaultShadow,
  inputStyles,
} from "../lib/styles";
import { cn, isValidEmail } from "../lib/utils";
import DotPattern from "./Dots";

export default function SignIn() {
  const { signIn, signUp, error } = useStreakContext();

  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Determine form action and button text dynamically
  const formAction = hasAccount ? signIn : signUp;
  const actionText = hasAccount ? "Sign In" : "Sign Up";
  const toggleText = hasAccount
    ? { question: "No account yet?", action: "Sign Up" }
    : { question: "Already signed up?", action: "Sign In" };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className={`relative z-50 w-[320px] flex flex-col gap-2 rounded-md ${defaultPadding} ${defaultShadow} ${backdropBlur} ${border}`}
        onSubmit={(e) => {
          e.preventDefault();
          formAction(email, password);
        }}
      >
        <Image
          src="/logo.svg"
          alt="Profile Image"
          width={48}
          height={48}
          className="rounded-full self-center"
        />
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          styles={{
            input: inputStyles,
          }}
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          styles={{
            input: inputStyles,
          }}
        />
        <Button
          type="submit"
          fullWidth
          disabled={password.length < 6 || !isValidEmail(email)}
        >
          {actionText}
        </Button>
        {error && (
          <div className="flex items-center gap-1">
            <IconExclamationCircle size={16} color="#ec4899" />
            <p className="text-pink-500">{error.message}</p>
          </div>
        )}
        <div className="flex justify-center items-baseline gap-2 pt-4">
          <p>{toggleText.question}</p>
          <Button
            variant="light"
            color="blue"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {toggleText.action}
          </Button>
        </div>
      </form>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(640px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
