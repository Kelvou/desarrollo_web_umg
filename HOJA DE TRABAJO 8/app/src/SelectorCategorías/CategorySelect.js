import React from 'react';
import Select from 'react-select';

function CategorySelect({ categories, selectedCategory, onChange }) {
  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <Select
      value={{ value: selectedCategory, label: selectedCategory }}
      options={[
        { value: 'Todos', label: 'Todos' },
        ...options,
      ]}
      onChange={(selectedOption) => onChange(selectedOption.value)}
    />
  );
}

export default CategorySelect;