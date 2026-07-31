import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';

export const TaskSummary = () => {
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    overdue: 0,
    dueToday: 0,
  });

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .where('archived', '==', false)
      .onSnapshot((snapshot) => {
        const tasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        const today = moment().format('DD/MM/YYYY');
        let overdue = 0;
        let dueToday = 0;

        tasks.forEach((task) => {
          if (task.date) {
            const taskDate = moment(task.date, 'DD/MM/YYYY');
            const todayDate = moment(today, 'DD/MM/YYYY');

            if (taskDate.isBefore(todayDate, 'day')) {
              overdue++;
            } else if (taskDate.isSame(todayDate, 'day')) {
              dueToday++;
            }
          }
        });

        setTaskCounts({
          total: tasks.length,
          overdue,
          dueToday,
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <div className="task-summary" data-testid="task-summary">
      <div className="task-summary__item" data-testid="task-summary-total">
        <span className="task-summary__label">Total Tasks:</span>
        <span className="task-summary__count">{taskCounts.total}</span>
      </div>
      <div className="task-summary__item" data-testid="task-summary-overdue">
        <span className="task-summary__label">Overdue:</span>
        <span className="task-summary__count task-summary__count--overdue">
          {taskCounts.overdue}
        </span>
      </div>
      <div className="task-summary__item" data-testid="task-summary-due-today">
        <span className="task-summary__label">Due Today:</span>
        <span className="task-summary__count task-summary__count--due-today">
          {taskCounts.dueToday}
        </span>
      </div>
    </div>
  );
};
