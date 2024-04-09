export type DutyType = "weekly" | "regular" | "weekdays";

export interface Duty {
  id: string;
  name: string;
  duty_type: DutyType;
  duty_length?: number;
  duty_change_day?: number;
  slack_group_id?: string;
  members: string[];
}

export interface DutyWithDates extends Duty {
    duty_dates: Record<string, { start: number; end: number }[]>;
}

export interface User {
  login: string;
  slack_id: string;
}
