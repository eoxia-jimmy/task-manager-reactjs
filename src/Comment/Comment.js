import React from 'react';
import ContentEditable from 'react-contenteditable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.comments = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      data: this.props.data,
      html: this.props.data.title
    };
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


  render() {
    const { data } = this.state;

     return (
       <div class="table-column">
       	<div class="table-row">
       		<div class="table-cell">
       			<div class="table-cell-container comment-title" contenteditable="true">{data.content}</div>
       		</div>

       		<div class="table-cell">-</div>
       		<div class="table-cell">26/11/2019 10h12</div>
       		<div class="table-cell">30</div>
       		<div class="table-cell"><span><i class="fas fa-ellipsis-v"></i></span></div>
       	</div>
       </div>
     );
  }
}

export default Comment;
