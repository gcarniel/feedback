import Login from "./login/page";

export default function Home() {
  const user = { name: "Marcia" };
  // const user = null;

  return <div>{user ? <h1>{user?.name}</h1> : <Login />}</div>;
}
