import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';
import User from './User.json';
import ReactTooltip from 'react-tooltip'

class Servers extends React.Component {
  constructor(props) {
    super(props);
  }

  openModal = evt => {
    this.refs.modal.openModal();
  };

  switch = (id, url, name, e) => {
    this.props.switch(id, url, name);
  }

  render() {
     return (
       <div>
         <nav>
          <div className="servers">
          {User.servers.map((item, key) => (
            <div className="server" key={item.id} url={item.url} data-tip={item.name} onClick={this.switch.bind(this, item.id, item.url, item.name)}>
              <img src="https://cdn.discordapp.com/icons/463660905679552513/350510e77dcfb4b830c45e66f87ec2e8.webp?size=128" />
            </div>
          ))}
            <div className="server add" onClick={this.openModal}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
         </nav>

         <Modal ref="modal"></Modal>
         <ReactTooltip place="right" effect='solid' />
       </div>
     );
  }
}

export default Servers;
