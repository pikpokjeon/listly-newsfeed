const API_URL = key => `https://www.listly.io/api/single?key=${key}&selected=1&arrange=y&href=n&file=json&ignore_warning=y`
const API_TOKEN = '3UKjPBAXjA8t323RRXPo4fA46HWPNKHR'

export const Fetch = async ( API_TOKEN, key ) =>
{
    const fetched = await fetch( API_URL( key ), { method: 'GET', headers: { 'Authorization': API_TOKEN } } )
    return fetched.json()

}

// otu5D4z2
// 279iyNCOZCQ4BNq0UHD7fiHy3dZDR7gX