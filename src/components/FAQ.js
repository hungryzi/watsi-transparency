import React from 'react'
import './FAQ.css';

const FAQ = ({ isOpen, onClose }) => {
  let className = "faq";
  if (isOpen) {
    className += " open";
  }

  return <div className={className}>
    <h3>
      ¿FAQ?
      <span className="faq__close app__action" onClick={onClose}>close</span>
    </h3>

    <h4>What is Watsi?</h4>
    <p>
      <a href="https://watsi.org">Watsi</a> is a nonprofit that connects people who have problems funding their surgeries with donors around the world.
    </p>

    <h4>What is this map?</h4>
    <p>This map shows Watsi's donations in a particular month (selected on the timeline)</p>

    <h4>Where can I find the code?</h4>
    <p>
      It's{' '}
      <a href="https://github.com/hungryzi/watsi-transparency">here</a>
      .
    </p>
  </div>;
};

export default FAQ;
