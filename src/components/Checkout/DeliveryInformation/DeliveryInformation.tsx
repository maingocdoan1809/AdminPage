import React, { useState, useEffect } from "react";
// event: React.ChangeEvent<HTMLSelectElement>
interface Provinces  {
    province_id: number;
    province_name: string;
    province_type: string;
  };
interface District {
    district_id: number;
    district_name: string;
}
interface Wards {
    ward_id: number;
    ward_name: string;
}
function DeliveryInformation() {

    const [provinces, setProvinces] = useState<Provinces[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Wards[]>([]);

    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = e.target.value;
        const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        const data = await response.json();
        setDistricts(data.results);
        console.log(data);
    };

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        const data = await response.json();
        setWards(data.results);
        console.log(data);
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            const response = await fetch('https://vapi.vnappmob.com/api/province/');
            const data = await response.json();
            setProvinces(data.results);
        };
        fetchProvinces();
    }, []);
    console.log(provinces);

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
                        <div className="invalid-feedback">Valid first name is required.</div>
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
                            onChange={handleProvinceChange}
                        >
                            <option value="">Choose...</option>
                            {provinces.length > 0 && provinces.map((province) => (
                                <option key={province.province_id} value={province.province_id}>
                                    {province.province_name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Please select a valid province.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="district" className="form-label">
                            Quận/Huyện
                        </label>
                        <select
                            className="form-select"
                            id="district"
                            required={true}
                            onChange={handleDistrictChange}
                        >
                            <option value="">Choose...</option>
                            {districts.length > 0 && districts.map((district) => (
                                <option key={district.district_id} value={district.district_id}>
                                    {district.district_name}
                                </option>
                            ))}
                        </select>
                        <div className="invalid-feedback">Please provide a valid district.</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="ward" className="form-label">
                            Phường/Xã
                        </label>
                        <select className="form-select" id="ward" required={true}>
                            <option value="">Choose...</option>
                            {wards.length > 0 && wards.map((ward) => (
                                <option key={ward.ward_id} value={ward.ward_id}>
                                    {ward.ward_name}
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
                        />
                        <div className="invalid-feedback">Please enter your shipping address.</div>
                    </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">
                    Xác nhận đặt hàng
                </button>
            </form>
        </div>
    );
}

export default DeliveryInformation;
