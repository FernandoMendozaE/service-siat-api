import { v2 as cloudinary } from 'cloudinary'
import { CLOUD_NAME, API_KEY, API_SECRET } from '../util/config'

// * Config cloudinary para subir files
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
})

// * Función para subir archivos a cloudinary
export const uploadFile = async (filePath: string | null, typefile: string) => {
  let file = null
  // ! Arreglar Cloudinary por la dependecia
  // if (filePath) {
  //   const result = await cloudinary.uploader.upload(filePath, {
  //     resource_type: typefile === 'video' ? 'video' : '',
  //     folder: typefile === 'video' ? 'affiliation-api/video' : 'affiliation-api/pdf'
  //   })
  //   file = {
  //     url: result.secure_url,
  //     public_id: result.public_id
  //   }
  // }

  return file
}

// * Función para eliminar imágenes de cloudinary
export const deleteFile = async (id: string, typefile: string) => {
  return await cloudinary.uploader.destroy(id, {
    resource_type: typefile === 'video' ? 'video' : ''
  })
}
