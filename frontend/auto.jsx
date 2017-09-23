import React from 'react';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
    this.selectPlayer = this.selectPlayer.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value});
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return this.props.players;
    }

    this.props.players.forEach(player => {
      let sub = player.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(player);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  }

  selectPlayer(event) {
    let player = event.currentTarget.innerText;
    this.setState({inputVal: player});
  }

  render() {
    let results = this.matches().map((result, i) => {
      return (
        <li key={i} onClick={this.selectPlayer}>{result}</li>
      );
    });
    return(
      <div>
        <h1>Search Players</h1>
        <div className='auto'>
          <input
            onChange={this.handleInput}
            value={this.state.inputVal}
            placeholder='Player Name'/>
          <ul>
              {results}
          </ul>
        </div>
      </div>
    );
  }
};
