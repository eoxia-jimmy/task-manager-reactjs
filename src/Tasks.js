import React from 'react';
import Task from './Task';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      html: 'test'
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1/wordpress/wp-json/task_manager/v1/task")
      .then(res => res.json())
      .then(
        (result) => {
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
         <div className="wrap">
          {items.map((item, key) => (
            <Task key={item.data.id} data={item.data}></Task>
          ))}
          </div>
       );
     }
  }
}

export default Tasks;
