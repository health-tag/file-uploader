export const BASE_API_URL =
  process.env.NODE_ENV != "development"
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:3000/api";

export const FHIR_SERVER_URL =
  process.env.FHIR_SERVER_URL ?? "http://localhost:8080/fhir";

export const WEBSOCKET_URL =
  process.env.NODE_ENV != "development"
    ? `${window.location.protocol === "https:" ? "wss" : "ws"}://${
        window.location.hostname
      }:${window.location.port}/ws`
    : "ws://localhost:3000/ws";