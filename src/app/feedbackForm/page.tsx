"use client";
import React, { useEffect, useState } from "react";

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

export default function FeedbackFormPage({
  id,
  params,
  onSubmit,
}: FormEditProps) {
  return (
    <div>
      {" "}
      <FeedbackForm
        onSubmit={function (feedback: Feedback): void {
          throw new Error("Function not implemented.");
        }}
        feedbackId={null}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
