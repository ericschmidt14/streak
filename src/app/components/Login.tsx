"use client";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import {
  IconAt,
  IconExclamationCircle,
  IconLock,
  IconLogin2,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  border,
  defaultPadding,
  inputStyles,
} from "../lib/styles";
import { isValidEmail } from "../lib/utils";

export default function SignIn() {
  const { signIn, signUp, error } = useStreakContext();

  const [hasAccount, setHasAccount] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const actionText = hasAccount ? "Sign In" : "Sign Up";
  const toggleText = hasAccount
    ? { question: "No account yet?", action: "Sign Up" }
    : { question: "Already signed up?", action: "Sign In" };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <form
        className={`relative z-50 w-[360px] flex flex-col gap-8 rounded-lg ${defaultPadding} ${backdropBlur} shadow-2xl shadow-blue-500/50 ${border}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (hasAccount) {
            signIn(email, password);
          } else {
            signUp(email, password, displayName);
          }
        }}
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          width={48}
          height={48}
          className="rounded-full self-center py-4"
        />
        <div className="flex flex-col gap-2">
          {!hasAccount && (
            <TextInput
              size="lg"
              placeholder="Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              styles={{
                input: inputStyles,
              }}
              leftSection={<IconUser size={20} />}
            />
          )}
          <TextInput
            size="lg"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles={{
              input: inputStyles,
            }}
            leftSection={<IconAt size={20} />}
          />
          <PasswordInput
            size="lg"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles={{
              input: inputStyles,
            }}
            leftSection={<IconLock size={20} />}
          />
          <Button
            size="lg"
            type="submit"
            color={hasAccount ? "red" : "blue"}
            fullWidth
            leftSection={
              hasAccount ? <IconLogin2 size={20} /> : <IconUserPlus size={20} />
            }
            disabled={password.length < 6 || !isValidEmail(email)}
          >
            {actionText}
          </Button>
          {error && (
            <div className="flex items-center gap-1">
              <IconExclamationCircle size={16} color="#ec4899" />
              <p className="text-[var(--red)]">{error.message}</p>
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
        src="/bg.svg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute top-0 z-0 brightness-50"
      />
    </div>
  );
}
