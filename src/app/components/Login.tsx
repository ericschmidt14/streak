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
import { isValidEmail } from "../lib/utils";

export default function SignIn() {
  const { signIn, signUp, error } = useStreakContext();

  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formAction = hasAccount ? signIn : signUp;
  const actionText = hasAccount ? "Sign In" : "Sign Up";
  const toggleText = hasAccount
    ? { question: "No account yet?", action: "Sign Up" }
    : { question: "Already signed up?", action: "Sign In" };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <form
        className={`relative z-50 w-[320px] flex flex-col gap-8 rounded-md ${defaultPadding} ${defaultShadow} ${backdropBlur} ${border}`}
        onSubmit={(e) => {
          e.preventDefault();
          formAction(email, password);
        }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={48}
          height={48}
          className="rounded-full self-center"
        />
        <div className="flex flex-col gap-2">
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
            color={hasAccount ? "red" : "blue"}
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
        </div>
        <div className="flex justify-center items-baseline gap-2">
          <p className="text-xs text-white/50">{toggleText.question}</p>
          <Button
            variant="light"
            color={hasAccount ? "blue" : "red"}
            size="xs"
            onClick={() => setHasAccount(!hasAccount)}
          >
            {toggleText.action}
          </Button>
        </div>
      </form>
      <Image
        src="/track.png"
        alt="Track Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0 brightness-50"
      />
    </div>
  );
}
