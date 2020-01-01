import React from 'react';

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

  goLogin = (e) => {
    this.props.parent.switchLogin();
  }

  subscribe = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', this.refs.email.value);
    form.append('username', this.refs.username.value);
    form.append('password', this.refs.password.value);

    fetch('http://127.0.0.1/api-mysql/subscribe.php', {
      method: 'POST',
      body: form,
      mode: 'cors'
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (!result) {
        } else {
          this.props.parent.setLoginID(result);
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
