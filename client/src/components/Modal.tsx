import React from "react";
import Button from "./Button";

interface Props {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ title, onClose, children }: Props) {
  return (
    <div className="inset-0 p-4 w-screen h-screen fixed z-20 bg-opacity-50 bg-black backdrop-filter backdrop-blur flex items-center justify-center">
      <div className="p-4 bg-white rounded container mx-auto w-full max-w-screen-md">
        <div className="flex mb-4">
          <div className="font-bold text-lg flex-1">{title}</div>
          <Button onClick={onClose}>Close</Button>
        </div>
        {children}
      </div>
      <div onClick={onClose} className="inset-0 z-10 cursor-pointer" />
    </div>
  );
}
