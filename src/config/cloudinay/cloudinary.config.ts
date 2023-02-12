import * as Cloudinary from 'cloudinary';

//* connect cloudinary
const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: 'dtvqj8h4b',
  api_key: '451311286662286',
  api_secret: 'gHl9zJu8PqQ2OJitnrHZPssfiFY',
});

export default cloudinary;
