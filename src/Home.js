import React from 'react';
import Projects from './Projects';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.task = React.createRef();

    this.state = {
      display: "block",
      id: 0,
      url: '',
      name: "Home",
      wp_user_id: 0,
      token: ''
    }
  }

  load(id, url, name, wp_user_id, token) {
    this.setState({id: id, url: url, name: name, wp_user_id: wp_user_id, token: token});
  }

  createProject = () => {
    this.task.current.createTask();
  };

  render() {
     return (
       <div style={this.state}>
        <div className="header-content">
          <h2>{this.state.name}</h2>

          {this.state.id != 0 &&
            <button type="submit" onClick={this.createProject}>New Project</button>
          }
        </div>

        <div className="wrap-content">
          {this.state.id != 0 &&
            <Projects ref={this.task}
              key={this.state.id}
              url={this.state.url}
              user_id={this.props.user_id}
              wp_user_id={this.state.wp_user_id}
              token={this.state.token}></Projects>
          }
        </div>
      </div>
     );
  }
}

export default Home;
