import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  //interface
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run soemthing before a request is handled
    //by the request handler
    console.log('Im running before the handker', context);

    return handler.handle().pipe(
      map((data: any) => {
        //Run something before thr respone is sent out))
        console.log('Im running after the response is sent out', data);
      }),
    );
  }
}