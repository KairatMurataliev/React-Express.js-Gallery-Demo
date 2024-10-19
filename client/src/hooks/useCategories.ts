import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {getCategoriesList} from "../store/categories/categoryThunk.ts";
import {selectCategoriesList} from "../store/categories/categorySlice.ts";

export const useCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector(selectCategoriesList);

  const onCategorySelect = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(id);
    }
  };

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  return {
    categoriesList,
    selectedCategory,
    onCategorySelect,
    dispatch,
  }
}