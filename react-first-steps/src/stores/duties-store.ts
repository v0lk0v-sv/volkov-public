import { atom, computed } from "nanostores";
import { nanoid } from "nanoid";

import { DUTIES_MOCK, USERS_MOCK } from "./mock-data";
import { Duty, DutyType, DutyWithDates, User } from "./types";
import { getDates } from "../components/get-timestamps/get-timestamps";


/// ????? todo
export type dfkdfkDuty = {
  children?: Duty[]; // ?
  noEvents?: boolean;
  defaultExpanded?: boolean;
  slack_group_id?: string;
  timestamps?: { start: number; end: number }[];
  duty_type?: DutyType;
  duty_length?: number;
  duty_change_day?: number;
  duty_dates?: { start: number; end: number }[];
  constant_users?: string[];
  members?: string[];
};


export const $duties = atom<Duty[]>(DUTIES_MOCK);
export const $users = atom<User[]>(USERS_MOCK);

export const $appDisplayMode = atom<"view" | "create" | "edit">("view");

export const $editingDutyId = atom<string | undefined>(undefined);
export const $editingDuty = computed([$editingDutyId, $duties], (editingId, duties) => {
  return editingId ? duties.find((duty) => duty.id === editingId) :  undefined;
});

export const $dutiesWithDates = computed($duties, (duties) => {
  return duties.map((duty) => {
    const dutyWithDates: DutyWithDates = {
      ...duty,
      duty_dates: duty.members.reduce((dates, member) => {
        dates[member] = getDates(duty, member);
        return dates;
      }, {}),
    };

    return dutyWithDates;
  });
});

export const switchToCreateMode = () => {
  $editingDutyId.set(undefined);
  $appDisplayMode.set("create");
};
export const switchToEditMode = (id: string) => {
  $editingDutyId.set(id);
  $appDisplayMode.set("edit");
};
export const switchToViewMode = () => {
  $editingDutyId.set(undefined);
  $appDisplayMode.set("view");
}

export function getDuty(id) {
  return $duties.get().find((duty) => duty.id === id);
}

export function addDuty(name: string, duty_type: DutyType, members: string[]): void {
  const newDuty: Duty = {
    id: nanoid(),
    name,
    duty_type,
    slack_group_id: `NEW-SLACK-ID-${nanoid(10)}`,
    members: members,
  };

  $duties.set([...$duties.get(), newDuty]);
}

export function editDuty(
  id: string,
  name: string,
  regularity: DutyType,
  memberLogins: string[]
): void {
  const duties = $duties.get();

  const updatedDuties = duties.map((duty) =>
    duty.id === id
      ? {
          ...duty,
          name: name,
          duty_type: regularity,
          members: memberLogins,
        }
      : duty
  );

  $duties.set(updatedDuties);
}
