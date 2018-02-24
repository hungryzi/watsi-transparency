import { csv } from 'd3-fetch';

export function loadCountries() {
  return csv('/countries.csv').then((data) => {
    return data.map((country) => ({
      name: country.name.toLowerCase(),
      longitude: parseFloat(country.longitude),
      latitude: parseFloat(country.latitude),
      code: country.country
    }));
  });
}

export default class GeoService {
  constructor(countries) {
    this.countries = countries;
  }

  getCenter(countryName) {
    const country = this.countries.find((country) => {
      return country.name === countryName.toLowerCase();
    });

    if (country) {
      return [country.latitude, country.longitude];
    } else {
      return [0, 0];
    }
  }
}
