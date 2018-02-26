import React, { Component } from 'react'
import {
  Map,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';

import { MarkersList } from '../components';
import DonationsService, { loadDonations } from '../services/DonationsService';
import GeoService, { loadCountries } from '../services/GeoService';
import CountryDonationsList from '../models/CountryDonationsList';

import 'leaflet/dist/leaflet.css';

export default class CustomComponent extends Component {
  state = {
    lat: 7.94,
    lng: -1.02,
    zoom: 3,
  }

  componentDidMount() {
    loadCountries().then((data) => {
      const geoService = new GeoService(data)
      this.setState({ geoService: geoService })
    });
    loadDonations().then((data) => {
      const donationsService = new DonationsService(data)
      this.setState({ donationsService: donationsService })
    });
  }

  render() {
    if (!this.state.geoService) return null
    if (!this.state.donationsService) return null

    const month = this.props.month;
    const center = [this.state.lat, this.state.lng]
    const donations = this.state.donationsService.donationsByCountry(month);
    const markersList = new CountryDonationsList(donations, this.state.geoService);

    return (
      <Map
        className="App-map"
        center={center}
        zoom={this.state.zoom}
        minZoom={2}
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
        <MarkersList markers={markersList.markers.map((m) => m.toProps())} />
      </Map>
    )
  }
}
