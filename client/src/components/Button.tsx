import React from "react";
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}
export default function Button({ children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="text-center cursor-pointer px-4 py-2 rounded-full bg-gray-300 hover:ring-2 hover:ring-black text-black hover:text-white hover:bg-black transition-all"
    >
      {children}
    </div>
  );
}
