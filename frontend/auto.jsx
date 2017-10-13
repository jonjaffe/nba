import React from 'react';
import request from 'superagent';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      img: "https://www.logodesignlove.com/images/classic/nba-logo.jpg",
      stats: null
    };
    this.selectPlayer = this.selectPlayer.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getPlayerImage = this.getPlayerImage.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.getPlayerStats = this.getPlayerStats.bind(this);
  }

  getPlayerImage(name) {
    let newImageBase = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/"
    let newPlayerId = this.props.players[name]
    let newImageEnd = ".png"
    return newImageBase + newPlayerId + newImageEnd
  }

  getPlayerStats(name) {
    let statsURLBase = "http://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=";
    let statsPlayerId = this.props.players[name];
    let statsURLEnd = "&PlusMinus=N&Rank=N&Season=2016-17&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=";
    let statsURL = statsURLBase + statsPlayerId + statsURLEnd;
    // request
    //   .get(statsURL)
    //   .withCredentials()
    //   .then(function(err, res){
    //     if (err) throw err;
    //     console.log(res.text);
    //   })
    let myHeaders = new Headers();
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const myInit = {method: 'GET', mode: 'no-cors', headers: myHeaders, cache: 'default'};
    fetch(endpoint, myInit)
  .then(response => {
    return response.blob();
    // console.log(response.json())
  })
  // {
  //   console.log(statsURL);
  //   return response.json()
  // })
  .then(data => console.log(data))
  // ;function(data) {
  //   console.log(data.resultSets.rowSet)
  // })
  .catch(err => console.log(err))
  // ;function(err) {
  //   console.error(err)
  // })
  }

  resetPlayer() {
    this.setState({inputVal: '', img: 'https://www.logodesignlove.com/images/classic/nba-logo.jpg'})
  }

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value});
  }

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return Object.keys(this.props.players);
    }

    Object.keys(this.props.players).forEach(player => {
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
    this.setState({inputVal: player, img: this.getPlayerImage(player), stats: this.getPlayerStats(player)});
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
          <input type='button' onClick={this.resetPlayer} />
          <ul>
              {results}
          </ul>
        </div>
        <img src={this.state.img} />
        {this.state.stats}
      </div>
    );
  }
};
