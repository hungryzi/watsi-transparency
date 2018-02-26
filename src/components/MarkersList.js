import PropTypes from 'prop-types';
import React from 'react';
import { CountryCircle } from '.';

const MarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => {
    return <CountryCircle key={key} {...props} />;
  });
  return <div>{items}</div>;
};
MarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
};

export default MarkersList;
