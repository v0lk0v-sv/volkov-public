import { useCallback } from "react";
import { useStore } from "@nanostores/react";

import { DutyFormResult, Form } from "../form/form";
import {
  $editingDuty,
  editDuty,
  switchToViewMode,
} from "../../stores/duties-store";

export const DutyEdit: React.FC = () => {
  const editingDuty = useStore($editingDuty);

  const onSubmit = useCallback(
    ({ name, type, members }: DutyFormResult) => {
      editDuty(editingDuty.id, name, type, members);
      switchToViewMode();
    },
    [editingDuty]
  );

  return (
    <Form
      mode="edit"
      initialName={editingDuty.name}
      initialType={editingDuty.duty_type}
      initialMembers={editingDuty.members}
      onSubmit={onSubmit}
      onCancel={switchToViewMode}
    />
  );
};
