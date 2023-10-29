export const handleErrors = (error, req, res, next) => {
  console.log(error)

  return res.status(500).json({
    ok: false,
    msg: 'Hubo un erorr'
  })
}
