import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AutocompleteFieldProps } from '../../interfaces';

import './autocomplete-field.scss';

const AutocompleteField: React.FC<AutocompleteFieldProps> = (props: AutocompleteFieldProps) => {
  const { data, focus, id, inputValue, isOpened, label, onChange, onInput, value } = props;

  return (
    <Autocomplete
      className="autocomplete"
      clearOnBlur={false}
      fullWidth
      getOptionLabel={(option) => option}
      id={id}
      inputValue={inputValue}
      onChange={(event, newValue) => onChange(newValue)}
      onInputChange={(event, newInputValue) => onInput(newInputValue)}
      open={isOpened}
      options={data}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            autoFocus={focus}
            label={label}
            size="small"
            variant="outlined"
          />
        )
      }}
      value={value}
    />
  )
}

export default AutocompleteField;
