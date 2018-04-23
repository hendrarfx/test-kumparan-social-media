import React from 'react';
import {AppBar, IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const appBar = (props) => {
    const menu = ( <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}>
        <MenuItem primaryText="Sign out" onClick={() => props.history.push('/signout')}/>
    </IconMenu>);

    return (<AppBar title={'Social Media Dashboard'} showMenuIconButton={false} iconElementRight={menu}></AppBar>);
}
export default appBar;