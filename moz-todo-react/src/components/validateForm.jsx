const validateForm = (value) => {
    if (!value) return '値を入力してください。';
    if (value.length > 15) return '15文字以内で入力してください';
    return '';
}

export default validateForm;