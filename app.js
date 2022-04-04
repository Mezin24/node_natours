const fs = require('fs')
const express = require('express')
const app = express()
const morgan = require('morgan')

// 1) Midlewares
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString()
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
)

// 2) Routes Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    reqTime: req.reqTime,
    data: {
      tours,
    },
  })
}

const getTour = (req, res) => {
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
}

const postTour = (req, res) => {
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
}

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Tour was updated!',
    },
  })
}

const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
}
//  3) Routes
///// SEPARETE
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', postTour)

// app.get(`/api/v1/tours/:id`, getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

///// CHAINING
app.route('/api/v1/tours').get(getAllTours).post(postTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

// 4) Turn on the server
const port = 3000
app.listen(port, () => {
  console.log(`Start working on a port ${port}`)
})
