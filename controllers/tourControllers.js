const fs = require('fs')
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
)

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    reqTime: req.reqTime,
    data: {
      tours,
    },
  })
}

exports.getTour = (req, res) => {
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

exports.postTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
