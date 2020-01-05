import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';
import ReactTooltip from 'react-tooltip'
import ModalCallback from './Util/ModalCallback'


import Server from './Server';

class Servers extends React.Component {
  constructor(props) {
    super(props);

    this.modalLeaveServer = React.createRef();

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      keys: {},
      title: 'lol',
      content: '',
      dataConfirm: {}
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
    var keys = this.state.keys;

    items.push(data);
    keys['server-' + data.id] = React.createRef()

    this.setState({
      items: items,
      keys: keys
    });
  };

  closeDropdown() {
    var keys = this.state['keys'];
    for (var item in keys) {
      keys[item].current.closeDropdown();
    }
  }

  openModalLeaveServer = (title, content, dataConfirm, e) => {
    this.closeDropdown();
    this.setState({title: title});
    this.setState({content: content});
    this.setState({dataConfirm: dataConfirm});
    this.modalLeaveServer.current.openModal();

  };

  leaveServerCancelCallback = (e) => {
    e.preventDefault();
    this.modalLeaveServer.current.closeModal();
  };

  leaveServerConfirmCallback = (dataConfirm, e) => {
    const form = new FormData();
    form.append('id', dataConfirm.id);
    form.append('user_id', this.props.user_id)

    fetch('http://127.0.0.1/api-mysql/leave', {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.status) {
          var items = this.state.items;
          var keys = this.state.keys;

          for(var i = items.length - 1; i >= 0; i--) {
              if(items[i].id === dataConfirm.id) {
                 items.splice(i, 1);
              }
          }

          delete keys['server-' + dataConfirm.id];

          this.setState({
            items: items,
            keys: keys
          })

          this.modalLeaveServer.current.closeModal();
        }
      });

    e.preventDefault();
  };

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
            <Server ref={keys['server-' + item.id]} servers_parent={this} parent={this.props.parent} data={item}></Server>
          ))}
            <div className="server add" onClick={this.openModal}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
         </nav>

         <Modal ref="modal" parent={this} user_id={this.props.user_id}></Modal>
         <ModalCallback ref={this.modalLeaveServer}
          title={this.state.title}
          content={this.state.content}
          cancel={this.leaveServerCancelCallback}
          confirm={this.leaveServerConfirmCallback}
          dataConfirm={this.state.dataConfirm}></ModalCallback>

         <ReactTooltip place="right" effect='solid' />
       </div>
     );
   }
  }
}

export default Servers;
