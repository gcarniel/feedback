"use client";
import { FcFeedback } from "react-icons/fc";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto bg-slate-800 h-max">
      <header className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
        <div className="flex items-center justify-center">
          <FcFeedback className="h-8 w-8 mr-2" />
          <h1 className="text-lg font-bold text-center">Feedback Flow</h1>
        </div>
      </header>
      <div className="p-28">{children}</div>
    </div>
  );
}
