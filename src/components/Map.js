import React, { Component } from 'react'
import {
  Map,
  TileLayer,
} from 'react-leaflet';

import { MarkersList } from '../components';
import DonationsService, { loadDonations } from '../services/DonationsService';
import GeoService, { loadCountries } from '../services/GeoService';
import CountryDonationsList from '../models/CountryDonationsList';

import 'leaflet/dist/leaflet.css';

export default class CustomComponent extends Component {
  state = {
    lat: -0.024,
    lng: 37.9,
    zoom: 3,
  }

  month = '2017-08';

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

    const center = [this.state.lat, this.state.lng]
    const donations = this.state.donationsService.donationsByCountry(this.month);
    const markersList = new CountryDonationsList(donations, this.state.geoService);

    return (
      <Map className="App-map" center={center} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}"
          id='mapbox.satellite'
          accessToken='pk.eyJ1IjoiaHVuZ3J5emkiLCJhIjoiY2pkeHpsdHp4MHJlOTJ4cWk2YTNhYXFwbiJ9.48mv64wKc__CuU8sjBHQfA'
        />
        <MarkersList markers={markersList.markers.map((m) => m.toProps())} />
      </Map>
    )
  }
}
