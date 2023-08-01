// facebook.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as Strategy from 'passport-facebook-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook-token',
) {
  constructor(private readonly configService: ConfigService) {
    const id = configService.get('FACEBOOK_APP_ID');
    console.log(`==== id ===`);
    console.log(id);
    console.log('==== end log ===');

    super({
      clientID: id,
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Handle the user data from Facebook and implement your signup/login logic here
    // For example, create or find a user in your database and return it.
    return {
      profile,
      accessToken,
    };
  }
}
