"use client";

import EditCollaborator from "@/components/collaborator/collaboratorEdit";
import { useRouter } from "next/navigation";

const EditCollaboratorPage = ({ id, params }: any) => {
  console.log(params);
  const router = useRouter();

  return (
    <div>
      <EditCollaborator params={{ id: id as string }} />
    </div>
  );
};
// export async function getServerSideProps({ query }: any) {
//   console.log("query", query);

//   return { props: {} };
// }

export default EditCollaboratorPage;
