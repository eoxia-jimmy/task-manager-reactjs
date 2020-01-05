import React from 'react';
import ContentEditable from 'react-contenteditable'
import Tasks from './Task/Tasks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.contentEditable = React.createRef();
    this.task = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      data: this.props.data,
      html: this.props.data.title,
      display: 'none'
    };

    this.faIcon = faAngleRight;
  }

  handleChange = evt => {
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
  };

  loadTask = evt => {
    if (this.faIcon == faAngleRight) {
      this.task.current.load();

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
       <div className="task table-column" data-id={data.id}>
       	<div className="table-row">
       		<div className="table-cell table-25" onClick={this.loadTask}>
       			<div className="table-cell-container">
       				<FontAwesomeIcon icon={this.faIcon} />
       			</div>
       		</div>

       		<div className="table-cell table-300 project-name">
       			<div className="table-cell-container project-title">
              <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName='div' />
       			</div>
       		</div>

       		<div className="table-cell table-50 project-id">
       			<div className="table-cell-container">
       				{data.id}
       			</div>
       		</div>

       		<div className="table-cell table-100 project-last-update">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-100 project-time">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-150 project-created-date">
       			<div className="table-cell-container">
              {data.date.rendered.date_time}
       			</div>
       		</div>

       		<div className="table-cell table-150 project-due-time">
       			<div className="table-cell-container">
       				-
       			</div>
       		</div>

       		<div className="table-cell table-100 project-affiliated">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-150 project-categories">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-100 project-state">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-75 project-attachment">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-100 project-author">
       			<div className="table-cell-container">
       			</div>
       		</div>

       		<div className="table-cell table-200 project-users">
       			<div className="table-cell-container"></div>
       		</div>

       		<div className="table-cell table-50 table-padding-0 project-option">
       			<div className="table-cell-container">
       			</div>
       		</div>
       	</div>

        <div style={this.state}>
          <Tasks ref={this.task} project_id={data.id} url={this.props.url} user_id={this.props.user_id}></Tasks>
        </div>
       </div>
     );
  }
}

export default Project;
