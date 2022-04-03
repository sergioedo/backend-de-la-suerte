import fetch from 'node-fetch'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
  if (session) {
    const strapiUserToken = session.jwt.jwt
    const result = await fetch(`${process.env.API_SERVER_URL}/api/find-gold`, {
      headers: {
        'Authorization': `Bearer ${strapiUserToken}`
      }
    })
    console.log(result)
    const data = await result.json()
    res.status(result.status).json(data.data)
  } else {
    res.statusCode = 401
    res.end('Unauthorized')
  }
}
