import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {selectLoginError} from "../store/users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {LoginMutation} from "../types";
import {login} from "../store/users/usersThunk.ts";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return {
    state,
    error,
    inputChangeHandler,
    submitFormHandler
  }
}