import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chip } from "@material-ui/core";

export const InputComponent = ({ value, onChange, label, placeholder, className, type, size, options, optionType, optionLabelPath, groupLabelPath, variant = 'outlined' }) => {

  const getPropertyByPath = (path, obj) => {
    if (!path) return undefined;
    const properties = Array.isArray(path) ? path : path.split('.')
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }

  return (
    <div className={`w-100 mt-1 ${className}`}>
      { type === 'text' ? 
        <TextField 
          fullWidth
          size={size}
          value={value}
          label={label}
          placeholder={placeholder}
          variant={variant !== 'raw' ? variant : undefined}
          inputProps={{ style: { textOverflow: 'ellipsis' }}}
          onChange={event => onChange({ value: event.target.value })}
        />
        : type === 'code' ? 
        <TextField
          fullWidth
          multiline
          rows={10}
          rowsMax={20}
          size={size}
          placeholder={placeholder}
          variant={variant !== 'raw' ? variant : undefined}
          label={label}
          value={value}
          onChange={event => onChange({ value: event.target.value })}
        />
        : (type === 'options' || type === 'output') ?
        <Autocomplete
          openOnFocus
          autoHighlight
          blurOnSelect
          options={options}
          noOptionsText={'Nenhum opção disponível :('}
          filterOptions={options => options}
          inputValue={value}
          getOptionLabel={option => getPropertyByPath(`${optionLabelPath}`, option)}
          groupBy={option => getPropertyByPath(groupLabelPath, option)} 
          onChange={(event, value) => onChange(value)}
          renderOption={option => !optionType ? getPropertyByPath(`${optionLabelPath}`, option) : optionType === 'chip' && (
            <Chip variant="outlined" label={getPropertyByPath(`${optionLabelPath}`, option)} />
          )}
          renderInput={params =>
            <TextField {...params} variant="outlined" label={label} placeholder={placeholder} size={size}/>
          }
        /> 
        : undefined }
    </div>
  );
};

export default InputComponent;
