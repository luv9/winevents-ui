import React from 'react';
import SearchIcon from '@mui/icons-material/Search';


const SearchBox = () => {

  return (
    <div >
      <input type="text" placeholder="Search.."/>
      <button type="submit"><SearchIcon /></button>
    </div>
  );
};

export default SearchBox;