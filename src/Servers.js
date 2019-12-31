import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal';

class Servers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
     return (
       <div>
         <nav>
          <div className="servers">
            <div className="server">
              <img src="https://cdn.discordapp.com/icons/463660905679552513/350510e77dcfb4b830c45e66f87ec2e8.webp?size=128" />
            </div>
            <div className="server">
              <img src="https://cdn.discordapp.com/icons/463660905679552513/350510e77dcfb4b830c45e66f87ec2e8.webp?size=128" />
            </div>
            <div className="server add">
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
         </nav>

         <Modal></Modal>
       </div>
     );
  }
}

export default Servers;
