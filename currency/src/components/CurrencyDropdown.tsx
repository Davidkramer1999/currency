import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

type CurrencyDropdownProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  options: { key: number; value: string }[];
  disabled?: boolean;
};

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ label, value, onChange, options, disabled }) => {
  return (
    <FormControl>
      <div>
        <InputLabel id="currency-select-label">{label}</InputLabel>
        <Select
          style={{ width: "200px" }}
          labelId="currency-select-label"
          id="currency-select"
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};

export default CurrencyDropdown;
