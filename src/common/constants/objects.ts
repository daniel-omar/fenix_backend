export class Objects {

  constructor() {
    throw new Error('Cannot instantiate a static class');
  }

  static EstadosOrden = {
    POR_AGENDAR: 1,
    ASIGNADO_TECNICO: 2,
    EN_PROCESO: 3,
    PENDIENTE_LIQUIDAR: 4,
    LIQUIDADO: 5,
    ANULADO: 6
  };

  static EstatusEstadosOrden = {
    ACTIVO: true,
    INACTIVO: false
  };

  static EstatusMaterial = {
    ACTIVO: true,
    INACTIVO: false
  };

  static EstatusCategoriaMaterial = {
    ACTIVO: true,
    INACTIVO: false
  };

  static EstatusUsuario = {
    ACTIVO: true,
    INACTIVO: false
  };


}