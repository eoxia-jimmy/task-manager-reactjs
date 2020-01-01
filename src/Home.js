import React from 'react';
import Tasks from './Tasks';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "block",
      id: 0,
      url: '',
      name: "Home"
    }
  }

  load(id, url, name) {
    this.setState({id: id, url: url, name: name});
  }

  render() {
     return (
       <div style={this.state}>
        <div className="header-content">
          <h2>{this.state.name}</h2>
        </div>

        <div className="wrap-content">
          {this.state.id != 0 &&
            <Tasks key={this.state.id} url={this.state.url}></Tasks>
          }
        </div>
      </div>
     );
  }
}

export default Home;
