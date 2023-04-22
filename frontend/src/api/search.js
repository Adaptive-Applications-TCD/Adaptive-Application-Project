import axios from 'axios'

export async function contentSearch(query) {
    try {
        let url = '/api/recommend/' + query
        console.log(url)
        let res = await fetch(url)
        res = res.json()
        return res
    } catch (e) {
        console.log(e)
    }
}