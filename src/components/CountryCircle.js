import React from 'react'
import {
  CircleMarker,
  Popup,
  PropTypes as MapPropTypes,
} from 'react-leaflet';

const WATSI_COLOR = '#5bb8ff';

const CountryCircle = ({children, position, radius, opacity, name, color}) => {
  return <CircleMarker
    center={position}
    color={WATSI_COLOR}
    weight={2}
    opacity={1}
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
