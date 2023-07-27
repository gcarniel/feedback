"use client";
import { FcFeedback } from "react-icons/fc";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto bg-slate-800 h-max">
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <div className="flex items-center">
          <FcFeedback className="h-8 w-8 mr-2" />
          <h1 className="text-lg font-bold">Feedback Flow</h1>
        </div>
      </header>
      <div className="p-24">{children}</div>
    </div>
  );
}
