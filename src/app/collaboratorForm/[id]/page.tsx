"use client";

import EditCollaborator from "@/components/collaborator/collaboratorEdit";
import { useRouter } from "next/router";

const EditCollaboratorPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <EditCollaborator params={{ id: id as string }} />
    </div>
  );
};

export default EditCollaboratorPage;
