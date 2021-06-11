import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Header } from "semantic-ui-react";

class NavBar extends React.Component {
  state = { activeItem: 'marketplace'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {activeItem} = this.state

    return (
      <div> 
      <Menu stackable>
        <Menu.Item><h1 className="header-logo">Jankazon</h1></Menu.Item>
        <Menu.Item as={NavLink} active={activeItem === 'my page'} name="My Page" to={`/users/${this.props.user.id}`} onClick={this.handleItemClick}/>
        <Menu.Item as={NavLink} active={activeItem === 'market place'} name="Market Place" to={`/marketplace`} onClick={this.handleItemClick}/>
        
        <Menu.Menu position='right'>
          <Menu.Item name='logout'active={activeItem === 'logout'} onClick={this.props.handleLogout}/>
        </Menu.Menu>
      </Menu>
      </div>
    )
  }
}
  
export default NavBar
