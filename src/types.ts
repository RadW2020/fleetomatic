export const DB_ERRORS = [
  '23502', // NOT NULL VIOLATION
  '23503', // FOREIGN KEY VIOLATION
];
export interface IFilter {
  marca?: string;
  modelo?: number;
  color?: string;
  estado?: ESTADO;
  asignado?: boolean;
  asunto?: string;
  descripcion?: string;
  tipo?: TIPO;
}


export enum ESTADO {
  Activo = 'ACTIVO',
  Inactivo = 'INACTIVO',
}


export enum TIPO {
  MECANICO = 'MECANICO',
  MULTA = 'MULTA',
  MANTENIMIENTO = 'MANTENIMIENTO',
  ACCIDENTE = 'ACCIDENTE',
}
