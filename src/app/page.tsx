"use client";
import { useState } from "react";
import FeedbackForm from "./feedbackForm/page";
import Login from "./login/page";
import { Feedback } from "@/types/feedback";
import Link from "next/link";

const isUserLoggedIn = false;

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn);

  return (
    <div>
      <ul>
        {" "}
        {!userLoggedIn && (
          <li>
            <Link href={"/login"}>
              <Login />
            </Link>
          </li>
        )}
      </ul>

      {userLoggedIn ? (
        <FeedbackForm
          onSubmit={(feedback: Feedback): void => {
            throw new Error("Function not implemented.");
          }}
          mode="view"
          feedbackId={null}
          onClose={(): void => {
            throw new Error("Function not implemented.");
          }}
        />
      ) : null}
    </div>
  );
}
