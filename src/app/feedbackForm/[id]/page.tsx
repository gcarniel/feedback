"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

export default function FormEdit({ id, params, onSubmit }: FormEditProps) {
  const [feedbackData, setFeedbackData] = useState<any | null>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const feedbackDocRef = doc(db, "feedback", id);
        const feedbackDocSnap = await getDoc(feedbackDocRef);

        if (feedbackDocSnap.exists()) {
          setFeedbackData({
            ...feedbackDocSnap.data(),
            id: feedbackDocSnap.id,
          });
        } else {
          console.log("Feedback not found!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbackData();
  }, [id, params]);

  const handleFormSubmit = async (editedFeedbackData: any) => {
    try {
      const feedbackDocRef = doc(db, "feedback", id);
      await updateDoc(feedbackDocRef, editedFeedbackData);
      console.log("Feedback Updated!");
      onSubmit(editedFeedbackData);
    } catch (error) {
      console.log(error);
    }
  };

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
