import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiPaginationQuery = () => {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Default: 10',
    }),
    ApiQuery({ name: 'sort', required: false }),
  );
};
