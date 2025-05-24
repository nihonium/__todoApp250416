import { useEffect, useState } from "react";
import validateForm from "./validateForm";
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setNewName(props.name);

      // props.selectedDate が存在すれば Date オブジェクトに変換
      if (props.selectedDate) {
        // 「〇〇年〇〇月〇〇日（〇）」という形式を Date に変換
        const cleanedDateStr = props.selectedDate.replace(/年|月/g, "-").replace(/日.*$/, "").replace(/[^\d-]/g, "");

        const [year, month, day] = cleanedDateStr.split("-").map(Number);
        const formattedDateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const parsedDate = new Date(formattedDateStr);

        if (!isNaN(parsedDate)) {
          setSelectedDate(parsedDate);
        }
      } else {
        setSelectedDate(null);
      }
    }
  }, [isEditing, props.selectedDate, props.name]);

  function handleChangeDate(date) {
    setSelectedDate(date);
  }

  function handleChange(e) {
    setNewName(e.target.value);
    setNameError(validateForm(e.target.value));
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
    const newSelectedDate = selectedDate
      ? selectedDate.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
      })
      : "";
    props.editTask(props.id, newName, newSelectedDate);
    setNewName("");
    setSelectedDate(null);
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          タスク名：{props.name}<br/>
          期限：{props.selectedDate ? props.selectedDate : "なし"}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onBlur={handleBlur}
          onChange={handleChange}
          onBeforeInput={handleChange}
          placeholder="タスク名を変更できます"
        />
        <DatePicker
          id={props.id + "new-date-input"}
          className="input input__edited-date"
          name="date"
          autoComplete="off"
          selected={selectedDate}
          onChange={handleChangeDate}
          dateFormat="yyyy/MM/dd"
          locale={ja}
          minDate={new Date()}
          placeholderText="期限を変更できます"
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
  function isOverdueSet() {
    // 曜日を除いて日付だけを抽出する（正規表現使用）
    const cleanedDateStr = props.selectedDate.replace(/年|月/g, '-').replace(/日.*$/, '').replace(/[^\d-]/g, '');

    // "2025-5-31" → "2025-05-31" に補正して ISO フォーマットに近づける
    const [year, month, day] = cleanedDateStr.split('-').map(Number);
    const formattedDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const targetDate = new Date(formattedDateStr);
    const today = new Date();

    // 時間を無視して日付だけで比較するため、両方の時刻を0時にリセット
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 過去の日付かどうかを判定
    const isOverdue = targetDate < today && !props.completed;
    return isOverdue;
  }

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
          <span className="todo-label__due-date" style={{color: isOverdueSet() ? 'red' : 'inherit'}}>
            {props.selectedDate ? `期限：${props.selectedDate}` : "期限なし"}
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
