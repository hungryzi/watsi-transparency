import React from 'react';
import markerExample from '../marker.png';
import './FAQ.css';

const FAQ = ({ isOpen, onClose }) => {
  let className = 'faq';
  if (isOpen) {
    className += ' open';
  }

  return (
    <div className={className}>
      <h3>
        ¿FAQ?
        <span className="faq__close app__action" onClick={onClose}>
          close
        </span>
      </h3>

      <h4>What is Watsi?</h4>
      <p>
        <a href="https://watsi.org">Watsi</a> is a nonprofit that connects
        people who have problems funding their surgeries with donors around the
        world.
      </p>

      <h4>What is this map?</h4>
      <p>
        This map shows{' '}
        <a href="https://docs.google.com/spreadsheets/d/1tZq47h6jg7NX4ddhTS_H8JFVfLZiDbxwwdQD47_ow64/edit#gid=842368430">
          Watsi's donations
        </a>{' '}
        in the selected month, grouped by countries. For each country, the size
        of its blue circle is correlated to the number of patients and the
        opacity to the amount of donation.
        <br />
        <img src={markerExample} />
      </p>

      <h4>Where can I find the code?</h4>
      <p>
        It's <a href="https://github.com/hungryzi/watsi-transparency">here</a>
        .
      </p>
    </div>
  );
};

export default FAQ;
