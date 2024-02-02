import express from "express";
import { getProperty, getAllProperty, updateProperty, deleteProperty,newProperty } from "../controller/propertyController";


const router = express.Router();

router.get('/', getAllProperty)
router.post('/', newProperty)
router.post('/:id', getProperty)
router.put('/update/:id', updateProperty)
router.delete('/delete/:id', deleteProperty)

export default router;