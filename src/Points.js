import React from 'react';
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

class Points extends React.Component {
  constructor(props) {
    super(props);
    this.contentEditable = {
      new: React.createRef()
    };

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

  componentDidMount() {
    fetch(this.props.url + "wp-json/task_manager/v1/points/" + this.props.id)
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

          this.setState({
            isLoaded: true,
            items: result,
            html: html
          });
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

  render() {
    const { error, isLoaded, items } = this.state;
     if (error) {
       return <div>Erreur : {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Chargement…</div>;
     } else if (items.length > 0) {
       return (
         <div className="points">
          <div className="point new">
          <ul className="point-container">
            <li className="point-valid"><input type="checkbox" /></li>
            <li className="point-content">
              <ContentEditable
                ref="pointnew"
                innerRef={this.contentEditable.new}
                html={this.state.html.new.content} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange.bind(this, 'new')} // handle innerHTML change
                tagName='div' />
              </li>
              <li className="point-action">
                <FontAwesomeIcon icon={faPlusCircle} onClick={this.createPoint} />
              </li>
            </ul>
          </div>
          {items.map((item, key) => (
            <div className="point" key={item.data.id}>
              <ul className="point-container">
                <li className="point-valid"><input type="checkbox" /></li>
                <li className="point-content">
                  <ContentEditable
                    ref="content-{item.data.id}"
                    innerRef={this.contentEditable["content-" + item.data.id]}
                    html={this.state.html["content-" + item.data.id].content} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange.bind(this, "content-" + item.data.id)} // handle innerHTML change
                    tagName='div' />
                </li>
                <li className="point-action">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </li>
              </ul>
            </div>
          ))}
          </div>
       );
     }
  }
}

export default Points;
