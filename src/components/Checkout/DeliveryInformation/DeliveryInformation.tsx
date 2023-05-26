import React, { useState, useEffect, useRef } from "react";
import { Cart, District, Province, User, Ward } from "../../../utilities/utils";
import PROVINCES from "../../../utilities/provinces.json";
import { BACKEND_URL, CART_KEY } from "../../../env";
import fs from "fs";
import { io } from "socket.io-client";
import { useUser } from "../../../contexts/UserContext/UserContext";
// event: React.ChangeEvent<HTMLSelectElement>

function DeliveryInformation() {
  const [cart, setCart] = useState({
    information: {
      username: JSON.parse(localStorage.getItem("user") || "{}").username,
      address: "",
      email: "",
      phonenumber: "",
    } as User,
    items: JSON.parse(localStorage.getItem(CART_KEY) || "[]"),
  } as Cart);

  const [provinces, setProvinces] = useState<Province[]>(PROVINCES);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const selectedProvince = useRef("");
  const selectedDistrict = useRef("");
  const selectedWard = useRef("");
  const detailedAddress = useRef("");
  const [user] = useUser();
  const [toast, setToast] = useState({ message: "", shouldShow: false });

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
              className="form-control"
              id="fullName"
              placeholder="Full name"
              required={true}
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="tel" className="form-label">
              Số điện thoại <span className="text-muted"></span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="tel"
              placeholder="Phone number"
              required={true}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@gmail.com"
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
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

                selectedProvince.current = e.target.value;
                console.log(selectedProvince.current);
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
            <div className="">Please select a valid province.</div>
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
                selectedDistrict.current = e.target.value;
                console.log(selectedDistrict.current);
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
            <div className="invalid-feedback">
              Please provide a valid district.
            </div>
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
                console.log(e.target.value);
                selectedWard.current = e.target.value;
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
            <div className="invalid-feedback">Please provide a valid ward.</div>
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
              onChange={(e) => {
                detailedAddress.current = e.target.value;
                setCart({
                  ...cart,
                  information: {
                    ...cart.information,
                    address: `${e.target.value} - ${selectedWard.current}, ${selectedDistrict.current}, ${selectedProvince.current}`,
                  },
                });
              }}
            />
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <button
          className="w-100 btn btn-primary btn-lg"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log(cart);
          }}
        >
          Xác nhận đặt hàng
        </button>
      </form>
    </div>
  );
}

export default DeliveryInformation;
