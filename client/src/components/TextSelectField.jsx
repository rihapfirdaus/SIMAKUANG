import React from "react";
import {
  TextField,
  Autocomplete,
  createFilterOptions,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default ({ label, value, setValue, options }) => {
  const filter = createFilterOptions();
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <Autocomplete
      size={breakpoint ? "medium" : "small"}
      value={value}
      onChange={(e, newValue) => {
        e.preventDefault();
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `tambah opsi "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} color="success" />
      )}
    />
  );
};
