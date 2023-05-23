import React, { useEffect } from 'react';
import { Loading, Param } from '../../components';
import { useUserContext } from '../../context/user_context';
import { Link } from 'react-router-dom';

const SettingPage = () => {
  const { isLoading, isError, getParams, params } = useUserContext();

  useEffect(() => {
    getParams();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h4 style={{ textTransform: 'none' }}>There was an error...</h4>;
  }

  if (params.length < 1) {
    return (
      <>
        <h4 style={{ textTransform: 'none' }}>No Parameters to display...</h4>
        <Link to="/add-param" className="btn btn-safe mg-left">
          Add Parameter
        </Link>
      </>
    );
  }
  return (
    <>
      <h5 className="inline">
        {params.length} Parameter
        {params.length > 1 && 's'} found
      </h5>
      <Link to="/add-param" className="btn btn-safe mg-left">
        Add Parameter
      </Link>
      <Param params={params} />
    </>
  );
};

export default SettingPage;
