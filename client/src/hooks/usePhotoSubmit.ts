import React, {useState} from "react";
import {PhotoMutation} from "../types";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {submitLoading} from "../store/gallery/gallerySlice.ts";
import {submitPhoto} from "../store/gallery/galleryThunk.ts";
import {SelectChangeEvent} from "@mui/material";
import {selectCategoriesList} from "../store/categories/categorySlice.ts";

export const usePhotoSubmit = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(submitLoading);
  const categoriesList = useAppSelector(selectCategoriesList);

  const [error, setError] = useState<boolean>(false);
  const [submitOpen, setSubmitOpen] = useState<boolean>(false);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    description: '',
    category: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title || !state.image) return setError(true);

    const category = categoriesList.find(({ name }) => name === state.category);

    if (category) {
      const data = {
        title: state.title,
        description: state.description,
        category: category.id,
        image: state.image
      }

      await dispatch(submitPhoto(data));
      handleToggleModal();
    }
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

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setState(prev => ({...prev, category: e.target.value}))
  }

  const handleToggleModal = () => setSubmitOpen(prev => !prev);

  return {
    state,
    submitOpen,
    error,
    loading,
    handleToggleModal,
    submitFormHandler,
    inputChangeHandler,
    fileInputChangeHandler,
    handleCategoryChange
  }
}