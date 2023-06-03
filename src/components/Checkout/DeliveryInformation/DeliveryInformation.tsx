import React, { useState, useEffect, useRef } from "react";
import {
  Cart,
  District,
  Province,
  User,
  Ward,
  checkEmail,
  checkPhonenumber,
} from "../../../utilities/utils";
import PROVINCES from "../../../utilities/provinces.json";
import { BACKEND_URL, CART_KEY } from "../../../env";
import fs from "fs";
import { io } from "socket.io-client";
import { useUser } from "../../../contexts/UserContext/UserContext";
import { Fade } from "react-bootstrap";
import { useCart } from "../../../contexts/CartContext/CartContext";
import { useNavigate } from "react-router";
// event: React.ChangeEvent<HTMLSelectElement>

const enum ChangeType {
  EMAIL = "email",
  RECEIVENAME = "receiveName",
  PHONENUMBER = "phonenumber",
  ADDRESS = "address",
}

function DeliveryInformation() {
  const [user] = useUser();
  const [cartItems] = useCart();
  const [cart, setCart] = useState({
    information: {
      username: JSON.parse(localStorage.getItem("user") || "{}").username,
      receiveName: user?.fullname,
      address: {
        home: "",
        district: "",
        province: "",
        ward: "",
      },
      email: user?.email,
      phonenumber: user?.phonenumber,
    } as User,
    items: cartItems,
  } as Cart);
  const navigate = useNavigate();
  useEffect(() => {
    setCart({ ...cart, items: cartItems });
  }, [cartItems]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>(PROVINCES);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const handleProvinceChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const province = PROVINCES.find((value) => {
      if (value.name == e.target.value) {
        return true;
      }
      return false;
    });

    setDistricts(province?.districts!);
    setWards([]);
  };

  const handleDistrictChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const district = districts.find((value) => {
      if (value.name == e.target.value) {
        return true;
      }
      return false;
    });
    setWards(district?.wards!);
  };
  function reducer(type: ChangeType, valueToChange: any) {
    if (type == ChangeType.ADDRESS) {
      setCart({
        ...cart,
        information: {
          ...cart.information,
          address: {
            ...cart.information.address,
            [valueToChange.type]: valueToChange.value,
          },
        },
      });
    } else {
      setCart({
        ...cart,
        information: {
          ...cart.information,
          [type]: valueToChange,
        },
      });
    }

    setIsSubmiting(false);
  }
  return (
    <div className="col-md-7 col-lg-8">
      <h4 className="mb-3">Thông tin vận chuyển</h4>
      <form className="needs-validation">
        <div className="row g-3">
          <div className="col-sm-12">
            <label htmlFor="fullName" className="form-label">
              Họ Tên
            </label>
            <input
              type="text"
              className={`${
                isSubmiting && cart.information.receiveName == ""
                  ? "is-invalid"
                  : ""
              } form-control`}
              value={cart.information.receiveName}
              id="fullName"
              placeholder="Full name"
              required={true}
              onChange={(e) => {
                reducer(ChangeType.RECEIVENAME, e.target.value);
              }}
            />
            {isSubmiting && cart.information.receiveName == "" && (
              <small className="text-danger">Username is required</small>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="tel" className="form-label">
              Số điện thoại <span className="text-muted"></span>
            </label>
            <input
              type="tel"
              className={`${
                isSubmiting && cart.information.phonenumber == ""
                  ? "is-invalid"
                  : ""
              } form-control`}
              id="tel"
              value={cart.information.phonenumber}
              placeholder="Phone number"
              required={true}
              onChange={(e) => {
                reducer(ChangeType.PHONENUMBER, e.target.value);
              }}
            />
            {isSubmiting && cart.information.phonenumber == "" && (
              <small className="text-danger">Phonenumber is required</small>
            )}
            {isSubmiting &&
              !checkPhonenumber(cart.information.phonenumber) &&
              cart.information.phonenumber != "" && (
                <small className="text-danger">
                  Phonenumber is not in valid format
                </small>
              )}
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email <span className="text-muted">(Required)</span>
            </label>
            <input
              type="email"
              className={`${
                isSubmiting && cart.information.email == "" ? "is-invalid" : ""
              } form-control`}
              id="email"
              placeholder="you@gmail.com"
              value={cart.information.email}
              onChange={(e) => {
                reducer(ChangeType.EMAIL, e.target.value);
              }}
            />
            {isSubmiting && cart.information.email == "" && (
              <small className="text-danger">Email is required</small>
            )}
            {isSubmiting &&
              !checkEmail(cart.information.email) &&
              cart.information.email != "" && (
                <small className="text-danger">
                  Email is not in valid format
                </small>
              )}
          </div>

          <div className="col-md-4">
            <label htmlFor="province" className="form-label">
              Tỉnh/Thành
            </label>
            <select
              className="form-select"
              id="province"
              required={true}
              onChange={(e) => {
                handleProvinceChange(e);
                reducer(ChangeType.ADDRESS, {
                  type: "province",
                  value: e.target.value,
                });
              }}
            >
              <option value="">Choose...</option>
              {provinces.length > 0 &&
                provinces.map((province) => (
                  <option key={province.name} value={province.name}>
                    {province.name}
                  </option>
                ))}
            </select>
            {isSubmiting && cart.information.address.province == "" && (
              <small className="text-danger">Address is required</small>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="district" className="form-label">
              Quận/Huyện
            </label>
            <select
              className="form-select"
              id="district"
              required={true}
              onChange={(e) => {
                handleDistrictChange(e);
                reducer(ChangeType.ADDRESS, {
                  type: "district",
                  value: e.target.value,
                });
              }}
            >
              <option value="">Choose...</option>
              {districts.length > 0 &&
                districts.map((district) => (
                  <option key={district.name} value={district.name}>
                    {district.name}
                  </option>
                ))}
            </select>
            {isSubmiting && cart.information.address.district == "" && (
              <small className="text-danger">Address is required</small>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="ward" className="form-label">
              Phường/Xã
            </label>
            <select
              name="ward"
              className="form-select"
              id="ward"
              required={true}
              onChange={(e) => {
                reducer(ChangeType.ADDRESS, {
                  type: "ward",
                  value: e.target.value,
                });
              }}
            >
              <option value="">Choose...</option>
              {wards.length > 0 &&
                wards.map((ward) => (
                  <option key={ward.name} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
            </select>
            {isSubmiting && cart.information.address.ward == "" && (
              <small className="text-danger">Address is required</small>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Địa chỉ(ví dụ: số nhà 9, ngách 1, ngõ 43)"
              required={true}
              value={cart.information.address.home}
              onChange={(e) => {
                reducer(ChangeType.ADDRESS, {
                  type: "home",
                  value: e.target.value,
                });
              }}
            />
            {isSubmiting && cart.information.address.home == "" && (
              <small className="text-danger">Address is required</small>
            )}
          </div>
          {isSubmiting && cart.items.length == 0 && (
            <div className="col-12">
              <small className="text-danger">Your cart is empty</small>
            </div>
          )}
        </div>
        <hr className="my-4" />
        {!isSubmiting ? (
          <button
            className="w-100 btn btn-primary btn-sm"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setIsSubmiting(true);
              if (user) {
                if (!checkBill(cart)) {
                  return;
                }
                fetch(BACKEND_URL + "/checkout", {
                  method: "POST",
                  body: JSON.stringify({
                    cart: cart,
                    username: user?.username,
                    token: user?.token,
                  }),
                })
                  .then(async (response) => {
                    if (response.status == 401) {
                      alert("Login to finish this process.");
                      navigate("/login");
                    } else {
                      console.log(await response.json());
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setIsSubmiting(false);
                  });
              } else {
                alert("Login to finish this process.");
                navigate("/login");
              }
            }}
          >
            Xác nhận đặt hàng
          </button>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="spinner-border text-dark spinner-border-sm "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function checkBill(cart: Cart) {
  const address = `${cart.information.address.home}, ${cart.information.address.ward}, ${cart.information.address.district}, ${cart.information.address.province}`;

  if (cart.items.length == 0) {
    return false;
  } else {
    const info = cart.information;
    if (
      info.receiveName.trim() == "" ||
      info.email.trim() == "" ||
      info.phonenumber.trim() == "" ||
      info.address.home.trim() == "" ||
      info.address.province.trim() == "" ||
      info.address.district.trim() == "" ||
      info.address.ward.trim() == "" ||
      !checkEmail(info.email.trim()) ||
      !checkPhonenumber(info.phonenumber.trim())
    ) {
      return false;
    }
  }
  return true;
}
export default DeliveryInformation;
