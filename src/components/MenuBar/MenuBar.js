import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class MenuBar extends Component {
  render () {
    const { activeMenuItem, tokenId, handleMenuItemClick, logOut } = this.props;
    return <Menu widths={10} inverted>
      <Menu.Item header>
        Stephan's World
      </Menu.Item>
      <Menu.Item
        name='starling'
        active={activeMenuItem === "starling"}
        onClick={handleMenuItemClick}/>
      <Menu.Item
        name='portfolio'
        disabled
        active={activeMenuItem === "portfolio"}
        onClick={handleMenuItemClick}/>

      <Menu.Menu position='right'>
        {tokenId ? <Menu.Item name='logout' onClick={logOut}/> : null}
      </Menu.Menu>
    </Menu>;
  }
}

export default MenuBar;

