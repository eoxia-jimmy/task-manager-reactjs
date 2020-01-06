import React from 'react';
import md5 from "react-native-md5";

class Subscribe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "block",
      errorMessage: ""
    };
  }

  openModal = () => {
    this.setState({display: "block"})
  };

  preventCloseModal = (e) => {
    e.stopPropagation();
  }

  goLogin = (e) => {
    this.props.parent.switchLogin();
  }

  subscribe = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('action', 'subscribe');
    form.append('email', this.refs.email.value);
    form.append('username', this.refs.username.value);
    form.append('password', md5.b64_md5(this.refs.password.value));

    fetch('http://127.0.0.1/api-mysql/api.php', {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (!result.status) {
          if (result.error == "EMPTY_EMAIL_OR_USERNAME_PASSWORD") {
            this.setState({errorMessage: 'Empty email or username or password'});
          }
          else if (result.error == "EMAIL_INVALID") {
            this.setState({errorMessage: 'Email invalid'});
          }
          else if(result.error == 23000) {
            this.setState({errorMessage: 'Email already used'});
          }
        } else {
          this.props.parent.setLoginID(result.data);
        }
      });

      return false;
  }

  render() {
     return (
       <div className="modal-background" style={this.state}>
        <div className="modal" onClick={this.preventCloseModal}>
          <div className="modal-header">
            <h2>Créer un compte</h2>
          </div>
          <div className="modal-content">
            {this.state.errorMessage != "" &&
              <p>{this.state.errorMessage}</p>
            }

            <form>
              <div className="form-element">
                <label htmlFor="private-key">Email</label>
                <input type="text" value={this.state.pseudo} ref="email" />
              </div>

              <div className="form-element">
                <label htmlFor="private-key">Nom d'utilisateur</label>
                <input type="text" value={this.state.pseudo} ref="username" />
              </div>


              <div className="form-element">
                <label htmlFor="private-key">Mot de passe</label>
                <input type="password" value={this.state.password} ref="password" />
              </div>

              <div className="align-right">
                <button type="submit" onClick={this.subscribe}>S'inscrire</button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <p><a href="#" onClick={this.goLogin}>Tu as déjà un compte ?</a></p>
          </div>
        </div>
      </div>
     );
  }
}

export default Subscribe;
