import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, IconButton, Typography, CardActions, List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid, CardHeader } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'

export default function Home() {
    const [searchQuery, setSearchQuery] = useState()
    const [movies, setMovies] = useState([])


    const handleSearch = (e) => {
        e.preventDefault()
        fetch('/api/cfrecommend/' + searchQuery).then(res => res.json()).then(response => setMovies(response))
    }

    return (
        <>
            <HomeToolbar color="primary" />
            <Container fixed>
                <Card sx={{ mt: 5, ml: 30, mr: 30 }} variant='outlined'>
                    <CardHeader title="Search Movies" />
                    <CardContent>
                        <form onSubmit={handleSearch}>
                            <TextField
                                id="search-bar"
                                className="text"
                                onInput={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                label="Enter a Key Word"
                                variant="outlined"
                                placeholder="Search..."
                                size="small"
                                sx={{ width: 598 }}
                            />
                            <IconButton type="submit" aria-label="search">
                                <Search color='primary' />
                            </IconButton>
                        </form>
                    </CardContent>
                </Card>
                <div style={{ marginTop: 50, maxHeight: 600 }}>
                    <Card variant='outlined' sx={{ ml: 30, mr: 30, overflowY: 'scroll', maxHeight: 400 }}>
                        <CardHeader title="Results" fixed />
                        {movies.map((movie, index) =>
                            <ListItem
                                key={index}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <MovieIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={movie.Title} secondary={movie.Genres} />
                            </ListItem>
                        )}
                    </Card>

                </div>

            </Container>
        </>
    )
}
