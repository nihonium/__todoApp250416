// * 参考サイト
// * https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started
// * https://qiita.com/toraaa/items/20a68915227a08820805

import { nanoid } from "nanoid";
import { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [filter, setFilter] = useState("すべて");
  const FILTER_MAP = {
    "すべて": () => true,
    "残タスク": (task) => !task.completed,
    "完了タスク": (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      inPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // このタスクが編集されたタスクと同じ ID を持っている場合
      if (id === task.id) {
        // オブジェクトを開いて、 `completed` プロップが
        // 反転された新しいオブジェクトを作成します。
        return { ...task, completed: !task.completed};
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
  }

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
    localStorage.setItem("tasks", JSON.stringify(editedTaskList));
  }

  const [tasks, setTasks] = useState(props.tasks);
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      dueDate={task.dueDate}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // タスクの数に応じて、名詞を変更する
  const headingText = (taskList.length !== 0) ? `${taskList.length} つ` : "タスクはありません";

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;