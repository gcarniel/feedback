"use client";
import dynamic from "next/dynamic";

interface CollaboratorEditProps {
  id: string;
  params: any;
}

const EditCollaborator = dynamic(
  () => import("@/components/collaborator/collaboratorEdit"),
  { ssr: false }
);

const EditCollaboratorPage = ({ id, params }: CollaboratorEditProps) => {
  return (
    <div>
      <EditCollaborator
        params={{
          id: "",
        }}
      />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  return {
    props: {
      id: query.id,
    },
  };
}

export default EditCollaboratorPage;
