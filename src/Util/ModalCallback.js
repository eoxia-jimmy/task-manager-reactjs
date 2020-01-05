import React from 'react';

class ModalCallback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "none"
    };
  }

  openModal = () => {
    this.setState({display: "block"})
  };

  closeModal = (e) => {
    this.setState({display: "none"})
  }

  preventCloseModal = (e) => {
    e.stopPropagation();
  }

  render() {
     return (
       <div className="modal-background" onClick={this.closeModal} style={this.state}>
        <div className="modal w300" onClick={this.preventCloseModal}>
          <div className="modal-header">
            <h2>{this.props.title}</h2>
          </div>
          <div className="modal-content">
            {this.props.content}
          </div>
          <div className="modal-footer align-right">
            <button onClick={this.props.cancel} type="submit">Annuler</button>
            <button onClick={this.props.confirm.bind(this, this.props.dataConfirm)} className="red" type="submit">Quitter le serveur</button>
          </div>
        </div>
      </div>
     );
  }
}

export default ModalCallback;
