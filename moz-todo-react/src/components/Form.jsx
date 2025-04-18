import { useState } from "react";
// import { useForm } from 'react-hook-form';

function Form(props) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState('')

    const validateName = (value) => {
        if (!value) return '値を入力してください。';
        if (value.length > 15) return '15文字以内で入力してください';
        return '';
    }

    function handleChange(event) {
        const value = event.target.value;
        setName(value);
        setNameError(validateName(value));
    }

    const handleBlur = (e) => {
        const error = validateName(e.target.value);
        setNameError(error);
        if (error) return;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateName(name);
        if (error) {
            setNameError(error);
            return;
        }
        props.addTask(name);
        setName("");
        setNameError('');
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
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="タスクを入力してください"
            />
            {nameError && <p>{nameError}</p>}
            <button type="submit" className="btn btn__primary btn__lg" disabled={nameError}>
                追加
            </button>
      </form>
    );
}

export default Form;