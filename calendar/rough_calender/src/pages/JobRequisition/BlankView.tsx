import React from "react";

export default function BlankView({ text }: { text: string }) {
  return <div className="text-center text-gray-500 mt-12">{text}</div>;
}