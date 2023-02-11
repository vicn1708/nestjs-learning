import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('./loginGoogle.ejs')
  getHome() {
    return { message: 'hellofsdfs' };
  }
  //   root(@Res() res: Response) {
  //     return res.render('./home.ejs');
  //   }
}
