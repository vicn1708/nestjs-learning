import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  //* Handle upload file
  async uploadFileToDb(filePath: string) {
    return this.create({
      image: filePath,
      created_at: Date.now(),
    });
  }
}
