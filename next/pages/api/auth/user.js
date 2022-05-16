import { parseCookies, destroyCookie } from 'nookies'
import { getUser } from '../../../services/Api/athenticator'

export default async (req, res) => {
  const cookie = parseCookies({ req })

  if (cookie?.jwt) {
    try {
      const user = await getUser(cookie.jwt)
      if (user) {
        return res.status(200).json(user)
      }
      destroyCookie({ res }, 'jwt', { path: '/' })
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
