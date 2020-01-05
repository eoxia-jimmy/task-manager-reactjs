import React from 'react';
import Project from './Project';

class Projects extends React.Component {
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

  createTask() {
    const form = new FormData();
    form.append('title', 'New Project');
    form.append('author_id', this.props.user_id);

    fetch(this.props.url + "wp-json/task_manager/v1/task/", {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        var tmp = this.state.items;
        tmp.unshift(result);

        this.setState({
          items: tmp
        });
      });
  }

  load() {
    fetch(this.props.url + "wp-json/task_manager/v1/task")
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
         <div className="wpeo-table table-flex table-projects">
         	<div className="table-row table-header">
         		<div className="table-cell table-25"></div>
         		<div className="table-cell table-300"><span>Project Name</span></div>
         		<div className="table-cell table-50"><span>ID</span></div>
         		<div className="table-cell table-100"><span>Last Maj</span></div>
         		<div className="table-cell table-100"><span>Time</span></div>
         		<div className="table-cell table-150"><span>Creation Date</span></div>
         		<div className="table-cell table-150"><span>End Date</span></div>
         		<div className="table-cell table-100"><span>Affiliated With</span></div>
         		<div className="table-cell table-150"><span>Categories</span></div>
         		<div className="table-cell table-100"><span>State</span></div>
         		<div className="table-cell table-75"><span>Attachments</span></div>
         		<div className="table-cell table-100"><span>Project Author</span></div>
         		<div className="table-cell table-200"><span>Related Users</span></div>
         		<div className="table-cell table-50"></div>
         	</div>

            {items.map((item, key) => (
              <Project key={item.data.id} data={item.data} url={this.props.url} user_id={this.props.user_id}></Project>
            ))}
          </div>
       );
     }
  }
}

export default Projects;
