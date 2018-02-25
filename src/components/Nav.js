import React, { Component } from 'react';

const FOUNDING_YEAR = 2013;
const FOUNDING_MONTH = 5;

function filterOptions() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  const options = [];
  while (year >= FOUNDING_YEAR) {
    const yearOptions = { year: year, months: [] }
    while(month >= (year == FOUNDING_YEAR ? FOUNDING_MONTH : 1)) {
      yearOptions.months.push(month)

      month--;
    }
    options.push(yearOptions);

    month = 12;
    year--;

  }

  console.log('options', options, year);
  return options;
}

class Nav extends Component {
  filterBy(filterMonth) {
    console.log(`filtering by ${filterMonth}`);
  }

  render() {
    return <div className="App-nav">
      <ul className="nav-years">
      {filterOptions().map(({ year, months }, yearIndex) => {
        return <li key={yearIndex} className='nav-year'>
                <span>{year}</span>
                <ul className='nav-months'>
                  {months.map((month, index) => {
                    const filterMonth = month > 9 ? `${year}-${month}` : `${year}-0${month}`;
                    return <li className='nav-month' key={index}>
                      <a href='#' onClick={() => this.filterBy(filterMonth)}>{month}</a>
                      </li>;
                  })}
                </ul>
              </li>;
      })}
      </ul>
      </div>;
  }
}

export default Nav;
