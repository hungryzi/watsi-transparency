import { json } from 'd3-fetch';

const DONATIONS_URL = 'https://dataclips.heroku.com/xgxgumjxzkzcagmgzegejyrebswx.json'

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function loadDonations() {
  return json(DONATIONS_URL).then((data) => {
    const fields = data.fields.map((field) => field.toLowerCase().replace(' ', '_'));
    return data.values.map((row) => {
      return fields.reduce((record, field, index) => {
        switch (field) {
          case 'cost':
            record[field] = parseFloat(row[index].replace('$', '').replace(',', ''));
            break;
          default:
            record[field] = row[index];
        }
        return record;
      }, {});
    });
  });
}

export default class DonationsService {
  constructor(donations) {
    this.donations = donations;
  }

  donationsByCountry(month) {
    const groupedByCountry = groupBy(this.donations.filter((d) => {
      return d.date_funded && d.date_funded.startsWith(month);
    }), (donation) => donation.country);

    return [...groupedByCountry.keys()].map((key) => {
      const donations = [...groupedByCountry.get(key)];
      return {
        name: key,
        donationsCount: donations.length,
        totalAmount: donations.reduce((sum, d) => sum + d.cost, 0)
      }
    });
  }
}
