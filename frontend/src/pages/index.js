import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import {
  Card, Container, TextField, CardContent, IconButton, Typography,
  CardActions, List,
  ListItem, ListItemAvatar, Avatar, ListItemText, Grid, CardHeader, Tooltip, FormControlLabel, Switch
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState()
  const [movies, setMovies] = useState([])
  const [genre, setGenre] = useState(false)

  const label = { inputProps: { 'aria-label': 'Switch demo' }, label: 'Colourblind Mode' };

  const handleSearch = (e) => {
    e.preventDefault()
    if (genre) {
      fetch('/api/genre/' + searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)).then(res => res.json()).then(response => {
        setMovies(response)
      }).catch((e) => console.log(e))
    } else {
      fetch('/api/recommend/' + searchQuery).then(res => res.json()).then(response => {
        if (typeof response == 'object') {
          setMovies(response)
        } else {
          setMovies([])
        }
      }).catch((e) => console.log(e))
    }
  }

  const handleGenre = (e) => {
    const value = e.target.checked
    setGenre(value)
  }

  return (
    <>
      <HomeToolbar color="primary" />
      <Container fixed>
        <Card sx={{ mt: 5, ml: 30, mr: 30 }} variant='outlined'>
          <CardHeader title="Search Movies" />
          <CardContent>
            <Tooltip title="Enable genre search to search for genres">
              <FormControlLabel control={<Switch {...label} />} label="Enable Genre Search" onChange={handleGenre}></FormControlLabel>
            </Tooltip>
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
