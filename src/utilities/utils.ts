import { BACKEND_URL } from "../env";

export function checkPassword(password: string) {
  const numberPtn = new RegExp("[0-9]");
  const charPtn = new RegExp("[A-Za-z]");
  const specialCharPtn = new RegExp("\\W");

  return (
    numberPtn.test(password) &&
    charPtn.test(password) &&
    specialCharPtn.test(password)
  );
}
export function checkEmail(email: string) {
  const patterncheck = new RegExp("^\\w+@\\w+\\.(com|edu\\.vn|vn|gov)$");
  return patterncheck.test(email);
}
export function checkPhonenumber(phonenumber: string) {
  const patterncheck = new RegExp("^([0-9]{10,11})|(\\+(84)[0-9]{9,10})$");
  return patterncheck.test(phonenumber);
}
export function toMoney(realNumber: number) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(realNumber);
}

export async function checkUserIdentity() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.token && user.username) {
    const response = await fetch(
      BACKEND_URL + `/auth?username=${user.username}&token=${user.token}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
  return new Promise((resolve, rejects) => {
    resolve({ isAuthenticated: false });
  });
}
