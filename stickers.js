const router = module.exports = require('express').Router();


router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

const uuid = require('uuid/v4')
let stickers = [
  { id: '89bf4a36-3b74-4f79-ae80-c6ec9af8ea50', brand: 'Celestial Seasonings', name: 'Sleepytime' }
]

function getAll(req, res, next)  {
  res.status(200).json ({ data: stickers });
}

function getOne(req, res) {
  const { id } = req.params
  const sticker = _.find(stickers, { id })

  if (sticker) {
    res.status(200).json({ data: sticker })
  } else {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  }
}

function create(req, res) {
  const { brand, name } = req.body
  const sticker = { brand, name }

  if (brand && name) {
    sticker.id = uuid()
    stickers.push(sticker)
    res.status(201).json({ data: sticker })
  } else {
    res.status(400).json({ error: { message: 'Could not create new sticker.' }})
  }
}
function update (req, res) {
  const { id } = req.params
  const previous = _.findIndex(stickers, { id })

  if (previous === -1) {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  } else {
    const { brand, name } = req.body

    if (brand && name) {
      const { id } = stickers[previous]
      stickers[previous] = { id, brand, name }
      res.status(200).json({ data: stickers[previous] })
    } else {
      res.status(400).json({ error: { message: 'Could not update existing sticker.' }})
    }
  }
}


function remove (req, res) {
  const { id } = req.params
  const previous = _.findIndex(stickers, { id })

  if (previous === -1) {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  } else {
    stickers.splice(previous, 1)
    res.status(204).json()
  }
}

