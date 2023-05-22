import { BACKEND_URL } from "../env";

export enum EAdminPage {
  PRODUCT,
  CATEGORY,
  PROFILE,
  ORDER,
  CUSTOMER,
}
export type LayoutProps = {
  children: React.ReactNode;
};
export type Ward = {
  name: string;
};
export type District = {
  name: string;
  wards: Ward[];
};
export type Province = {
  name: string;
  districts: District[];
};
export interface Product {
  uniqueKey?: string;
  id: string;
  infoid: string;
  size: string;
  colorcode: string;
  colorname: string;
  totalbought: number;
  quantity: number;
  state: number;
  price: number;
  name: string;
  promotedprice: number;
  imageurl: string;
  description: string;
}
export type CartItem = {
  id: string;
  name: string;
  size: string;
  color: string;
  colorName: string;
  quantity: number;
  originalPrice: number;
  promotedPrice: number; // actualprice that user have to pay
  imgUrl: string;
};

export type User = {
  username: string;
  phonenumber: string;
  email: string;
  address: string;
};

export type Cart = {
  information: User;
  items: CartItem[];
};

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
  const formated = formatter.format(realNumber);

  return formated.substring(1);
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
    if (data.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  }
  return new Promise((resolve, reject) => {
    resolve({ isAuthenticated: false });
  });
}

function matchUnicode(strToMatch: string, searchStr: string) {
  let regex = "";
  for (let x in searchStr.split("")) {
  }
}
