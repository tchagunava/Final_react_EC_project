import { Button, FormControl, TextField, } from "@mui/material";
import { useForm } from "../../application/hooks/useForm";
import React from "react";
import { useDispatch } from "react-redux";
import { authentificateUser } from "../../redux";
import { useNavigate } from "react-router-dom";


const generateLoginFormValues = () => {
    return {
        email: {
            value: "",
            required: true,
            error: null,
            validateInput: (email) =>
                email.includes("@") ? null : "email should include @ key",
        },
        password: {
            value: "",
            required: true,
            error: null,
            validateInput: (password) =>
                password.length > 6 ? null : "password should be at least from 6 character",
        },

    };
};

export const LoginForm = () => {
    const { formValues: loginFormValues, onInputChange } = useForm({
        defaultFormValues: generateLoginFormValues(),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault()
        const email = loginFormValues.email.value;
        const password = loginFormValues.password.value;
        dispatch(
            authentificateUser({
                isLogin: true,
                formValues: {
                    email,
                    password,
                },
            })
        )
            .unwrap()
            .then(() => navigate("/"));
    };

    return (
        <FormControl>
            <TextField
                name="email"
                label="email"
                value={loginFormValues.email.value}
                onChange={onInputChange}
                error={!!loginFormValues.email.error}
                helperText={loginFormValues.email.error}

            />
            <TextField
                name="password"
                label="password"
                type="password"
                value={loginFormValues.password.value}
                onChange={onInputChange}
                error={!!loginFormValues.password.error}
                helperText={loginFormValues.password.error}
            />
            <Button onClick={onLogin}>login</Button>
        </FormControl>
    );
};
