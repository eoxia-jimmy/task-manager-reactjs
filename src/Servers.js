import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';
import ReactTooltip from 'react-tooltip'

class Servers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1/api-mysql/servers.php?user_id=" + this.props.user_id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (!Array.isArray(result)) {
            result = [result];
          }
          this.setState({
            isLoaded: true,
            items: result
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

  switch = (id, url, name, e) => {
    this.props.parent.switch(id, url, name);
  }

  addedServer = (data) => {
    var items = this.state.items;
    items.push(data);

    this.setState({items: items});
  };

  render() {
    const { error, isLoaded, items } = this.state;
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
            <div className="server" key={item.id} url={item.url} data-tip={item.name} onClick={this.switch.bind(this, item.id, item.url, item.name)}>
              <img src={item.url_image} />
            </div>
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
