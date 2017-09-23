import React from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from './auto';

const Players = [
  'Stephen Curry',
  'John Wall',
  'Klay Thompson',
  'Kyrie Irving',
  'Kevin Durant',
  'Gordon Hayward'
];

const Panes = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second pane here'},
  {title: 'three', content: 'Third pane here'}
];

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
