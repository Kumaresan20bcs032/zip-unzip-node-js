import express from 'express'
import * as zip from '../multer/upload-multer'
import upload from '../multer/upload-multer'
const router=express.Router()

//@POST
router.post('/upload',upload.any(),zip.convertZipFile)
//@GET
router.get('/unzip',zip.convertUnZipFile)
//@PUT

//@DELETE

export default router