import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, IconButton, Typography, CardActions, List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState()
  const [movies, setMovies] = useState([{ title: "killer, the", genres: "Action|Crime|Drama|Thriller" }, { title: "face/off", genres: "Action|Crime|Drama|Thriller" }, { title: "face/off", genres: "Action|Crime|Drama|Thriller" }, { title: "face/off", genres: "Action|Crime|Drama|Thriller" }])


  const handleSearch = (e) => {
    e.preventDefault()
    fetch('/api/recommend/' + searchQuery).then(res => res.json()).then(response => console.log(response))
  }

  const renderMovies = () => {
    return movies.map((movie) => {
      <Typography>{movie.title}</Typography>
    })
  }

  return (
    <>
      <HomeToolbar color="primary" />
      <Container fixed>
        <Card sx={{ mt: 5, ml: 30, mr: 30 }} variant='outlined'>
          <CardContent>
            <form onSubmit={handleSearch}>
              <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                  setSearchQuery(e.target.value);
                }}
                label="Enter a Movie"
                variant="outlined"
                placeholder="Search..."
                size="small"
              />
              <IconButton type="submit" aria-label="search">
                <Search color='primary' />
              </IconButton>
            </form>
          </CardContent>
        </Card>
        <Grid>
          {movies.map((movie, index) =>
            // <ListItem
            //   key={index}
            // >
            //   <ListItemAvatar>
            //     <Avatar>
            //       <MovieIcon />
            //     </Avatar>
            //   </ListItemAvatar>
            //   <ListItemText primary={movie.title} secondary={movie.genres} />
            // </ListItem>
            <Card key={index} sx={{ width: 200 }}>
              <CardContent>
                <Typography>{movie.title}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

      </Container>
    </>
  )
}
