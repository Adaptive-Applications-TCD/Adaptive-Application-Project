import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link'
import { authUserContext } from '@/context/AuthUserContext'
import { useContext, useEffect, useState } from 'react';
import { logout } from '@/utils/authUtils';
import { useRouter } from 'next/router'

export default function HomeToolbar() {

    const { authUser } = useContext(authUserContext)
    const [email, setEmail] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (authUser && authUser.email) {
            setEmail(authUser.email)
        }
    })

    function handleLogOut() {
        logout()
        router.push('/login')
    }

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
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