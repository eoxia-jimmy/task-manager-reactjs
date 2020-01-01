import React from 'react';
import Task from './Task';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      html: 'test',
    };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    fetch(this.props.url + "wp-json/task_manager/v1/task")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (!Array.isArray(result)) {
            result = [result];
          }
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
     if (error) {
       return <div>Erreur : {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Chargement…</div>;
     } else {
       return (
         <div className="tasks">
          {items.map((item, key) => (
            <Task key={item.data.id} data={item.data} url={this.props.url}></Task>
          ))}
          </div>
       );
     }
  }
}

export default Tasks;
