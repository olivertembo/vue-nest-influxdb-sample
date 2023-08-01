// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    console.log(`==== clientID ===`);
    console.log(clientID);
    console.log('==== end log ===');

    super({
      clientID: clientID,
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    // Handle the user data from Google and implement your signup/login logic here
    // For example, create or find a user in your database and return it.
    return {
      profile,
      accessToken,
    };
  }
}
