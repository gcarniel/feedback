"use client";
import React, { useEffect, useState } from "react";

import FeedbacksList from "@/components/feedback/feedbackList";

interface Collaborator {
  id: string;
  name: string;
}

interface Feedback {
  id: string;
  title: string;
  collaborator: Collaborator | null;
  registrationDate: string;
}

const FeedbacksListPage: React.FC = () => {
  return (
    <div>
      <FeedbacksList />
    </div>
  );
};

export default FeedbacksListPage;
