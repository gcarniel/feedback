import { useState } from "react";
import { useForm } from "react-hook-form";

type FeedbackFormData = {
  collaborator: string;
  title: string;
  agenda: string;
  positivePointsLeader: string;
  negativePointsLeader: string;
  positivePointsCollaborator: string;
  negativePointsCollaborator: string;
  feedbackDate: string;
  observation: string;
};

const FeedbackForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FeedbackFormData>();
  const [feedbacks, setFeedbacks] = useState<FeedbackFormData[]>([]);

  const onSubmit = (data: FeedbackFormData) => {
    console.log("Data submitted: ", data);

    reset();
    alert("Feedback sent successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("collaborator")}
        placeholder="Collaborator"
      />
      <input type="text" {...register("title")} placeholder="Title" />

      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
