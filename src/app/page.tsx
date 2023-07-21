"use client";
import ColaboradorForm from "./app/page";
import Login from "./login/page";

export default function Home() {
  const user = { name: "Marcia" };
  // const user = null;

  return <div>{user ? <ColaboradorForm /> : <Login />}</div>;
}
