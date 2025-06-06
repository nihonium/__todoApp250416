import { useState } from "react";
import validateForm from "./validateForm";
import DatePicker, { registerLocale } from "react-datepicker";
import { ja } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

function Form(props) {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    registerLocale('ja', ja);

    function handleChangeName(event) {
        const value = event.target.value;
        setName(value);
        setNameError(validateForm(value));
    }

    function handleChangeDate(date) {
        setSelectedDate(date);
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
        const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
        })
        : "";
        props.addTask(name, formattedDate);
        setName("");
        setNameError('');
        setSelectedDate(null);
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
            <DatePicker
                id="new-date-input"
                className="input input__lg"
                name="date"
                autoComplete="off"
                selected={selectedDate}
                onChange={handleChangeDate}
                dateFormat="yyyy/MM/dd"
                locale={ja}
                minDate={new Date()}
                placeholderText="任意で期限を指定できます"
            />
            {nameError && <p>{nameError}</p>}
            <button type="submit" className="btn btn__primary btn__lg" disabled={nameError}>
                追加
            </button>
      </form>
    );
}

export default Form;