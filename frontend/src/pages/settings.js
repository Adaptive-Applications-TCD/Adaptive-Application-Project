import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, Switch, CardHeader, FormControlLabel, Tooltip, useTheme } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'

export default function Settings() {

    const [colourblindMode, setColourblindMode] = useState(false)

    const theme = useTheme()

    const label = { inputProps: { 'aria-label': 'Switch demo' }, label: 'Deuteronopia Mode' };

    function handleChange(e) {
        const value = e.target.checked

        setColourblindMode(value)

        if (colourblindMode) {
            theme.palette.primary.main = "#d32f2f"
        } else {
            theme.palette.primary.main = "#FFC20A"
        }
    }

    return (
        <>
            <HomeToolbar color="primary" />
            <Container fixed>
                <Card sx={{ mt: 5, ml: 30, mr: 30 }} variant='outlined'>
                    <CardHeader title="Settings" />
                    <CardContent>
                        <Tooltip title="Enable our specialised Deuteronopia mode">
                            <FormControlLabel control={<Switch {...label} />} label="Deuteronopia Mode" onChange={handleChange}></FormControlLabel>
                        </Tooltip>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
