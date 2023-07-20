import { useState } from "react";
import { useForm } from "react-hook-form";

type Feedback = {
  id: number;
  collaborator: string;
  title: string;
  agenda: string;
  positivePointsLeader: string;
  negativePointsLeader: string;
  positivePointsCollaborator: string;
  negativePointsCollaborator: string;
  feedbackDate: string;
  creationDate: string;
  genericLevelTitle: string;
  selfPerceivedLevel: string;
  leaderPerceivedLevel: string;
  observation: string;
};

const CollaboratorForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Feedback>();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [editFeedbackId, setEditFeedbackId] = useState<number | null>(null);

  const onSubmit = (data: Feedback) => {
    if (editFeedbackId !== null) {
      const updatedFeedbacks = feedbacks.map((feedback) =>
        feedback.id === editFeedbackId
          ? { ...data, id: editFeedbackId }
          : feedback
      );
      setFeedbacks(updatedFeedbacks);
    } else {
      data.id = Math.floor(Math.random() * 1000);
      setFeedbacks([...feedbacks, data]);
    }

    reset();
    setEditFeedbackId(null);
  };

  const handleEditFeedback = (id: number) => {
    const feedbackToEdit = feedbacks.find((feedback) => feedback.id === id);
    if (feedbackToEdit) {
      reset(feedbackToEdit);
      setEditFeedbackId(id);
    }
  };

  const handleDeleteFeedback = (id: number) => {
    const updatedFeedbacks = feedbacks.filter((feedback) => feedback.id !== id);
    setFeedbacks(updatedFeedbacks);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredFeedbacks = feedbacks.filter(
      (feedback) =>
        feedback.collaborator.toLowerCase().includes(searchTerm) ||
        feedback.title.toLowerCase().includes(searchTerm)
    );
    setFilteredFeedbacks(filteredFeedbacks);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">
          {editFeedbackId !== null ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search by collaborator or title"
        onChange={handleFilterChange}
      />

      <ul>
        {filteredFeedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.title} - {feedback.collaborator} - {feedback.creationDate}
            <button onClick={() => handleEditFeedback(feedback.id)}>
              Edit
            </button>
            <button onClick={() => handleDeleteFeedback(feedback.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorForm;
