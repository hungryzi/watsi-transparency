import React from 'react'
import { formatCurrency } from '../utils';

export default class CountryDonation {
  constructor(list, name, donationsCount, totalAmount, center) {
    this.name = name;
    this.list = list;
    this.donationsCount = donationsCount;
    this.totalAmount = totalAmount;
    this.center = center;
  }

  key() {
    return this.name;
  }

  position() {
    return this.center;
  }

  size() {
    return this.list.normalizeSize(this.donationsCount)
  }

  color() {
    return this.list.normalizeColor(this.totalAmount)
  }

  opacity() {
    return this.list.normalizeOpacity(this.totalAmount)
  }

  children() {
    return <div>
      <p><strong>{this.name}</strong></p>
      <p>{this.donationsCount} patients</p>
      <p>{formatCurrency(this.totalAmount)} funded</p>
    </div>;
  }

  toProps() {
    return { key: this.key(), children: this.children(), position: this.position(), opacity: this.opacity(), radius: this.size() };
  }
}
