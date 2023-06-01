import React from 'react';
import { FormRow } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useUserContext } from '../context/user_context';

const SearchContainerStats = () => {
  const { startDateStr, endDateStr, handleChange } = useUserContext();

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="date"
            name="startDateStr"
            labelText="Start Date"
            value={startDateStr}
            handleChange={handleSearch}
          />

          <FormRow
            type="date"
            name="endDateStr"
            labelText="End Date"
            value={endDateStr}
            handleChange={handleSearch}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainerStats;
