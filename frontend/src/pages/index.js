import { useEffect, useContext, useState } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card, Container, TextField, CardContent, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import HomeToolbar from '@/components/toolbar'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState()
  const [movies, setMovies] = useState()


  const handleSearch = () => {

  }



  return (
    <>
      <HomeToolbar color="primary" />
      <Container>
        <Card sx={{ mt: 5, ml: 30, mr: 30 }}>
          <CardContent>
            <form>
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
              <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                <Search color='primary' />
              </IconButton>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
