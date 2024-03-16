import express from 'express';
import { verifyToken } from '../utils/middlewares';
import UserController from '../controllers/UserController';
import CarController from '../controllers/CarController';
import CartController from '../controllers/CartController';

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);

router.post('/cars', verifyToken, CarController.postCar);
router.get('/cars', CarController.getCars);
router.get('/cars/:carId', CarController.getCar);
router.put('/cars/:carId', verifyToken, CarController.updateCar);
router.delete('/cars/:carId', verifyToken, CarController.deleteCar);

router.post('/cart', verifyToken, CartController.addToCart);
router.get('/cart', verifyToken, CartController.getCart);
router.delete('/cart/:id', verifyToken, CartController.deleteFromCart);
router.post('/checkout', verifyToken, CartController.checkout);

export default router;
