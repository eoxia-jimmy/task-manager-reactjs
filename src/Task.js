import React from 'react';
import ContentEditable from 'react-contenteditable'
import Points from './Points';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      error: null,
      isLoaded: false,
      data: this.props.data,
      html: this.props.data.title
    };
  }

  handleChange = evt => {
    this.setState({html: evt.target.value});

    const form = new FormData();
    form.append('id', this.props.data.id);
    form.append('title', evt.target.value);

    fetch("http://127.0.0.1/wordpress/wp-json/task_manager/v1/task/" + this.props.data.id, {
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

  render() {
    const { data } = this.state;

     return (
       <div className="task" key={data.id}>
          <div className="task-content">
            <div className="task-header">
              <div className="task-title">
              <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName='div' />
              </div>
            </div>

            <ul className="task-filter">

            </ul>

            <Points id={data.id}></Points>

          </div>
        </div>
     );
  }
}

export default Task;
