import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface Props {
  error: string | null;
  children?: React.ReactNode;
}

const FormControlWithError: React.FC<Props> = ({ error, children }) => {
  return (
    <FormControl error={!!error}>
      <div style={{ padding: 10 }}>
        {children}
        {error && <FormHelperText>{error}</FormHelperText>}
      </div>
    </FormControl>
  );
};

export default FormControlWithError;
