"use client";
import { ActionIcon, Button, PasswordInput, TextInput } from "@mantine/core";
import {
  IconAt,
  IconExclamationCircle,
  IconLock,
  IconLogout,
  IconPencil,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APP_VERSION } from "../config";
import { useStreakContext } from "../context/StreakContext";
import {
  backdropBlur,
  borderBottom,
  defaultPadding,
  defaultShadow,
  inputStyles,
} from "../lib/styles";

export default function Settings({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { user, error, updateUserDetails, signOut } = useStreakContext();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const name = user?.user_metadata.display_name;

  useEffect(() => {
    setDisplayName(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen ${defaultPadding} grid grid-cols-1 md:grid-cols-2 justify-center items-center md:items-end gap-4 ${defaultShadow} ${backdropBlur} ${borderBottom} backdrop-blur-md`}
      style={{
        transform: open ? "translateY(0)" : "translateY(-440px)",
        transition: "300ms all ease-in-out",
      }}
    >
      <footer className="flex justify-between gap-2">
        <a href="https://github.com/ericschmidt14/streak">
          <p className="text-xs text-white/50">Version {APP_VERSION}</p>
        </a>
        <a href="mailto:streak@ericschmidt.de">
          <p className="text-xs text-white/50">
            Created by E R I C S C H M I D T
          </p>
        </a>
      </footer>
      <div className="grid grid-cols-1 gap-2">
        <TextInput
          size="lg"
          placeholder="New name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          leftSection={<IconUser size={20} />}
          styles={{
            input: inputStyles,
          }}
        />
        <TextInput
          size="lg"
          type="email"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          styles={{
            input: inputStyles,
          }}
          leftSection={<IconAt size={20} />}
        />
        <PasswordInput
          size="lg"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          styles={{
            input: inputStyles,
          }}
          leftSection={<IconLock size={20} />}
        />
        {error && (
          <div className="flex items-center gap-1">
            <IconExclamationCircle size={16} color="#ec4899" />
            <p className="text-pink-500">{error.message}</p>
          </div>
        )}
        <Button
          size="lg"
          color="blue"
          onClick={() => updateUserDetails(displayName, email, password)}
          leftSection={<IconPencil size={20} />}
        >
          Edit Account
        </Button>
      </div>
      <div className="flex items-center gap-2 pr-2">
        <Button
          size="lg"
          variant="light"
          onClick={() => signOut()}
          leftSection={<IconLogout size={20} />}
          fullWidth
        >
          Sign Out
        </Button>
        <ActionIcon
          variant="transparent"
          color="white"
          onClick={() => setOpen(false)}
        >
          <IconX size={20} />
        </ActionIcon>
      </div>
    </div>
  );
}
