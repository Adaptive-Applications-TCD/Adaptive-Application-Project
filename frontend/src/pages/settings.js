import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, Switch, CardHeader, FormControlLabel, Tooltip } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'

export default function Settings() {

    const [colourblindMode, setColourblindMode] = useState(false)

    const label = { inputProps: { 'aria-label': 'Switch demo' }, label: 'Colourblind Mode' };

    function handleChange(e) {
        const value = e.target.checked

        setColourblindMode(value)
    }

    useEffect(() => {
        if (colourblindMode) {
            //Set Colour Blind Mode
        }
    })
    return (
        <>
            <HomeToolbar color="primary" />
            <Container fixed>
                <Card sx={{ mt: 5, ml: 30, mr: 30 }} variant='outlined'>
                    <CardHeader title="Settings" />
                    <CardContent>
                        <Tooltip title="Enable our specialised Colourblind mode">
                            <FormControlLabel control={<Switch {...label} />} label="Colourblind Mode" onChange={handleChange}></FormControlLabel>
                        </Tooltip>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
