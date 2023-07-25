"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("success", result);
      })
      .catch((error) => {
        console.log("Não foi possível fazer o login", error);
      });
  };

  return (
    <div className="m-4 sm:m-8 md:m-16 lg:m-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-between space-x-2 pl-12 sm:pl-16 pr-4 py-2 border border-gray-300 rounded-md border-none cursor-pointer bg-white"
          >
            <FcGoogle size={32} className="right-4" />
            <span className="text-slate-900 ">Sign in with Google</span>
          </button>
        </div>
        <div className="bg-gray-500 rounded-md"></div>
      </div>
    </div>
  );
}
