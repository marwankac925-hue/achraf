
export enum View {
  HOME,
  SOLVE_PROBLEMS,
  DIARY,
  IDEAS,
  GAMES,
  NIGHT_CHAT,
}

export type ChatMessage = {
  id: number;
  sender: 'Achraf' | 'Sara';
  type: 'text' | 'audio';
  content: string;
  timestamp: string;
};

export type DiaryEntry = {
  id: number;
  author: 'Achraf' | 'Sara';
  content: string;
  timestamp: string;
};

export type RelationshipTip = {
  title: string;
  description: string;
};
