import { Feedback } from "../../types/feedback";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  return (
    <ul>
      {feedbacks.map((feedback) => (
        <li key={feedback.id}>
          {/* Exiba os detalhes do feedback, como título, nome do colaborador e data de criação */}
        </li>
      ))}
    </ul>
  );
};

export default FeedbackList;
