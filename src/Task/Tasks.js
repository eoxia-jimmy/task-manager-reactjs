import React from 'react';
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Task from './Task';

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.contentEditable = {
      new: React.createRef()
    };

    this.comment = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      html: {
        new: {
          content: "New Point",
          id: 0,
        }
      }
    };
  }

  load() {
    fetch(this.props.url + "wp-json/task_manager/v1/points/" + this.props.project_id)
      .then(res => res.json())
      .then(
        (result) => {
          if (!Array.isArray(result)) {
            result = [result];
          }

          var html = this.state['html'];

          result.map(item => {
            html['content-' + item.data.id] = {
              content: item.data.content,
              id: item.data.id
            };

            this.contentEditable['content-' + item.data.id] = React.createRef();
          });

          if (result == null) {
            this.setState({
              isLoaded: true,
              items: []
            });
            return null;
          } else {

            if (result.length == 0) {
              this.setState({
                isLoaded: true
              });
            } else {

              this.setState({
                isLoaded: true,
                items: result != null ? result : [],
                html: html
              });
              return;
            }
          }
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(key, evt) {
    var html = this.state['html'];
    html[key]['content'] = evt.target.value;

    this.setState({html: html});

    if (key != "new") {
      const form = new FormData();
      form.append('id', html[key]['id']);
      form.append('content', evt.target.value);

      fetch(this.props.url + "wp-json/task_manager/v1/point/" + html[key]['id'], {
        method: 'POST',
        body: form,
        mode: 'cors'
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        });
    }
  };

  createPoint = evt => {
    var html = this.state.html;

    const form = new FormData();
    form.append('post_id', this.props.id);
    form.append('content', html.new.content);

    fetch(this.props.url + "wp-json/task_manager/v1/point/", {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        var items = this.state.items;
        items.unshift(result);

        html['content-' + result.data.id] = {
          content: result.data.content,
          id: result.data.id
        };

        this.contentEditable['content-' + result.data.id] = React.createRef();

        this.setState({
          html: html,
          items: items
        });
      });
  };

  openComment = evt => {
    this.comment.current.display();
  }

  render() {
    const { error, isLoaded, items } = this.state;
     if (error) {
       return <div>Erreur : {error.message}</div>;
     } else if (!isLoaded) {
       return <div></div>;
     } else {
       return (
         <div className="column-extend">
           <div className="wpeo-table table-flex table-task">
           	<div className="table-row table-header">
           		<div className="table-cell table-25"></div>
           		<div className="table-cell table-50">Etat</div>
           		<div className="table-cell table-300">Nom de la tâche</div>
           		<div className="table-cell table-50">Com</div>
           		<div className="table-cell table-50"># ID</div>
           		<div className="table-cell table-75">Temps</div>
           		<div className="table-cell table-150">Date création</div>
           		<div className="table-cell table-100">Date prévue</div>
           		<div className="table-cell table-100">En attente de</div>
           		<div className="table-cell table-100">Auteur tâche</div>
           		<div className="table-cell table-150">Utilisateurs associée</div>
           		<div className="table-cell table-50"></div>
           	</div>

            {items.map((item, key) => (
              <Task key={item.data.id} data={item.data} url={this.props.url} project_id={this.props.project_id} task_id={item.data.id}></Task>
            ))}
           </div>
         </div>

       );
     }
  }
}

export default Tasks;
