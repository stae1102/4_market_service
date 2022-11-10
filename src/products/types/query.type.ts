import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import SortType from '../enums/sortType.enum';

export class InquiryQuery {
  page = 1;
  sortType: SortType = SortType.RECENT;

  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  category?: string[];

  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  nation?: string[];

  inputText?: string;
}
