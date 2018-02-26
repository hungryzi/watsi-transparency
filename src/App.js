import React, { Component } from 'react';
import Typography from 'typography';
import theme from 'typography-theme-st-annes';
import {Helmet} from "react-helmet";

import { FAQ, Header, Map, Nav } from './components';
import DonationsService, { loadDonations } from './services/DonationsService';
import { toFilterString } from './utils';
import './App.css';

const typography = new Typography(theme);

class App extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.state = {
      selectedMonth: toFilterString(year, month),
      isFAQopen: false,
    }
  }

  filterByMonth(month) {
    this.setState({ selectedMonth: month });
  }

  openFAQ() {
    this.setState({ isFAQopen: true });
  }

  closeFAQ() {
    this.setState({ isFAQopen: false });
  }

  componentDidMount() {
    loadDonations().then((data) => {
      const donationsService = new DonationsService(data)
      this.setState({ donationsService: donationsService })
    });
  }

  getDonations() {
    return this.state.donationsService ?
      this.state.donationsService.donationsByCountry(this.state.selectedMonth) : [];
  }

  render() {
    const donations = this.getDonations();
    const totalAmount = donations.reduce((sum, d) => sum + d.totalAmount, 0);
    const countriesCount = donations.length;

    return (
      <div className="App">
        <Helmet>
          <title>Watsi's Transparency</title>
          <style>{typography.toString()}</style>
        </Helmet>
        <Header
          openFAQ={this.openFAQ.bind(this)}
        >
          <Nav
            selectedMonth={this.state.selectedMonth}
            filterByMonth={this.filterByMonth.bind(this)}
            totalAmount={totalAmount}
            countriesCount={countriesCount}
          />
        </Header>
        <FAQ
          isOpen={this.state.isFAQopen}
          onClose={this.closeFAQ.bind(this)}
        />
        <Map
          donations={donations}
        ></Map>
      </div>
    );
  }
}

export default App;
