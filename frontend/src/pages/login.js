import LoginIcon from '@mui/icons-material/Login';
import { Container, TextField, Typography, Button, CardContent, CardActions, Card } from "@mui/material";
import { useState } from "react";
import { login } from "@/utils/authUtils"
import { useRouter } from 'next/router'


export default function LoginPage() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const router = useRouter();

    function handleLogin() {
        let success = login(email, password)

        if (success) {
            router.push('/')
        }
    }

    function handleEmail(evt) {
        const value = evt.target.value;

        setEmail(value);
    }

    function handlePassword(evt) {
        const value = evt.target.value;

        setPassword(value);
    }

    return (
        <div className="LoginPage">
            <Container>
                <Card sx={{ mr: 30, ml: 30, mt: 20 }} >
                    <CardContent>
                        <Typography variant='h5'>Log In</Typography>
                        <div><TextField fullWidth label="Email" variant="outlined" sx={{ mt: 5 }} onChange={handleEmail}></TextField></div>
                        <div><TextField fullWidth label="Password" variant="outlined" sx={{ mt: 2 }} type='password' onChange={handlePassword}></TextField></div>
                    </CardContent>
                    <CardActions>
                        <Button startIcon={<LoginIcon />} onClick={handleLogin}>Log In</Button>
                    </CardActions>
                </Card >
            </Container>
        </div>
    );
}