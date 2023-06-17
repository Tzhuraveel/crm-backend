import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Transform(({ value }) => +value)
  @Min(1)
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({
    minimum: 10,
    maximum: 25,
    default: 25,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(25)
  @IsOptional()
  readonly take?: number = 25;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional({
    example: 'email',
    description:
      'If you want to sort from largest to smallest, then' +
      ' you need to put "-" in front of the property. If you want sort from smallest to largest, you only need to' +
      ' send the property',
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  sort?: string;
}
