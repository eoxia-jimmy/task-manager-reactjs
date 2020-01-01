import React from 'react';
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = {
      new: React.createRef()
    };

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      display: 'none',
      html: {
        new: {
          content: "New Comments",
          id: 0,
        }
      }
    };
  }

  componentDidMount() {
    fetch(this.props.url + "wp-json/task_manager/v1/comments/" + this.props.parent_id)
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

      fetch(this.props.url + "wp-json/task_manager/v1/comment/" + html[key]['id'], {
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
    form.append('post_id', this.props.parent_id);
    form.append('parent_id', this.props.id);
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

  display() {
    this.setState({display: "block"});
  }

  render() {
    const { error, isLoaded, items } = this.state;
     if (error) {
       return <div>Erreur : {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Chargement…</div>;
     } else {
       return (
         <ul className="comments" style={this.state}>
          <li className="comment new">
          <div className="tm-avatar wpeo-tooltip-event" aria-label="a">
            <img className="avatar avatar-40" src="http://1.gravatar.com/avatar/d10ca8d11301c2f4993ac2279ce4b930?s=40&amp;d=blank&amp;r=g" />
            <div className="wpeo-avatar-initial"><span>a</span></div>
          </div>

          <div className="comment-container">
        		<div className="comment-content">
        			<div className="comment-content-text">
                <ContentEditable
                  ref="pointnew"
                  innerRef={this.contentEditable.new}
                  html={this.state.html.new.content} // innerHTML of the editable div
                  disabled={false}       // use true to disable editing
                  onChange={this.handleChange.bind(this, 'new')} // handle innerHTML change
                  tagName='div' />
        			</div>
        		</div>

        		<div className="comment-action">
        			<div className="fa-layers fa-fw save-icon wpeo-button button-rounded button-square-30 tm_register_comment">
        				<FontAwesomeIcon icon={faPlusCircle} onClick={this.createPoint} />
        			</div>
        		</div>
        	</div>
          </li>
          {items.map((item, key) => (
            <li className="comment" key={item.data.id}>
              <div className="tm-avatar wpeo-tooltip-event" aria-label="a">
                <img className="avatar avatar-40" src="http://1.gravatar.com/avatar/d10ca8d11301c2f4993ac2279ce4b930?s=40&amp;d=blank&amp;r=g" />
                <div className="wpeo-avatar-initial"><span>a</span></div>
              </div>
              <div className="comment-container">
            		<div className="comment-content">
            			<div className="comment-content-text">
            				<div>{item.data.content}</div>
            			</div>
            		</div>

            		<div className="comment-action">
            			<div className="fa-layers fa-fw save-icon wpeo-button button-rounded button-square-30 tm_register_comment">
            				<FontAwesomeIcon icon={faEllipsisV} onClick={this.createPoint} />
            			</div>
            		</div>
            	</div>
            </li>
          ))}
          </ul>
       );
     }
  }
}

export default Comments;
