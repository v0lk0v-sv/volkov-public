import { useCallback, useState } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@mantine/core";
import { Timeline, TimelineRowsPage } from "@av/timeline";

import { switchToEditMode, $dutiesWithDates } from "../../stores/duties-store";

import "@av/timeline/dist/style.css";
import styles from "./duty-timeline.module.css";

function renderSidebarRowContent({ row, expanded }) {
  console.log(row);
  const handleEditClick = useCallback(() => {
    switchToEditMode(row.id);
  }, [row.id]);

  if ("children" in row) {
    return (
      <div className={styles.sidebarRow}>
        {`${row.title}`}
        {expanded && (
          <Button variant="transparent" className={styles.editButton} size="xs" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </div>
    );
  } else {
    return <div className={styles.sidebarRow}>{`${row.title}`}</div>;
  }
}

const COLORS = [
  "#8675DC",
  "#F53D2A",
  "#EAAA08",
  "#119917",
  "#0590AF",
  "#2A84E9",
];

const ROW_SEPARATOR = '/';

export function DutyTimeline() {
  const duties = useStore($dutiesWithDates);

  const [viewRangeStr, setViewRange] = useState("");

  const onChangeViewRange = useCallback(
    (range: readonly [number, number]) => {
      const [start, end] = range;

      setViewRange(`${Math.round(start / 1000)}-${Math.round(end / 1000)}`);
    },
    [setViewRange]
  );

  const getRows = useCallback((): TimelineRowsPage => {
    const rows = duties.map((duty) => ({
      id: duty.id,
      title: duty.name,
      children: duty.members.map((user) => ({
        id: `${duty.id}${ROW_SEPARATOR}${user}`,
        title: user,
      })),
      defaultExpanded: true,
      noEvents: true,
    }));

    return {
      data: rows,
      count: rows.length,
      offset: 0,
      totalCount: rows.length,
    };
  }, [duties]);

  const getEvents = useCallback(
    (rowId: string) => {
      const [dutyId, userId] = rowId.split(ROW_SEPARATOR);

      const duty = duties.find(
        (duty) => duty.id === dutyId
      );

      if (!duty || !userId) {
        return [];
      }

      // const {
      //   members: childrens,
      //   duty_type,
      //   duty_length,
      //   duty_change_day,
      // } = dutyWithGivenSlackGroupId;


      const rowsIds = duties.flatMap((duty) => duty.members.map((member) => `${duty.id}${ROW_SEPARATOR}${member}`));
      const memberIndex = rowsIds.findIndex((id) => id === rowId);

      const colorIndex = memberIndex % COLORS.length;
      const color = COLORS[colorIndex];
      const colorWithB0 = color + "B0";

      return duty.duty_dates[userId].map((item, index) => ({
        id: `${rowId}${index}`,
        start: item.start,
        end: item.end,
        color: color,
        highlightColor: colorWithB0,
      }));
    },
    [duties]
  );

  return (
    <Timeline
      getRows={getRows}
      getEvents={getEvents}
      renderSidebarRowContent={renderSidebarRowContent}
      onChangeViewRange={onChangeViewRange}
      showScaleController={false}
    />
  );
}
