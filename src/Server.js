import React from 'react';
import ReactTooltip from 'react-tooltip'

class Server extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classDropdown: 'server wpeo-dropdown'
    };
  }

  switch = (id, url, name, e) => {
    if (e.type === 'click') {
      this.props.parent.switch(id, url, name);
    }
  }

  openDropdown = (e) => {
    if (e.type === 'contextmenu') {
      this.setState({classDropdown: 'server wpeo-dropdown dropdown-active'});
    }
  };

  closeDropdown = () => {
    this.setState({classDropdown: 'server wpeo-dropdown'});
  };

  prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  render() {
     return (
       <div className={this.state.classDropdown}
          key={this.props.data.id}
          url={this.props.data.url}
          data-tip={this.props.data.name}
          onClick={this.switch.bind(this, this.props.data.id, this.props.data.url, this.props.data.name)}>
         <div className="dropdown-toggle"
          onContextMenu={this.openDropdown}
          onClick={this.openDropdown}><img src={this.props.data.url_image} /></div>

         <ul className="dropdown-content" onClick={this.prevent}>
           <div>
             <li className="dropdown-item">Quitter le serveur</li>
           </div>
         </ul>
       </div>
     );
  }
}

export default Server;
