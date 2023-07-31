"use client";
import React, { useEffect, useState } from "react";
import FeedbakForm from "../../../components/feedback/feedbakForm";
import { Feedback } from "@/types/feedback";

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
  return (
    <div>
      {" "}
      <FeedbakForm
        onSubmit={function (feedback: Feedback): void {
          throw new Error("Function not implemented.");
        }}
        mode={"view"}
        feedbackId={null}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
