import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import {
  CheckUsernameDto,
  ValidResponseDto,
  LoginDto,
  RegisterDto,
  SendForgotPasswordDto,
  SendVerificatioEmailDto,
  VerificatonEmailDto,
  VerificatonForgotPasswordDto,
  RegisterResponseDto,
  LoginResponseDto,
} from './auth.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: LoginResponseDto,
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: RegisterResponseDto,
  })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('send_verification_email')
  sendVerificationEmail(@Body() body: SendVerificatioEmailDto) {
    return this.authService.sendVerificationEmail(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verification_email')
  verificaitonEmail(@Body() body: VerificatonEmailDto) {
    return this.authService.verificationEmail(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('check_username')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ValidResponseDto,
  })
  checkUsername(@Body() body: CheckUsernameDto) {
    return this.authService.checkUsername(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('send_forgot_password')
  sendForgotPassword(@Body() body: SendForgotPasswordDto) {
    return this.authService.sendForgotPassword(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verification_forgot_password')
  verificationForgotPassword(@Body() body: VerificatonForgotPasswordDto) {
    return this.authService.verificationForgotPassword(body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: User,
  })
  getProfile(@Request() req) {
    const userId = req.user?.id;
    return this.authService.getProfile(userId);
  }
}
