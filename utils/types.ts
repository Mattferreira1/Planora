export type typeStudyWeek = {
  week: number;
  tasks: Array<{
    title: string;
    done: boolean;
  }>;
};
export type typeGoal = {
  id?: string;
  title: string;
  level: string;
  weeks: number;
  totalTasks: number;
  completedTasks: number;
  studyPlan: Array<typeStudyWeek>;
};
