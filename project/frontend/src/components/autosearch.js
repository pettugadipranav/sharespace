import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Stack from '@mui/material/Stack';
// import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// console.log("1234567890");

export default function Sizes() {
  return (
    <Stack spacing={2} sx={{ width: 500 }}>

      {/* <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Size small"
            placeholder="Favorites"
          />
        )}
      /> */}
   
      <Autocomplete
        multiple
        id="size-small-outlined-multi"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField {...params} label="Size small" placeholder="Favorites" />
        )}
      />

      {/* <Autocomplete
        multiple
        id="size-small-filled-multi"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.title}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Size small"
            placeholder="Favorites"
          />
        )}
      /> */}
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
];