import { useState } from "react";
import validateForm from "./validateForm";

function Form(props) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState('');
    const [dueDate, setDueDate] = useState("");

    function handleChangeName(event) {
        const value = event.target.value;
        setName(value);
        setNameError(validateForm(value));
    }

    function handleChangeDate(event) {
        const placeholder = document.querySelector('#placeholder');
        const value = event.target.value;
        // プレースホルダーの表示/非表示を切り替え
        if (value) {
            placeholder.style.display = 'none';
        } else {
            placeholder.style.display = 'block';
        }
        setDueDate(value);
    }

    const handleBlurName = (e) => {
        const error = validateForm(e.target.value);
        setNameError(error);
        if (error) return;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateForm(name);
        if (error) return setNameError(error);
        props.addTask(name, dueDate);
        setName("");
        setNameError('');
        setDueDate("");
        document.querySelector('#placeholder').style.display = 'block'; // プレースホルダーを表示
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                今日は何をしますか？
            </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onBlur={handleBlurName}
                onChange={handleChangeName}
                placeholder="タスクを15文字以内で入力してください"
            />
            <input
                type="date"
                id="new-date-input"
                className="input input__lg"
                value={dueDate}
                onChange={handleChangeDate}
                min={new Date().toISOString().split("T")[0]} // 今日の日付を最小値に設定
            />
            <span id="placeholder">任意で期限を指定できます</span>
            {nameError && <p>{nameError}</p>}
            <button type="submit" className="btn btn__primary btn__lg" disabled={nameError}>
                追加
            </button>
      </form>
    );
}

export default Form;