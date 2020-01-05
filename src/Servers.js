import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';
import ReactTooltip from 'react-tooltip'

import Server from './Server';

class Servers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      keys: {}
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1/api-mysql/servers.php?user_id=" + this.props.user_id)
      .then(res => res.json())
      .then(
        (result) => {
          if (!Array.isArray(result)) {
            result = [result];
          }

          var keys = this.state['keys'];

          for (var item in result) {
            keys['server-' + result[item].id] = React.createRef()
          }

          this.setState({
            isLoaded: true,
            items: result,
            keys: keys
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


  openModal = evt => {
    this.refs.modal.openModal();
  };



  addedServer = (data) => {
    var items = this.state.items;
    items.push(data);

    this.setState({items: items});
  };

  closeDropdown() {
    var keys = this.state['keys'];
    for (var item in keys) {
      keys[item].current.closeDropdown();
    }
  }


  render() {
    const { error, isLoaded, items, keys } = this.state;
     if (error) {
       return <div>Erreur : {error.message}</div>;
     } else if (!isLoaded) {
       return <div>Chargement…</div>;
     } else {
     return (
       <div>
         <nav>
          <div className="servers">
          {this.state.items.map((item, key) => (
            <Server ref={keys['server-' + item.id]} parent={this.props.parent} data={item}></Server>
          ))}
            <div className="server add" onClick={this.openModal}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
         </nav>

         <Modal ref="modal" parent={this} user_id={this.props.user_id}></Modal>
         <ReactTooltip place="right" effect='solid' />
       </div>
     );
   }
  }
}

export default Servers;
