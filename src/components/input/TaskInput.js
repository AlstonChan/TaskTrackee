import styles from "$Styles/input.module.scss";

import React from "react";

const TaskInput = React.forwardRef(({ id, placeholder, c, val }, ref) => {
  return (
    <>
      <div style={{ position: "relative", width: "100%" }}>
        <input
          id={id}
          ref={ref}
          className={`${styles.taskInput} ${c || ""}`}
          type="text"
          placeholder={placeholder}
          aria-required="true"
          required={false}
          autoComplete="off"
          defaultValue={val || ""}
          data-testid="taskInput"
        />
      </div>
    </>
  );
});

TaskInput.displayName = "TaskInput";
export default TaskInput;
