"use client";
import React from "react";
import FeedbackForm from "@/components/feedback/feedbackForm";
import { Feedback } from "@/types/feedback";

interface FormEditProps {
  params: {
    id: string;
  };
}

export default function FormEditPage({ params }: FormEditProps) {
  return (
    <div>
      <FeedbackForm
        feedbackId={params.id}
        onSubmit={function (feedback: Feedback): void {}}
        onClose={function (): void {}}
      />
    </div>
  );
}
