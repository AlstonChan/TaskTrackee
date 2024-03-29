import styles from "$Styles/dashboard/dashboard.module.scss";

import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  dataIsFuture,
  dataIsLate,
  dataIsToday,
  dataIsTommorow,
  taskNotCompleted,
} from "$Lib/ReduxSlice/SupabaseTaskSlice";

import Divider from "$Components/Divider";
import TaskBar from "$Components/dashboard/TaskBar";

export default function AllTask() {
  const taskDataTdy = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsToday(task) && taskNotCompleted(task) && !dataIsLate(task))
        return task;
    })
  );
  const taskDataTmr = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsTommorow(task) && taskNotCompleted(task)) return task;
    })
  );
  const taskDataUpc = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsFuture(task) && taskNotCompleted(task)) return task;
    })
  );
  const taskDataLate = useSelector((state) =>
    state.taskData.value?.filter((task) => {
      if (dataIsLate(task) && taskNotCompleted(task)) return task;
    })
  );

  const [setToggleModal] = useOutletContext();

  return (
    <>
      <Helmet>
        <title>TaskTrackee | All Task</title>
      </Helmet>
      <article className={styles.mainTask}>
        {/* Today Section */}
        {taskDataTdy?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>
              Today ({new Date().toLocaleDateString("en-GB")})
            </h2>
            <Divider />
            {taskDataTdy.map((task) => (
              <TaskBar
                setTgMd={setToggleModal}
                data={task}
                key={task.id}
                date={"micro"}
              />
            ))}
          </section>
        ) : null}

        {/* Tommorow Section  */}
        {taskDataTmr?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>
              Tommorow (
              {new Date(
                new Date().setDate(new Date().getDate() + 1)
              ).toLocaleDateString("en-GB")}
              )
            </h2>
            <Divider />
            {taskDataTmr.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* Upcoming Section  */}
        {taskDataUpc?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>Upcoming</h2>
            <Divider />
            {taskDataUpc.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* Overdue Section  */}
        {taskDataLate?.length > 0 ? (
          <section className={styles.taskSection}>
            <h2 className={styles.sectionHead}>Overdue</h2>
            <Divider />
            {taskDataLate.map((task) => (
              <TaskBar setTgMd={setToggleModal} data={task} key={task.id} />
            ))}
          </section>
        ) : null}

        {/* No Task Matched  */}
        {taskDataTdy?.length === 0 &&
        taskDataTmr?.length === 0 &&
        taskDataUpc?.length === 0 &&
        taskDataLate?.length === 0 ? (
            <h2 className={styles.sectionHead}>No Task</h2>
          ) : null}
      </article>
    </>
  );
}
