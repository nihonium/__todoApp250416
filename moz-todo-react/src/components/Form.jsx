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
        // プレースホルダーの表示/非表示を切り替え
        if (event.target.value) {
            placeholder.style.display = 'none';
        } else {
            placeholder.style.display = 'block';
        }

        const value = event.target.value;
        setDueDate(value);
    }

    const handleBlurName = (e) => {
        const error = validateForm(e.target.value);
        setNameError(error);
        if (error) return;
    };

    const handleBlurDate = (e) => {
        console.log("Date input blurred");
    };

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateForm(name);
        if (error) return setNameError(error);
        props.addTask(name, dueDate);
        setName("");
        setNameError('');
        setDueDate("");
    }

    // 日付入力欄のプレースホルダー設定
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded');
        const placeholder = document.querySelector('#placeholder');
        const dateInput = document.querySelector('#new-date-input');

        dateInput.addEventListener('focus', () => {
            placeholder.style.display = 'none';
        });
    });

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
                onBlur={handleBlurDate}
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