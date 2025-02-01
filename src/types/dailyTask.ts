export interface DailyTask {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  streak: number;
  createdAt: string;
}

export type AddDailyTaskPayload = {
  title: string;
  difficulty: DailyTask['difficulty'];
};
