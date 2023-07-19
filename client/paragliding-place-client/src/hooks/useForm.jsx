import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));

    };

    const onSubmit = (e) => {

        e.preventDefault();

        onSubmitHandler(values);

        setValues(initialValues);
    };

    const changeValues = (newValues) => {
        setValues(newValues);
    }

    // This is for login with enter
    const keyDownHandler = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmitHandler(values);
            setValues(initialValues);
        }
    }

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
        keyDownHandler,
    };
};