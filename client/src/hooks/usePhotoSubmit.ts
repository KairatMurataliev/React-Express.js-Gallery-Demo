import React, {useState} from "react";
import {PhotoMutation} from "../types";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {submitLoading} from "../store/gallery/gallerySlice.ts";
import {submitPhoto} from "../store/gallery/galleryThunk.ts";

export const usePhotoSubmit = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(submitLoading);

  const [error, setError] = useState<boolean>(false);
  const [submitOpen, setSubmitOpen] = useState<boolean>(false);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title || !state.image) return setError(true);

    await dispatch(submitPhoto(state)).unwrap();
    handleOpenModal();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState((prevState) => {
      return {...prevState, [name]: value};
    });
    setError(false);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
    setError(false);
  };

  const handleOpenModal = () => setSubmitOpen(prev => !prev);

  return {
    state,
    submitOpen,
    error,
    loading,
    handleOpenModal,
    submitFormHandler,
    inputChangeHandler,
    fileInputChangeHandler,
  }
}