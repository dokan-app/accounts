import {} from 'class-validator';
import { AuthPayload } from 'src/auth/auth.dto';

export interface ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
  data: DataModel[];
}

export class PaginationQueryDTO {
  page?: number;

  limit?: number;

  sort?: string;
}


export interface AppRequest extends Request{
  user: AuthPayload
}