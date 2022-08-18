export const BASE_URL = "https://api.leonov.nomoredomains.sbs";

const checkResponse = (response) => {
  console.log("response ok: ", response);
  if (response.ok) {
    return response.json();
  }

  return response.json().then((err) => {
    throw err;
  });
};
export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};
export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZjYTc0YmY0ZDZlODczNTcwNzIxMGIiLCJpYXQiOjE2NjA4MjMzNDgsImV4cCI6MTY2MDkwOTc0OH0.i20WCl5B-EYQP8U-nzaQ7f7O5gJ2RYwUUipakTvgrDY",
    },
  }).then((res) => res.json());
};
