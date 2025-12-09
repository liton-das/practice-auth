const { addCopunController, updateCopunController } = require('../../controllers/copunController')

const copunApi = require('express').Router()

copunApi.post('/add-copun',addCopunController)
copunApi.post('/update-copun',updateCopunController)

module.exports = copunApi