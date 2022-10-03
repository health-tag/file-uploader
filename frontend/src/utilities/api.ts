import axios from "axios";

const API_PUBLIC_HOST = process.env.REACT_APP_PUBLIC_API_HOST;
const API_ADMIN_HOST = process.env.REACT_APP_ADMIN_API_HOST;

const url = (system: string, path: string) => {
  if (system === "public") {
    return `${API_PUBLIC_HOST}/${path}`;
  } else if (system === "admin") {
    return `${API_ADMIN_HOST}/${path}`;
  }
  return "";
};

const handleUserError = (error, navigate) => {
  if (error.response.status === 401) {
    navigate();
  }
};

const handleAdminError = (error, navigate) => {
  if (error.response.status === 401) {
  }
};

const getData = async (system, path, navigate) => {
  const token = localStorage.getItem("token") || "";
  if (token !== "") {
    try {
      const response = await axios.get(url(system, path), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: true,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/timeout");
      } else {
        return {
          status: false,
          message: "พบข้อผิดพลาด โปรดติดต่อ HealthTAG",
        };
      }
    }
  } else {
    navigate("/access-denied");
  }
};

const getEmergencyData = async (system, path) => {
  const token = localStorage.getItem("token_emergency") || "";
  if (token !== "") {
    try {
      const response = await axios.get(url(system, path), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: true,
        data: response.data,
      };
    } catch (error: any) {
      if (error.response.status === 401) {
      } else {
        return {
          status: false,
          message: "พบข้อผิดพลาด โปรดติดต่อ HealthTAG",
        };
      }
    }
  } else {
  }
};

const postData = async (system, path, body, navigate) => {
  const token = localStorage.getItem("token") || "";
  if (token !== "") {
    try {
      const response = await axios.post(
        url(system, path),
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        navigate("/admin/login");
      } else {
        return {
          status: false,
          message: "พบข้อผิดพลาด โปรดติดต่อ HealthTAG",
        };
      }
    }
  } else {
    navigate("/admin/login");
  }
};

export { getData, postData, getEmergencyData };
