import React from 'react';

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
    form.append('username', this.refs.pseudo.value);
    form.append('password', this.refs.password.value);

    fetch('http://127.0.0.1/api-mysql/login.php', {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (!result) {
          this.setState({errorMessage: "Identifiant erronée"});
        } else {
          this.props.parent.setLoginID(result.id);

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
              <p>Identifiant erroné</p>
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
