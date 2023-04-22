import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'
import { contentSearch } from '@/api/search'

// async function search(query) {
//   let response = await contentSearch(query)

//   return response
// }


export default function Home() {
  const [searchQuery, setSearchQuery] = useState()
  const [movies, setMovies] = useState()


  const handleSearch = (e) => {
    e.preventDefault()
    fetch('/api/recommend/' + searchQuery).then(res => res.json()).then(response => console.log(response))
  }

  useEffect(() => {
    // fetch('/api/hello').then(res => res.json()).then(response => console.log(response))
  })

  return (
    <>
      <HomeToolbar color="primary" />
      <Container>
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
      </Container>
    </>
  )
}
