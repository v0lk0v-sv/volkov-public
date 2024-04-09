import { MultiSelect } from "@mantine/core";
import { useStore } from "@nanostores/react";

import { useCallback, useEffect, useState } from "react";
import { $users } from "../../stores/duties-store";

interface MemberSelectProps {
  className?: string;
  setMembers: (members: string[]) => void;
  defaultValue?;
}

export const MemberSelect: React.FC<MemberSelectProps> = ({
  className,
  setMembers,
  defaultValue,
}) => {
  const users = useStore($users);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChange = useCallback(
    (values: string[]) => {
      setMembers(values);
      setValue(values);
    },
    [setMembers]
  );

  return (
    <MultiSelect
      className={className}
      data={users.map((user) => user.login)}
      placeholder="Select users"
      clearable
      searchable
      onChange={onChange}
      value={value}
    ></MultiSelect>
  );
};
