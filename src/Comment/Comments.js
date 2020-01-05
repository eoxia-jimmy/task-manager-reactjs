import React from 'react';
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Comment from './Comment';

class Comments extends React.Component {
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
          content: "New Comment",
          id: 0,
        }
      }
    };
  }

  load() {
    fetch(this.props.url + "wp-json/task_manager/v1/comments/" + this.props.project_id)
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

  createComment = evt => {
    var html = this.state.html;

    const form = new FormData();
    form.append('post_id', this.props.project_id);
    form.append('parent_id', this.props.task_id);
    form.append('content', html.new.content);

    fetch(this.props.url + "wp-json/task_manager/v1/comment/", {
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
          <button type="submit" onClick={this.createComment}>New Comment</button>

           <div class="wpeo-table table-flex table-comments">
             <div class="table-row table-header">
               <div class="table-cell">Commentaire</div>
               <div class="table-cell">Auteur</div>
               <div class="table-cell">Date création</div>
               <div class="table-cell">Temps</div>
               <div class="table-cell"></div>
             </div>

             {items.map((item, key) => (
               <Comment key={item.data.id} data={item.data} url={this.props.url} project_id={this.props.project_id} task_id={this.props.task_id}></Comment>
             ))}
            </div>
         </div>
       );
     }
  }
}

export default Comments;
