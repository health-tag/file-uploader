export const BASE_API_URL =
  process.env.NODE_ENV != "development"
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:3000/api";

export const FHIR_SERVER_URL = process.env.FHIR_SERVER_URL ?? "http://localhost:8080/fhir";
//export const WEB_SOCKET_PORT = process.env.WEB_SOCKET_PORT ?? "";
//export const WEBSOCKET_URL = `${new URL(BASE_API_URL).protocol}//${new URL(BASE_API_URL).host}`;