import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function TopicsSelect({data}) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      getOptionLabel={option => option.name}
      sx={{ width: 300 }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          fullWidth={true}
          {...params}
          label="Topic"
          variant={"standard"}
        />
      )}
    />
  );
}

