import classes from './Navigation.module.css'

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/system';

import {Article, ContactPhone} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';

const Navigation = function({toggleDrawer}) {
    return (
        <Box
            sx={{ width: 'auto'}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
        <nav>
            <h1 className={classes.menu}>Menu</h1>
            <Divider />
            <div className={classes.divider}></div>
            <List
            sx={{ width: '100%'}}
            component="ul">
                <NavLink to="/article" className={({ isActive }) =>isActive ? classes.activeLink : classes.navLink}>
                <ListItemButton sx={{ width: '100%', height: "65px"}} color="primary" >
                    <ListItemIcon><Article  sx={{width:'1.3em', height: '1.3em', color: '#262626'}}/> </ListItemIcon>
                    <ListItemText primary="Articles" className={classes.textLink}/>
                </ListItemButton>
              </NavLink> 
                <NavLink  to="/commande" className={({ isActive }) =>isActive ? classes.activeLink : classes.navLink}>
                    <ListItemButton sx={{ width: '100%', height: "65px"}}>
                        <ListItemIcon>
                        <ContactPhone  sx={{width:'1.3em', height: '1.3em', color: '#262626'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Commandes" className={classes.textLink}/>
                    </ListItemButton>
                </NavLink>
            </List>
        </nav>
        </Box>
    )
}

export default Navigation