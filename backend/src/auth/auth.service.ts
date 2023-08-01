import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User, UserRole } from 'src/entities/user.entity';
import {
  CheckUsernameDto,
  ValidResponseDto,
  LoginDto,
  RegisterAdminDto,
  RegisterDto,
  SendForgotPasswordDto,
  SendVerificatioEmailDto,
  VerificatonEmailDto,
  VerificatonForgotPasswordDto,
} from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Verification,
  VerificationAction,
} from 'src/entities/verification.entity';
import { APP_NAME, EMAIL_SENDER, sendEmail } from 'src/utils/email';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
  ) {}

  async facebookLoginCallback(email: any) {
    const user = await this.userService.findOne({ where: { email } });
    if (user) {
      // In production, you might want to use a stronger JWT secret and signOptions
      const token = await this.generateToken(user);
      return { user, token };
    }
  }

  async googleLoginCallback({
    email,
    name,
    picture,
  }: {
    email: string;
    name: string;
    picture: string;
  }) {
    const user = await this.userService.findOne({ where: { email } });
    if (user) {
      // In production, you might want to use a stronger JWT secret and signOptions
      const token = await this.generateToken(user);
      return { user, token };
    }
  }

  async generateToken(user: User, role?: UserRole): Promise<string> {
    const payload = {
      id: user.id,
      role: role || UserRole.USER,
      is_verified: user.is_verified,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async checkUsername({
    username,
  }: CheckUsernameDto): Promise<ValidResponseDto> {
    const emailUsername = await this.userService.findOne({
      where: { username },
    });

    return {
      valid: !Boolean(emailUsername),
    };
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { id: userId },
    });

    return user;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('invalid email or password');
    }

    const access_token = await this.generateToken(user);
    delete user.password;
    return {
      access_token,
      user,
    };
  }

  async register(body: RegisterDto) {
    const { password, email, username } = body;
    const emailCheck = await this.userService.findOne({
      where: { email },
    });

    if (emailCheck) {
      throw new BadRequestException('email already registered');
    }

    const emailUsername = await this.userService.findOne({
      where: { username },
    });

    if (emailUsername) {
      throw new BadRequestException('username already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.save({
      ...body,
      password: hashedPassword,
    });

    const access_token = await this.generateToken(user);
    delete user.password;
    return {
      access_token,
      user,
    };
  }

  async adminRegister({
    email,
    password,
    first_name,
    last_name,
  }: RegisterAdminDto) {
    const emailCheck = await this.userService.findOne({
      where: { email },
    });

    if (emailCheck) {
      throw new BadRequestException('email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.save({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return {
      message: 'Success',
    };
  }

  async adminLogin({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException('invalid email or password');
    }

    const access_token = await this.generateToken(user);
    delete user.password;
    return {
      access_token,
      user,
    };
  }

  async verificationEmail({ email, code }: VerificatonEmailDto) {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const check = await this.verificationRepository.findOne({
      where: {
        user_id: user.id,
        code,
        action: VerificationAction.EMAIL_VERIFICATION,
        is_active: true,
      },
    });
    if (!check) {
      throw new BadRequestException('invalid verification code');
    }

    await this.userService.update({ id: user.id }, { is_verified: true });
    await this.verificationRepository.update(
      { id: check.id },
      { is_active: false },
    );

    const access_token = await this.generateToken(user, UserRole.ADMIN);
    delete user.password;
    user.is_verified = true;
    return {
      access_token,
      user,
    };
  }

  async sendVerificationEmail({ email }: SendVerificatioEmailDto) {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const digits = '0123456789';

    const otpLength = 4;

    let otp = '';

    for (let i = 1; i <= otpLength; i++) {
      const index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }

    await this.verificationRepository.save({
      user_id: user.id,
      code: otp,
      action: VerificationAction.EMAIL_VERIFICATION,
    });

    const templateEmail = {
      from: {
        name: APP_NAME,
        address: EMAIL_SENDER,
      },
      to: email,
      subject: 'Account verification',
      html: `<p>Thank you for registering.<br/>Enter the following OTP code: <strong>${otp}</strong><br/><br/>Keep your OTP code secure and do not share it with anyone.</p>`,
    };
    return sendEmail(templateEmail);
  }

  async sendForgotPassword({ email }: SendForgotPasswordDto) {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('user not found');
    }

    const digits = '0123456789';

    const otpLength = 4;

    let otp = '';

    for (let i = 1; i <= otpLength; i++) {
      const index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }

    await this.verificationRepository.save({
      user_id: user.id,
      code: otp,
      action: VerificationAction.FORGOT_PASSWORD,
    });

    const templateEmail = {
      from: {
        name: APP_NAME,
        address: EMAIL_SENDER,
      },
      to: email,
      subject: 'Reset password',
      html: `<p>Enter the following OTP code: <strong>${otp}</strong><br/><br/>Keep your OTP code secure and do not share it with anyone.</p>`,
    };
    return sendEmail(templateEmail);
  }

  async verificationForgotPassword(dto: VerificatonForgotPasswordDto) {
    const user = await this.userService.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const check = await this.verificationRepository.findOne({
      where: {
        code: dto.code,
        user_id: user?.id,
        action: VerificationAction.FORGOT_PASSWORD,
      },
    });

    if (!check) {
      throw new BadRequestException('invalid verification code');
    }

    await this.userService.update(
      { id: user.id },
      { password: bcrypt.hashSync(dto.password, 10) },
    );

    await this.verificationRepository.update(
      { id: check.id },
      { is_active: false },
    );
    return {
      message: 'success',
    };
  }
}
