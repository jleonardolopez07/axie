const { Router } = require('express');
const { buscador } = require('../controllers/buscarBecado');

const router = Router();

router.get('/:becario/:becado', buscador)




module.exports = router;