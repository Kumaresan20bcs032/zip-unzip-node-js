import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'
import zlib from 'zlib'
import * as response from '../utils/response.util'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: async (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
export default upload


export const convertZipFile = async (req, res) => {
    try {
        await pipeline(
            fs.createReadStream(path.resolve(req.files[0].path)),
            zlib.createGzip(),
            fs.createWriteStream(`${path.resolve(req.files[0].path)}.gz`)
        )
        //const f=fs.createReadStream(path.resolve(req.files[0].path))
        //console.log('file-path:', path.resolve(req.files[0].path))
        // console.log(req.files)
        // console.log(`${path.resolve(req.files[0].path)}.gz`)
        return res.sendFile(`${path.resolve(req.files[0].path)}.gz`)

    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}

export const convertUnZipFile = async (req, res) => {
    try {
        //return res.send('123')
        await pipeline(
            fs.createReadStream('./src/uploads/7301c35-India-ID1.png.gz'),
            zlib.createUnzip(),
            fs.createWriteStream('./src/uploads/unzip-7301c35-India-ID1.png')
        )
        console.log(path.resolve('./src/uploads/unzip-7301c35-India-ID1.png'))
        return res.sendFile(path.resolve('./src/uploads/unzip-7301c35-India-ID1.png'))          
    }
    catch (error) {
        return response.sendError(res, 500, error.message)
    }
}


