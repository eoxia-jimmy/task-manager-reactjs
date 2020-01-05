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
        <div className="modal" onClick={this.preventCloseModal}>
          <div className="modal-header">
            <h2>{this.props.title}</h2>
          </div>
          <div className="modal-content">
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
     );
  }
}

export default ModalCallback;
