import { ValidationPipe } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ValidationError } from 'class-validator';

export class AppValidationPipe extends ValidationPipe {
  private amaderErrorFormatter(arr: ValidationError[]): any {
    const error: any = {};
    arr.map((errObj: any) => {
      error[errObj['property']] = Object.keys(errObj['constraints'])
        .map(constrains => `${errObj['constraints'][constrains]}`)
        .join('.');
    });

    return {
      errors: error,
      statusCode: this.errorHttpStatusCode,
    };
  }
  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors = this.amaderErrorFormatter(validationErrors);
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
  }
}
