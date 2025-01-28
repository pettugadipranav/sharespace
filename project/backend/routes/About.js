const express = require('express')
const router = express.Router()

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', (req, res) => {
  res.send('about')
})
// define the about route
router.get('/pic', (req, res) => {
  res.send('About pic')
})

module.exports = router