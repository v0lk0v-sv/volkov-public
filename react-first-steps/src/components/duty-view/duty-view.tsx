import { DutyType } from "../../stores/types";
import { Button } from "@mantine/core";

interface DutyViewProps {
  duty: {
    id?: string;
    name: string;
    type: DutyType;
    members: string[];
  }
  onDelete: () => void;
  onEdit: () => void;
}

export const DutyView: React.FC<DutyViewProps> = ({
  duty,
  onDelete,
  onEdit,
}) => {
  return (
    <div>
      <div>
        <label>
          {`${duty.name} - ${duty.type} - ${duty.members.join(", ")}`}
        </label>
      </div>
      <div>
        <Button variant="default" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="default" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
