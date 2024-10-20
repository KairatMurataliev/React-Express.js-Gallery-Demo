import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {selectRegisterError} from "../store/users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {RegisterMutation} from "../types";
import {register} from "../store/users/usersThunk.ts";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    username: '',
    avatar: null,
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return {
    state,
    inputChangeHandler,
    fileInputChangeHandler,
    submitFormHandler,
    getFieldError,
  }
}