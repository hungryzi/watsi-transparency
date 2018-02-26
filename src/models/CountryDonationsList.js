import CountryDonation from './CountryDonation';
const MAX_COLOR = '#ff0000';
const MAX_SIZE = 400;

export default class CountryDonationList {
  constructor(countryDonations, geoService) {
    let maxDonationCounts = 0;
    let maxTotalAmount = 0;

    this.markers = countryDonations.map(c => {
      if (maxTotalAmount < c.totalAmount) {
        maxTotalAmount = c.totalAmount;
      }

      if (maxDonationCounts < c.donationsCount) {
        maxDonationCounts = c.donationsCount;
      }

      const center = geoService.getCenter(c.name);
      return new CountryDonation(
        this,
        c.name,
        c.donationsCount,
        c.totalAmount,
        center
      );
    });

    this.maxTotalAmount = maxTotalAmount;
    this.maxDonationCounts = maxDonationCounts;
  }

  normalizeColor(amount) {
    return MAX_COLOR;
  }

  normalizeOpacity(amount) {
    return amount / this.maxTotalAmount * 0.8 + 0.2;
  }

  normalizeSize(count) {
    const ratio = count / this.maxDonationCounts;
    return Math.sqrt(MAX_SIZE * ratio);
  }
}
