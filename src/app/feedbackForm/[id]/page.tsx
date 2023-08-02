"use client";
import React from "react";
import { Feedback } from "@/types/feedback";
import FeedbackForm from "@/components/feedback/feedbackForm";

interface FormEditProps {
  id: string;
  params: any;
  onSubmit: (editedFeedbackData: any) => void;
  initialFeedbackData: any;
  mode: string;
  feedbackId: string;
  onClose: () => void;
}

export default function FormEditPage({ id, params, onSubmit }: FormEditProps) {
  console.log("pageId", id, params);
  return (
    <div>
      {" "}
      <FeedbackForm
        onSubmit={function (feedback: Feedback): void {
          throw new Error("Function not implemented.");
        }}
        mode={"view"}
        feedbackId={params.id}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
