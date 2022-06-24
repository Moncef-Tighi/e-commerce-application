import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import classes from './Header.module.css';
import { IconButton } from '@mui/material';
import Navigation from './Navigation';
import React from 'react';
import { Button, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Tooltip } from '@mui/material';

const Header = function() {

    const [menu, setMenu] = useState(false);
    const toggleDrawer = (openMenu) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setMenu(!menu);
      };


    return (
        <header>
            <div>
                
                <React.Fragment key={"left"}>
                    <Tooltip title="Menu de navigation" arrow>
                        <Button onClick={toggleDrawer(true)}><MenuIcon sx={{fontSize : "2.5em", marginRight: "10px"}}/></Button>
                    </Tooltip>
                    <Drawer
                    anchor={"left"}
                    open={menu}
                    onClose={toggleDrawer(false)}
                    transitionDuration={{appear: 200, enter: 400, exit: 200} }
                    >
                            <Navigation toggleDrawer={toggleDrawer} menu={menu}/>
                    </Drawer>
                </React.Fragment>
                <div className={classes.dividerHead}></div>
                <img className={classes.icon} src="logo-pmg.png" alt="small-logo"></img>
            </div>

            <div>
            <div className={classes.name}>
            <h2>Nom Prenom</h2>
                <h4>Poste</h4>
            </div>
            <Tooltip title="Afficher les notifications" arrow>
            <NotificationsIcon sx={{color: "grey", fontSize: '1.6em', marginRight: '8px'}}/>
            </Tooltip>

            <Tooltip title="Déconnexion" arrow>
                <IconButton><LogoutIcon sx={{fontSize: '1.3em'}}/></IconButton>
            </Tooltip>
            </div>
        </header>
    )
}

export default Header