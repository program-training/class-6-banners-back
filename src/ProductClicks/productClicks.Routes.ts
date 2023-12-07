import express, { Router } from 'express';
import productClicksController from './productClicks.Controller';
const router: Router = express.Router();

router.get('/', productClicksController.getAllProductClicks);
router.get('/:id', productClicksController.getProductClicksByBannerId);




export default router;
