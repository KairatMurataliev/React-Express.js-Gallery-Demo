import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {Category} from "../../../types";

interface Props {
  categoriesList: Category[];
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

export const CategoriesFilters: React.FC<Props> = ({categoriesList, selectedCategory, onCategorySelect}) => {
  return (
    <ButtonGroup style={{ marginBottom: 20 }} variant="outlined" aria-label="Basic button group">
      {categoriesList.map(({name, id}) => (
        <Button
          key={id}
          onClick={() => onCategorySelect(id)}
          variant={selectedCategory && selectedCategory === id ? 'contained' : 'outlined'}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  )
};