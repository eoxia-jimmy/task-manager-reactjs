import React from 'react';
import ContentEditable from 'react-contenteditable'

import Comments from './../Comment/Comments'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.comments = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      data: this.props.data,
      html: this.props.data.title,
      display: 'none'
    };

    this.faIcon = faAngleRight;
  }

  /*handleChange = evt => {
    this.setState({html: evt.target.value});

    const form = new FormData();
    form.append('id', this.props.data.id);
    form.append('title', evt.target.value);

    fetch(this.props.url + "wp-json/task_manager/v1/task/" + this.props.data.id, {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      });
  };*/

  loadComments = evt => {
    if (this.faIcon == faAngleRight) {
      this.comments.current.load();

      this.setState({display: 'block'});
      this.faIcon = faAngleDown;
    } else {
      this.setState({display: 'none'});
      this.faIcon = faAngleRight;
    }
  };

  render() {
    const { data } = this.state;

     return (
       <div className="table-column">

       	<div className="table-row">
       		<div className="table-cell table-25" onClick={this.loadComments}>
       			<div className="table-cell-container">
       				<FontAwesomeIcon icon={this.faIcon} />
       			</div>
       		</div>

       		<div className="table-cell table-50 task-complete-point">
       			<div className="table-cell-container">
       				<input className="task-complete-point-field" type="checkbox" />
       			</div>
       		</div>

       		<div className="table-cell table-300 task-content">
       			<div className="table-cell-container task-title" contentEditable="true">
              {data.content}
       			</div>
       		</div>

       		<div className="table-cell table-50 task-comment-number">
       			<div className="table-cell-container">
       				<span className="number-comments">{data.count_comments}</span>
       			</div>
       		</div>

       		<div className="table-cell table-50 task-id">
       			<div className="table-cell-container">
       				{data.id}
       			</div>
       		</div>

       		<div className="table-cell table-75 task-time">
       			<div className="table-cell-container">
              {data.time_info.elapsed}
       			</div>
       		</div>

       		<div className="table-cell table-150 task-created-date">
       			<div className="table-cell-container">
              {data.date.rendered.date_time}
       			</div>
       		</div>

       		<div className="table-cell table-100 task-due-time">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-100 task-waiting-for">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-100 task-author">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-150 task-users">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-50 table-end">
       			<div className="table-cell-container">
       				<div className="wpeo-dropdown dropdown-right">
       					<div className="dropdown-toggle wpeo-button button-square-50 button-transparent"><i className="fas fa-ellipsis-v"></i></div>
       					<div className="dropdown-content point-header-action">

       					</div>
       				</div>
       			</div>
       		</div>
       	</div>

        <div style={this.state}>
          <Comments ref={this.comments} url={this.props.url} project_id={this.props.project_id} project_id={this.props.project_id} task_id={data.id} user_id={this.props.user_id}></Comments>
        </div>
       </div>
     );
  }
}

export default Task;
