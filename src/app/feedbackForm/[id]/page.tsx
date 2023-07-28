"use client";
import React, { useEffect, useState } from "react";
import FeedbackForm from "./page";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
  }, [id]);

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
      {feedbackData ? (
        <FeedbackForm
          onSubmit={handleFormSubmit}
          initialFeedbackData={feedbackData}
          mode="edit"
          feedbackId={id}
          onClose={() => {}}
          id={""}
          params={undefined}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
