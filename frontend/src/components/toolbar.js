import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link'
import { authUserContext } from '@/context/AuthUserContext'
import { useContext, useEffect, useState } from 'react';
import { logout } from '@/utils/authUtils';
import { useRouter } from 'next/router'

export default function HomeToolbar() {

    const { authUser } = useContext(authUserContext)
    const [email, setEmail] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter()

    useEffect(() => {
        if (authUser && authUser.email) {
            setEmail(authUser.email)
        }
        if (!authUser) {
            router.push('/login')
        }
    })

    function handleLogOut() {
        logout()
    }

    return (
        <div>
            <AppBar position="static" color="primary" variant="outlined">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        aria-expanded={open ? 'true' : undefined}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>Movies4U</Typography>
                    <Typography>Logged in as: {email}</Typography>
                    <IconButton onClick={handleLogOut} variant='outlined' sx={{ my: 2, color: 'white', display: 'block', display: { xs: 'none', md: 'flex' }, maxWidth: 150 }}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div >
    );
}