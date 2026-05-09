export type typeStudyWeek = {
  week: number;
  tasks: Array<{
    title: string;
    done: boolean;
  }>;
};
export type typeGoal = {
  id?: string | number;
  title: string;
  level: string;
  weeks: number;
  totalTasks: number;
  completedTasks: number;
  studyPlan: Array<typeStudyWeek>;
};

export type user = {
  id?: string | number;
  name: string;
  email: string;
  password: string;
};
