import React from 'react'
import {
  CircleMarker,
  Popup,
  PropTypes as MapPropTypes,
} from 'react-leaflet';

const CountryCircle = ({children, position, radius, opacity, name, color}) => {
  return <CircleMarker
    center={position}
    color='red'
    fillColor={color}
    fillOpacity={opacity}
    radius={radius}
  >
    <Popup>
      <span>{children}</span>
    </Popup>
  </CircleMarker>;
};

CountryCircle.propTypes = {
  children: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

export default CountryCircle;
