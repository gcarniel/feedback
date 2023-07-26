"use client";
import ColaboradorForm from "./app/page";
import FeedbackForm from "../components/feedback/FeedbackForm";
import Login from "./login/page";
import { Feedback } from "@/types/feedback";
import ColaboratorsList from "@/components/collaborator/ColaboratorsList";
import FeedbacksList from "@/components/feedback/FeedbackList";

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
