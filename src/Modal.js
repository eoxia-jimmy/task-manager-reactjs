import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
     return (
       <div className="modal-background">
        <div className="modal">
          <div className="modal-header">
            <h2>Titre</h2>
          </div>
          <div className="modal-content">
            <p>Contenu</p>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
     );
  }
}

export default Modal;
