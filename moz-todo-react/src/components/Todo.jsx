import { useState } from "react";
import validateForm from "./validateForm";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState('');
  const [dueDate, setDueDate] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
    setName(value);
    setNameError(validateForm(value));
  }

  const handleBlur = (e) => {
      const error = validateForm(e.target.value);
      setNameError(error);
      if (error) return;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const error = validateForm(newName);
    if (error) return setNameError(error);
    props.editTask(props.id, newName, dueDate);
    setNewName("");
    setDueDate("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          現在のタスク名：{props.name}
        </label>
        <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="タスクを15文字以内で入力してください"
        />
        {nameError && <p>{nameError}</p>}
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          キャンセル
          <span className="visually-hidden">名前を変更する： {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          保存
          <span className="visually-hidden">現在のタスク名：{props.name}</span>
        </button>
      </div>
    </form>
  );

  // 期限切れ処理
  // 過去の日付が設定されている場合、赤色で表示
  const isOverdue = new Date(props.dueDate) < new Date() && !props.completed;

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
          <span className="todo-label__due-date" style={{color: isOverdue ? 'red' : 'inherit'}}>
            {props.dueDate ? `期限：${props.dueDate}` : "期限なし"}
          </span>
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          編集する <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          削除 <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
export default Todo;
