"use client";
import ColaboradorForm from "./app/page";
import FeedbackForm from "../components/collaborator/FeedbackForm";
import Login from "./login/page";
import { Feedback } from "@/types/feedback";

export default function Home() {
  const user = { name: "Marcia" };

  return (
    <div>
      {user ? (
        <FeedbackForm
          onSubmit={function (feedback: Feedback): void {
            throw new Error("Function not implemented.");
          }}
        />
      ) : (
        <Login />
      )}
    </div>
  );
}
