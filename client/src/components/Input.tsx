import React from "react";
interface Props {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}
export default function Input({ label, placeholder, value, onChange }: Props) {
  return (
    <div className="mb-4">
      {label && <div className="text-sm text-gray-600 font-bold mb-2">{label}</div>}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full hover:ring-2 hover:ring-black rounded px-4 py-2 bg-gray-200 focus:bg-transparent"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
