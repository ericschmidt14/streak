import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={48}
        height={48}
        className="animate-bounce"
      />
    </div>
  );
}
