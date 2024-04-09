import { useCallback, useEffect, useState } from "react";
import { NativeSelect } from "@mantine/core";

import { DutyType } from "../../stores/types";

interface DutyTypeSelectProps {
  className: string;
  type: DutyType;
  onChange: (type: DutyType) => void;
}

export const DutyTypeSelect: React.FC<DutyTypeSelectProps> = ({
  className,
  type,
  onChange,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => {
      onChange(e.target.value as DutyType);
    },
    [onChange]
  );

  return (
    <NativeSelect className={className} onChange={onSelectChange} value={type}>
      <option value="regular">regular</option>
      <option value="weekly">weekly</option>
      <option value="weekdays">weekdays</option>
    </NativeSelect>
  );
};
