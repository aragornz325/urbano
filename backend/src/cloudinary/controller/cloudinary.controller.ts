import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

import { CloudinaryService } from '../services/cloudinary.service';
import { Express } from 'express';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { Multer } from 'multer';  

@Controller('image')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Uploads an image to Cloudinary.
   *
   * @route POST /image/upload
   * @param {Express.Multer.File} file - The image file to upload.
   * @returns {Promise<StandardResponse>} Standardized response object with the uploaded image information.
   * @throws {HttpException} If no file is provided or if an error occurs during upload.
   *
   * @description This endpoint allows uploading an image to Cloudinary.
   * It accepts image files (jpeg, jpg, png, gif) with a maximum size of 5 MB.
   *
   * @example
   * // Usage example with curl:
   * curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/image.jpg" http://your-api.com/image/upload
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin, Role.Editor)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const ext = extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext) && allowedTypes.test(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.cloudinaryService.uploadFile(file);
      return { url: result.url }; // Asegúrate de que esto cumple con StandardResponse
    } catch (error) {
      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Deletes an image from Cloudinary.
   *
   * @route DELETE /image
   * @param {object} body - The body containing the URL of the image to delete.
   * @param {string} body.url - The URL of the image to delete.
   * @returns {Promise<void>} A promise that resolves when the image is deleted.
   * @throws {HttpException} If an error occurs during the deletion process.
   */
  @Delete()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin, Role.Editor)
  async deleteImage(@Body() body: { url: string }): Promise<void> {
    try {
      await this.cloudinaryService.deleteImageByUrl(body.url);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
