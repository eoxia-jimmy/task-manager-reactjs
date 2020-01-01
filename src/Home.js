import React from 'react';
import Tasks from './Tasks';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.task = React.createRef();

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

  createTask = () => {
    this.task.current.createTask();
  };

  render() {
     return (
       <div style={this.state}>
        <div className="header-content">
          <h2>{this.state.name}</h2>

          {this.state.id != 0 &&
            <button type="submit" onClick={this.createTask}>New Task</button>
          }
        </div>

        <div className="wrap-content">
          {this.state.id != 0 &&
            <Tasks ref={this.task} key={this.state.id} url={this.state.url}></Tasks>
          }
        </div>
      </div>
     );
  }
}

export default Home;
