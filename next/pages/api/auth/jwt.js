import { parseCookies } from 'nookies'

export default async (req, res) => {
  const cookie = parseCookies({ req })
  try {
    if (!cookie?.jwt) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    return res.status(200).json({ jwt: cookie?.jwt })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
