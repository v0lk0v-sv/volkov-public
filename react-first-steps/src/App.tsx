import { useCallback } from "react";
import { useStore } from "@nanostores/react";
import { Button } from "@mantine/core";

import { DutyFormResult, Form } from "./components/form/form";
import {
  $appDisplayMode,
  addDuty,
  switchToCreateMode,
  switchToViewMode,
} from "./stores/duties-store";
import { DutyTimeline } from "./features/duty-timeline/duty-timeline";
import { DutyEdit } from "./components/duty-edit/duty-edit";

import "@mantine/core/styles.css";
import styles from "./App.module.css";


const App: React.FC = () => {
  const displayMode = useStore($appDisplayMode);

  const onAddSubmit = useCallback(({ name, type, members }: DutyFormResult) => {
    addDuty(name, type, members);
    switchToViewMode();
  }, []);

  return (
    <div className={styles.appContainer}>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <DutyTimeline />
        </div>
        <div className={styles.fixedRightSideBar}>
          <Button variant="filled" onClick={switchToCreateMode}>
            Create Duty
          </Button>
        </div>
      </div>

      {displayMode !== "view" && (
        <div className={styles.sideBar}>
          {displayMode === "edit" && <DutyEdit />}
          {displayMode === "create" && (
            <Form
              mode="create"
              onSubmit={onAddSubmit}
              onCancel={switchToViewMode}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
