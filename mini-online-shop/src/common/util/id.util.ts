import { IdDto } from '../dto/id.dto';

export function wrapId(idOrIds: number): IdDto;
export function wrapId(idOrIds: number[]): IdDto[];
export function wrapId(idOrIds: number | number[]) {
  if (Array.isArray(idOrIds)) {
    const ids = idOrIds;
    return ids.map((id) => ({ id }));
  }

  const id = idOrIds;
  return { id };
}

export const idDtoIdentifier = (dto: IdDto) => dto.id;
