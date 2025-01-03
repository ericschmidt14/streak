import { IconLoader2 } from "@tabler/icons-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <IconLoader2 size={48} className="animate-spin" />
    </div>
  );
}
