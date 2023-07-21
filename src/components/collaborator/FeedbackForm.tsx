import React, { useState } from "react";
import { Feedback, Level } from "../../types/feedback";

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Feedback>({
    id: 0,
    collaborator: { id: 0, name: "" },
    title: "",
    agenda: "",
    leaderPositivePoints: "",
    leaderNegativePoints: "",
    collaboratorPositivePoints: "",
    collaboratorNegativePoints: "",
    feedbackDate: "",
    registrationDate: "",
    levels: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleLevelsChange = (
    index: number,
    field: keyof Level,
    value: string
  ) => {
    const updatedLevels = [...formData.levels];
    updatedLevels[index][field] = value;
    setFormData({
      ...formData,
      levels: updatedLevels,
    });
  };

  const handleAddLevel = () => {
    setFormData({
      ...formData,
      levels: [
        ...formData.levels,
        {
          title: "",
          collaboratorLevel: "",
          leaderLevel: "",
          observation: "",
        },
      ],
    });
  };

  const handleRemoveLevel = (index: number) => {
    const updatedLevels = [...formData.levels];
    updatedLevels.splice(index, 1);
    setFormData({
      ...formData,
      levels: updatedLevels,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>

      {/* Other input fields (if any) */}

      <div>
        <h2>Levels</h2>
        <div>
          {formData.levels.map((level, index) => (
            <div key={index}>
              <label>
                Title:
                <input
                  type="text"
                  value={level.title}
                  onChange={(e) =>
                    handleLevelsChange(index, "title", e.target.value)
                  }
                />
              </label>
              <label>
                Collaborator Self-Perceived Level:
                <input
                  type="text"
                  value={level.collaboratorLevel}
                  onChange={(e) =>
                    handleLevelsChange(
                      index,
                      "collaboratorLevel",
                      e.target.value
                    )
                  }
                />
              </label>
              <label>
                Leader Assigned Level:
                <input
                  type="text"
                  value={level.leaderLevel}
                  onChange={(e) =>
                    handleLevelsChange(index, "leaderLevel", e.target.value)
                  }
                />
              </label>
              <label>
                Observation:
                <textarea
                  value={level.observation}
                  onChange={(e) =>
                    handleLevelsChange(index, "observation", e.target.value)
                  }
                />
              </label>
              <button type="button" onClick={() => handleRemoveLevel(index)}>
                Remove Level
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddLevel}>
          Add Level
        </button>
      </div>

      <label>
        Feedback Registration Date (FIXED):
        <input
          type="date"
          value={formData.registrationDate}
          onChange={(e) =>
            setFormData({ ...formData, registrationDate: e.target.value })
          }
          disabled
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default FeedbackForm;
