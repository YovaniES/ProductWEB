// const ENVIROMENT: string = 'DEV';
const ENVIROMENT: string = 'PROD';

let PATH_VISOR_DYNAMO  = '';
let PATH_BACK_NET      = '';
let PATH_FACTURACION   = '';
let PATH_MANTENIMIENTO = '';
let AUTH_API = '';
let API_SAVE_DATA_IMPORT = '';

switch (ENVIROMENT) {
  case 'DEV':
    // PATH_BACK_NET  = 'https://localhost:3061/api/configurador/';
    break;
  case 'QA':
    AUTH_API = '';
    break;
  case 'PROD':
    AUTH_API = 'http://backendpruebasdev.indratools.com/api/Auth/' //SUBSITE33 (LOGIN CON BD_DynamoSupport_PROD)

    // AUTH_API = 'https://localhost:7012/api/Auth/'

    PATH_VISOR_DYNAMO  = 'http://visordynamosupportapi.indratools.com/'; //SUBSITE 31

    API_SAVE_DATA_IMPORT = 'https://localhost:7247/api/importar' // CONECTADO con: db_support

    PATH_BACK_NET = 'http://backdynamosupport.indratools.com/api/configurador/' //SUBSITE21

    // PATH_FACTURACION   = 'https://facturaciondynamo.azurewebsites.net/api'
    PATH_FACTURACION   = 'http://facturacionwebapi.indratools.com/api'//SUBSITE34 (CON BD_DynamoSupport_PROD)
    PATH_MANTENIMIENTO = 'https://dmantenimientodynamo.azurewebsites.net/api'
    break;
  default:
    break;
}

// LOGIN
export const AUTH_SESSION = AUTH_API + 'login';

// REGISTRO-DYNAMO
export const API_DYNAMO = PATH_BACK_NET + 'ExecuteQuery';
export const BASE_LIQUIDACION    = PATH_FACTURACION + '/Facturacion';
export const BASE_VENTADECLARADA = PATH_FACTURACION + '/VentaDeclarada';
export const BASE_CERTIFICACION  = PATH_FACTURACION + '/Certificacion';
export const BASE_HIST_LIQ       = PATH_FACTURACION + '/HistoricoFacturacion';
export const BASE_MANTENIMIENTO  = PATH_MANTENIMIENTO;

// DATA VISOR DASHBOARD
export const API_VISOR =  PATH_VISOR_DYNAMO + 'api/visor/';

// API GUARDAR DATA IMPORTADO DESDE EXCELL
export const PATH_IMPORT_LIQ = API_SAVE_DATA_IMPORT;

export const API_CORREO = 'https://localhost:44395/api/email'; //NO SE USA EN DYNAMOSUPPORT

// http://localhost:5167/swagger/v1/swagger.json // LOGIN SEGURIDAD WEB

// PATH_BACK_NET  = 'http://backsupport.indratools.com/api/configurador/';


// NOTA: SUBSITE 28 => http://saveimporteddata.indratools.com
// NOTA: SUBSITE 33 => 'http://backendpruebasdev.indratools.com' | BACKEN SOLO PRUEBAS EN DEV
// changestatevacations.indratools.com : NOTA => SE ESTA USANDO PARA PRUEBAS DE DEV. Ya luego regresar con su API de cambiar estado de las vacaciones. 13/09/2023



// OJO****
// PATH_BACK_NET = 'http://changestatevacations.indratools.com/api/configurador/' //BACK DE PRUEBA OJO | SUBSITE 25
