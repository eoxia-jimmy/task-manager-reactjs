import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "none",
      errorMessage: ""
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

  join = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('action', 'join');
    form.append('url', this.refs.url.value);
    form.append('token', this.refs.token.value);
    form.append('user_id', this.props.user_id)

    fetch('http://127.0.0.1/api-mysql/api.php', {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (!result.status) {
          if (result.error == "EMPTY_USER_OR_URL_OR_TOKEN") {
            this.setState({errorMessage: "Empty user or url or token"});
          } else if (result.error == "CURL_TIMEOUT" ) {
            this.setState({errorMessage: "URL not founded"});
          }
          else if (result.error == "ALREADY_JOINED") {
            this.setState({errorMessage: "Already joined"});
          }
          else if (result.error == "FORBIDDEN") {
            this.setState({errorMessage: "Token invalid"});
          }

        } else {
          this.props.parent.addedServer(result.data);
          this.setState({display: 'none'});
        }
      });
  }

  render() {
     return (
       <div className="modal-background" onClick={this.closeModal} style={this.state}>
        <div className="modal" onClick={this.preventCloseModal}>
          <div className="modal-header">
            <h2>Oh, un autre serveur, hein?</h2>
          </div>
          <div className="modal-content">
            <p className="description">Pour rejoindre un serveur, veuillez renseigner l'URL du serveur et la clé privée assigné à votre compte utilisateur.</p>
            {this.state.errorMessage != "" &&
              <p>{this.state.errorMessage}</p>
            }

            <form>
              <div className="form-element">
                <label htmlFor="private-key">URL du site</label>
                <input type="text" ref="url" />
              </div>

              <div className="form-element">
                <label htmlFor="private-key">Votre clé privée</label>
                <input type="text"  ref="token" />
              </div>

              <div className="align-right">
                <button type="submit" onClick={this.join}>Rejoindre</button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
     );
  }
}

export default Modal;
