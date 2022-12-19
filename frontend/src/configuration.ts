import axios from "axios";

export const BASE_API_URL =
  process.env.NODE_ENV != "development"
    ? `${process.env.PUBLIC_URL}/api`
    : "http://localhost:3000/api";

export const WEBSOCKET_URL =
  process.env.NODE_ENV != "development"
    ? `${window.location.protocol === "https:" ? "wss" : "ws"}://${
        window.location.hostname
      }:${window.location.port}/ws`
    : "ws://localhost:3000/ws";

let FHIR_SERVER_PUBLIC_URL = "http://localhost:8080/fhir";

async function fetchFHIR() {
  try {
    let r = await axios.get(`${BASE_API_URL}/meta/fhir-public-url`);
    FHIR_SERVER_PUBLIC_URL = r.data;
  } catch {}
}

fetchFHIR();

export const GetFHIRPublicUrl = () => FHIR_SERVER_PUBLIC_URL;
