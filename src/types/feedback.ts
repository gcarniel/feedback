export interface Feedback {
  id: number;
  collaborator: {
    id: string;
    name: string;
  };
  title: string;
  agenda: string;
  leaderPositivePoints: string;
  leaderNegativePoints: string;
  collaboratorPositivePoints: string;
  collaboratorNegativePoints: string;
  feedbackDate: string;
  registrationDate: string;
  levels: Level[];
}

export interface Level {
  title: string;
  collaboratorLevel: string;
  leaderLevel: string;
  observation: string;
}
