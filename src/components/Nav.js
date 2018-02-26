import React, { Component } from 'react';
import { toFilterString, formatCurrency } from '../utils';
import './Nav.css';

const FOUNDING_YEAR = 2013;
const FOUNDING_MONTH = 5;

function filterOptions() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  const options = [];
  while (year >= FOUNDING_YEAR) {
    const yearOptions = { year: year, months: [] };
    while (month >= (year === FOUNDING_YEAR ? FOUNDING_MONTH : 1)) {
      yearOptions.months.push(month);

      month--;
    }
    options.push(yearOptions);

    month = 12;
    year--;
  }

  return options;
}

class Nav extends Component {
  render() {
    const { selectedMonth, totalAmount, countriesCount } = this.props;
    return (
      <div className="app__nav">
        <div className="nav__container">
          <ul className="nav__years">
            {filterOptions().map(({ year, months }, yearIndex) => {
              return (
                <li key={yearIndex} className="nav__year">
                  <span>{year}</span>
                  <ul className="nav__months">
                    {months.map((month, index) => {
                      const filterMonth = toFilterString(year, month);
                      return (
                        <li className="nav__month" key={index}>
                          {filterMonth === this.props.selectedMonth ? (
                            <span className="app__watsi">{month}</span>
                          ) : (
                            <span
                              className="app__action"
                              onClick={() =>
                                this.props.filterByMonth(filterMonth)
                              }
                            >
                              {month}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav__intro">
          In <span className="app__watsi">{selectedMonth}</span>
          , Watsi's users funded {formatCurrency(totalAmount)} to patients in{' '}
          {countriesCount} countries.
        </div>
      </div>
    );
  }
}

export default Nav;
