import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import cloudinary from 'src/config/cloudinay/cloudinary.config';
import { ImgDocument, Imgs } from './schema/img.schema';
import { Model } from 'mongoose';
import { CreateImgDto } from './dtos/create-img.dto';

@Injectable()
export class UploadFileService {
  constructor(@InjectModel(Imgs.name) private imgModel: Model<ImgDocument>) {}

  async create(createImgDto: CreateImgDto): Promise<Imgs> {
    const createImg = new this.imgModel(createImgDto);
    return createImg.save();
  }

  //* Handle upload single file
  async uploadSingleFile(file: any) {
    const res = cloudinary.uploader.upload(file.path, {
      public_id: `nestjs-${Date.now()}`,
      resource_type: 'auto',
      folder: 'nestjs_learning',
    });

    res
      .then((data) => {
        return this.create({
          image: data.secure_url,
          created_at: Date.now(),
        }).then((img) => console.log(img));
      })
      .catch((err) => {
        console.log(err);
        return { msg: 'upload fail' };
      });
  }

  //* Handle upload multiple file
  async uploadMultipleFile(files: Array<any>) {
    console.log(files);

    files.forEach((file) => {
      this.uploadSingleFile(file);
    });
  }
}
