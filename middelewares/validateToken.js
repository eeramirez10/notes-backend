import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization && !authorization?.toLowerCase().startsWith('bearer')) {
    return res.status(403).json({ ok: false, error: 'no hay token en la peticion' })
  }
  const token = authorization.split(' ')[1]

  const decodeToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodeToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodeToken

  req.userId = userId

  next()
}
