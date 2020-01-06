import React from 'react';
import md5 from "react-native-md5";

class Login extends React.Component {
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

  connect = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('action', 'login');
    form.append('email', this.refs.pseudo.value);
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
          if (result.error == "EMPTY_EMAIL_OR_PASSWORD") {
            this.setState({errorMessage: "Empty email or password"});
          } else if (result.error == "EMAIL_OR_PASSWORD_INCORRECT"){
            this.setState({errorMessage: "Email or password incorrect"});
          } else {
            this.setState({errorMessage: "Unknow error"});
          }
        } else {
          this.props.parent.setLoginID(result.data.id);
        }
      });

      return false;
  }

  goSubscribe = (e) => {
    this.props.parent.subscribe();
  }

  render() {
     return (
       <div className="modal-background" style={this.state}>
        <div className="modal" onClick={this.preventCloseModal}>
          <div className="modal-header">
            <h2>Un nouveau ? Ou bien un vétéran ?</h2>
          </div>
          <div className="modal-content">
            <p className="description">Bon retour parmis nous!</p>

            {this.state.errorMessage != "" &&
              <p>{this.state.errorMessage}</p>
            }
            <form>
              <div className="form-element">
                <label htmlFor="private-key">Email</label>
                <input type="text" value={this.state.pseudo} ref="pseudo" />
              </div>

              <div className="form-element">
                <label htmlFor="private-key">Mot de passe</label>
                <input type="password" value={this.state.password} ref="password" />
              </div>

              <div className="align-right">
                <button type="submit" onClick={this.connect}>Se connecter</button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <p>Besoin d'un compte ? <a href="#" onClick={this.goSubscribe}>S'inscrire</a></p>
          </div>
        </div>
      </div>
     );
  }
}

export default Login;
