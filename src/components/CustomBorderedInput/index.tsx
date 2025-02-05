import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import { Login } from '@mui/icons-material';

const CustomInput = () => {
  return (
    <InputBase
      placeholder="Search"
      sx={() => ({
        border: '1px solid grey',
        borderRadius: '10px',
        padding: '0.4rem 0.8rem',
        fontSize: '0.875rem',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        '&:focus': {
          outline: 'none',
          border: '1px solid grey',
        },
        '& .MuiInputBase-input': {
          padding: '0.4rem 0.8rem',
          height: '100%',
          flex: 1,
        },
      })}
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <Login />
        </InputAdornment>
      }
    />
  );
};

export default CustomInput;
