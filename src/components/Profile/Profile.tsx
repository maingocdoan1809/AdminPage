import { useEffect, useState } from "react";
import style from "./profile.module.css";
import Navbar from "../Navbar/Navbar";
import Editable from "../Editable/Editable";
import { checkUserIdentity } from "../../utilities/utils";
import { useNavigate } from "react-router";
import LoadingView from "../LoadingView/LoadingView";
export type UserInfo = {
  username: string;
  fullname: string;
  email: string | undefined;
  birthday: string | undefined;
  avt: string | undefined;
  phonenumber: string;
  address: string;
};

function Profile() {
  const redirect = useNavigate();
  const [isChecking, setChecking] = useState(true);
  const [userInfo, setUserInfor] = useState({} as UserInfo);
  console.log(userInfo);

  useEffect(() => {
    checkUserIdentity()
      .then((data) => {
        if (!data.isAuthenticated) {
          redirect("/unauth");
        } else {
          setUserInfor({
            address: data.address,
            avt: data.avt,
            birthday: data.birthday,
            email: data.email,
            fullname: data.fullname,
            phonenumber: data.phonenumber,
            username: data.username,
          });
        }
      })
      .catch((err) => {
        redirect("/servererror");
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);
  return (
    <>
      {isChecking ? (
        <LoadingView />
      ) : (
        <div className={`${style.profile} bg-light`}>
          <Navbar />
          <div className={`container mt-5 d-flex ${style.container}`}>
            <div className="col-lg-6 col-md-12">
              <div
                className="col
                position-relative d-flex justify-content-center align-items-center flex-column"
              >
                <img
                  className={`${style.avt} mb-4`}
                  src={
                    userInfo.avt ||
                    "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-nhon.jpg"
                  }
                  alt=""
                />
                <div className="row mb-3">
                  <div className="">
                    <label htmlFor="avt" className="form-label">
                      You can change your avatar here
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="avt"
                      id=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 p-3">
              <div className="row mb-3">
                <div className="col-md-6 col-sm-12">
                  <label className="form-label" htmlFor="fname">
                    Full name
                  </label>
                  <Editable
                    type="text"
                    value={userInfo.fullname}
                    canEdit={true}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="form-label" htmlFor="fname">
                    Phone number
                  </label>
                  <Editable
                    type="text"
                    value={userInfo.phonenumber}
                    canEdit={true}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="">
                  <label className="form-label" htmlFor="fname">
                    Address
                  </label>
                  <Editable
                    type="text"
                    value={userInfo.address}
                    canEdit={true}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="">
                  <label className="form-label" htmlFor="fname">
                    Email
                  </label>
                  <Editable type="text" value={userInfo.email} canEdit={true} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
