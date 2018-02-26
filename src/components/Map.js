import React, { Component } from 'react'
import {
  Map,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import { MarkersList } from '../components';
import GeoService, { loadCountries } from '../services/GeoService';
import CountryDonationsList from '../models/CountryDonationsList';

import 'leaflet/dist/leaflet.css';

export default class CustomComponent extends Component {
  state = {
    lat: 12.56,
    lng: 104.99,
    zoom: 3,
  }

  componentDidMount() {
    loadCountries().then((data) => {
      const geoService = new GeoService(data)
      this.setState({ geoService: geoService })
    });
  }

  getMarkers() {
    if (!this.state.geoService) return [];

    const markersList = new CountryDonationsList(this.props.donations, this.state.geoService);
    return markersList.markers.map((m) => m.toProps())
  }

  render() {
    const center = [this.state.lat, this.state.lng]

    return (
      <Map
        className="app__map"
        center={center}
        zoom={this.state.zoom}
        minZoom={1}
        maxZoom={5}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution="Map data &amp;copy; &lt;a href=&quot;http://openstreetmap.org&quot;&gt;OpenStreetMap&lt;/a&gt; contributors, &lt;a href=&quot;http://creativecommons.org/licenses/by-sa/2.0/&quot;&gt;CC-BY-SA&lt;/a&gt;, Imagery &copy; &lt;a href=&quot;http://mapbox.com&quot;&gt;Mapbox&lt;/a&gt;"
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id='mapbox.light'
          accessToken='pk.eyJ1IjoiaHVuZ3J5emkiLCJhIjoiY2pkeHpsdHp4MHJlOTJ4cWk2YTNhYXFwbiJ9.48mv64wKc__CuU8sjBHQfA'
        />
        <MarkersList markers={this.getMarkers()} />
      </Map>
    )
  }
}
