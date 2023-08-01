import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errorResponse: any = exception.getResponse();

    if (Array.isArray(errorResponse.message)) {
      errorResponse.message = errorResponse.message.join(', ');
    }

    if (status === 500) {
      this.logger.error(
        `HTTP Exception: ${status} - ${JSON.stringify(errorResponse)}`,
        exception.stack,
      );
    }

    response.status(status).json(errorResponse);
  }
}
