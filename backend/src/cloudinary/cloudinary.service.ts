import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';


@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  /**
   * Uploads a file to Cloudinary.
   *
   * @param {Express.Multer.File} file - The file to upload.
   * @returns {Promise<UploadApiResponse>} A promise that resolves to the uploaded image.
   * @throws {HttpException} If the file is invalid or if an error occurs during the upload process.
   */
  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      if (!file || !file.buffer) {
        this.logger.error('Archivo no válido o vacío');
        return reject(
          new HttpException('Invalid or empty file', HttpStatus.BAD_REQUEST),
        );
      }

      this.logger.log('Archivo recibido, iniciando proceso de subida...');
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            this.logger.error(
              `Error en la subida a Cloudinary: ${error.message}`,
              JSON.stringify(error),
            );
            return reject(
              new HttpException(
                `Error uploading to Cloudinary: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }

          this.logger.log('Subida a Cloudinary exitosa');
          this.logger.debug(
            `Resultado de Cloudinary: ${JSON.stringify(result)}`,
          );
          resolve(result); // Devuelve el objeto completo de UploadApiResponse
        },
      );

      try {
        this.logger.log('Iniciando streaming del archivo a Cloudinary...');
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } catch (streamError) {
        this.logger.error(
          `Error durante el proceso de streaming: ${streamError.message}`,
          streamError,
        );
        reject(
          new HttpException(
            'Error during streaming process',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      }
    });
  }

  /**
   * Deletes an image from Cloudinary.
   *
   * @param {string} publicId - The public ID of the image to delete.
   * @returns {Promise<void>} A promise that resolves when the image is deleted.
   * @throws {HttpException} If an error occurs during the deletion process.
   */
  deleteImageByUrl(url: string): Promise<void> {
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = url.match(regex);
    const publicId = match ? match[1] : null;
  
    if (!publicId) {
      this.logger.error('cant get publicId from url');
      new HttpException('cant get publicId from url', HttpStatus.BAD_REQUEST);
    }
  
    return cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        this.logger.error('error deleting image', error);
        new HttpException('error deleting image', HttpStatus.INTERNAL_SERVER_ERROR);
        return;
      }
      console.log("Imagen eliminada exitosamente:", result);
    });
  }

}
