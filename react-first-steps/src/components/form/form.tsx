import { useState, useCallback, useEffect } from "react";
import { MemberSelect } from "../member-select/member-select";
import { DutyTypeSelect } from "../duty-type-select/duty-type-select";
import { DutyType } from "../../stores/types";
import { Input, Button } from "@mantine/core";

import styles from "./form.module.css";

export interface DutyFormResult {
  name: string;
  type: DutyType;
  members: string[];
}

interface FormProps {
  initialName?: string;
  initialType?: DutyType;
  initialMembers?: string[];
  mode?: "create" | "edit";
  onSubmit: (formResult: DutyFormResult) => void;
  onCancel: () => void;
}

const defaultMembers = [];

export const Form: React.FC<FormProps> = ({
  mode,
  initialName = "",
  initialType = "regular",
  initialMembers = defaultMembers,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialName);
  const [type, setType] = useState(initialType);
  const [members, setMembers] = useState(initialMembers);

  useEffect(() => {
    setName(initialName);
    setType(initialType);
    setMembers(initialMembers);
  }, [initialName, initialType, initialMembers]);

  const nameChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({ name, type, members });
    },
    [name, type, members, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={styles.formInput}
        type="text"
        name="name"
        placeholder="Name"
        autoComplete="off"
        value={name}
        onChange={nameChanged}
        required
      />
      <MemberSelect className={styles.formInput} setMembers={setMembers} defaultValue={members} />
      <DutyTypeSelect className={styles.formInput} type={type} onChange={setType} />
      <div className={styles.actionButton}>
        <Button variant="filled" type="submit" fullWidth>
          {mode === "edit" ? "Save" : "Add"}
        </Button>
        <Button variant="filled" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
