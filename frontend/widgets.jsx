import React from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from './auto';

const Players = {
  'Stephen Curry': 201939,
  'John Wall': 202322,
  'Klay Thompson': 202691,
  'Kyrie Irving': 202681,
  'Kevin Durant': 201142,
  'Gordon Hayward': 202330
};

class Root extends React.Component {
  render() {
    return (
      <div>
        hey there
        <AutoComplete players={Players} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('main'));
});
