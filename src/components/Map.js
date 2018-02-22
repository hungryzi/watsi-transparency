import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Map,
  TileLayer,
  CircleMarker,
  Popup,
  PropTypes as MapPropTypes,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const CountryCircle = ({children, position}) => (
  <CircleMarker
    center={position}
    color='red'
    fillColor='#f03'
    fillOpacity={0.5}
    radius={5}
  >
    <Popup>
      <span>{children}</span>
    </Popup>
  </CircleMarker>
);
CountryCircle.propTypes = {
  children: MapPropTypes.children,
  position: MapPropTypes.latlng,
}

const MarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <CountryCircle key={key} {...props} />
  ))
  return <div>{items}</div>
}
MarkersList.propTypes = {
  markers: PropTypes.array.isRequired,
}

export default class CustomComponent extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const center = [this.state.lat, this.state.lng]

    const markers = [
      { key: 'marker1', position: [51.5, -0.1], children: 'My first popup' },
      { key: 'marker2', position: [51.51, -0.1], children: 'My second popup' },
      { key: 'marker3', position: [51.49, -0.05], children: 'My third popup' },
    ]
    return (
      <Map className="App-map" center={center} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id='mapbox.satellite'
          accessToken='pk.eyJ1IjoiaHVuZ3J5emkiLCJhIjoiY2pkeHpsdHp4MHJlOTJ4cWk2YTNhYXFwbiJ9.48mv64wKc__CuU8sjBHQfA'
        />
        <MarkersList markers={markers} />
      </Map>
    )
  }
}
