const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './uploads')
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname)
  }
})
const fileFilter = (request, file, cb) => {
  const fm = file.mimetype.toLowerCase()
  if (fm === 'image/png' || fm === 'image/jpeg' || fm === 'image/jpg' || fm === 'image/gif') {
    cb(null, true)
  } else {
    cb(new Error('extention not supported').parse, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 },
  fileFilter
})

const uploadImages = upload.single('photo')

module.exports = {
  uploadFiles: uploadImages
}
