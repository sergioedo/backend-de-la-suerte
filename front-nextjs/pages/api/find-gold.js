import fetch from 'node-fetch'

export default async function handler(req, res) {
  const result = await fetch(`${process.env.API_SERVER_URL}/api/find-gold`, {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  })
  const data = await result.json()
  res.status(200).json(data.data)
}
