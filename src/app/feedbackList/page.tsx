"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { useRouter } from "next/navigation";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";
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
