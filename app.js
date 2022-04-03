const fs = require('fs')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
)

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

app.get(`/api/v1/tours/:id`, (req, res) => {
  const id = +req.params.id
  const tour = tours.find((el) => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID not found',
    })
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1
  const newTour = { id, ...req.body }
  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Adding')
    }
  )
  res.send('Done')
})

app.listen(port, () => {
  console.log(`Start working on a port ${port}`)
})
