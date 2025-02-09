import express from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js'

const Router = express.Router()

Router.get('/', getProducts)
Router.post('/', createProduct)
Router.put('/:id', updateProduct)
Router.delete('/:id', deleteProduct)

export default Router