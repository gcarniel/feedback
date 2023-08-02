"use client";
import ColaboradorForm from "@/components/collaborator/collaboratorForm";

interface CollaboratorEditProps {
  id: string;
  params: any;
}
export default function EditCollaboratorPage({
  params,
}: CollaboratorEditProps) {
  console.log(params);
  return (
    <div>
      <ColaboradorForm collaboratorId={params.id} />
    </div>
  );
}
