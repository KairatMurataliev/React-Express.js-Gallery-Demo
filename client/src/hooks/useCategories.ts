import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/store-hooks.ts";
import {getCategoriesList} from "../store/categories/categoryThunk.ts";
import {selectCategoriesList} from "../store/categories/categorySlice.ts";

export const useCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const dispatch = useAppDispatch();
  const categoriesList = useAppSelector(selectCategoriesList);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  const onCategorySelect = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(id);
    }
  };

  return {
    categoriesList,
    selectedCategory,
    onCategorySelect,
    dispatch,
  }
}