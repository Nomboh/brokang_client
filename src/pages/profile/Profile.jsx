import React, { useEffect, useState } from "react";
import "./profile.css";
import Upbar from "../../components/upbar/Upbar";
import Bellowbar from "../../components/bellowbar/Bellowbar";
import Mmenu from "../../mobile/mmenu/Mmenu";
import Footer from "../../components/footer/Footer";
import Mtop from "../../mobile/mUpbar/Mtop";
import SmallWidget from "../../components/smallWidget/SmallWidget";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/auth/AuthContext";
import upLoadToFB from "../../utils/upLoadToFB";

function Profile() {
  const { user } = useAuth();
  const { data: userProducts } = useFetch("/product/userProducts");

  const [index, setIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e, i) => {
    e.preventDefault();

    setIndex(i);
  };

  const handleCancel = e => {
    e.preventDefault();
    setIndex(0);
  };

  console.log(progress);

  useEffect(() => {
    const uploadFile = async () => {
      const time = new Date().getTime();
      const random = Math.ceil(Math.random() * 10000000);
      const fileName = `${time}_${user?.name}_${random}.${file.name
        .split(".")
        .pop()}`;
      const url = await upLoadToFB(file, fileName, "user", setProgress);
      console.log(url);
    };
    if (file) {
      uploadFile();
    }
  }, [file, user.name]);
  console.log(file);
  return (
    <div className="container">
      <Upbar />
      <Bellowbar />
      <Mmenu />
      <Mtop />
      <div className="profile_container">
        <div className="profile_left">
          <SmallWidget
            numberOfProducts={userProducts?.totalProducts}
            follow={true}
            userId={user._id}
          />
        </div>
        <div className="profile_right">
          <form className="profile_form">
            <div className="profile_form_wrapper">
              <div className="profile_label_wrapper">
                <label htmlFor="photo" className="profile_label">
                  Change Picture
                </label>
              </div>
              <div className="profile_input_btn">
                <div className="profile_input_wrapper">
                  <div className="p_input">
                    <input
                      className="profile_file_o"
                      type="file"
                      name="photo"
                      id="photo"
                      onChange={e => setFile(e.target.files[0])}
                    />

                    <label htmlFor="photo" className="profile_photo_label">
                      <img
                        className="profile_img"
                        src={user?.photo}
                        alt={user?.name}
                      />
                    </label>
                  </div>

                  <div className="profile_btn_wrapper"></div>
                </div>
              </div>
            </div>

            <div className="profile_form_wrapper">
              <div className="profile_label_wrapper">
                <label htmlFor="name" className="profile_label">
                  Change Name
                </label>
              </div>
              <div className="profile_input_btn">
                <div className="profile_input_wrapper">
                  <div className="p_input">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="profile_input"
                      placeholder="Enter a New name"
                    />
                  </div>

                  <div className="profile_btn_wrapper">
                    <button className="profile_btn">confirm</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile_form_wrapper">
              <div className="profile_label_wrapper">
                <label htmlFor="email" className="profile_label">
                  Change E-Mail
                </label>
              </div>
              <div className="profile_input_btn">
                <div className="profile_input_wrapper">
                  <div className="p_input">
                    <p className="p_email">nombohq14@gmail.com</p>
                  </div>
                  <div className="profile_btn_wrapper">
                    {index !== 1 && (
                      <button
                        onClick={e => handleChange(e, 1)}
                        className="profile_btn"
                      >
                        change
                      </button>
                    )}

                    {index === 1 && (
                      <button
                        onClick={handleCancel}
                        className="profile_btn profile_btn_cancel"
                      >
                        cancel
                      </button>
                    )}
                  </div>
                </div>
                {index === 1 && (
                  <div className="profile_input_wrapper">
                    <div className="p_input">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="change your email address"
                        className="profile_input"
                      />
                    </div>

                    <div className="profile_btn_wrapper ">
                      <button className="profile_btn ">confirm</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="profile_form_wrapper">
              <div className="profile_label_wrapper">
                <label htmlFor="password" className="profile_label">
                  Change password
                </label>
              </div>
              <div className="profile_input_btn">
                <div className="profile_input_wrapper">
                  <div className="p_input">
                    <p className="p_email">*************</p>
                  </div>
                  <div className="profile_btn_wrapper">
                    {index !== 2 && (
                      <button
                        onClick={e => handleChange(e, 2)}
                        className="profile_btn"
                      >
                        change
                      </button>
                    )}

                    {index === 2 && (
                      <button
                        onClick={e => handleCancel(e)}
                        className="profile_btn profile_btn_cancel "
                      >
                        cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {index === 2 && (
              <div className="p_password">
                <div className="profile_form_wrapper">
                  <div className="profile_label_wrapper">
                    <label htmlFor="current_password" className="profile_label">
                      Current Password
                    </label>
                  </div>
                  <div className="profile_input_btn">
                    <div className="profile_input_wrapper">
                      <div className="p_input">
                        <input
                          type="password"
                          id="current_password"
                          name="currentPassword"
                          placeholder="enter current password"
                          className="profile_input"
                        />
                      </div>
                      <div className="profile_btn_wrapper"></div>
                    </div>
                  </div>
                </div>

                <div className="profile_form_wrapper">
                  <div className="profile_label_wrapper">
                    <label htmlFor="current_password" className="profile_label">
                      New Password
                    </label>
                  </div>
                  <div className="profile_input_btn">
                    <div className="profile_input_wrapper">
                      <div className="p_input">
                        <input
                          type="password"
                          id="new_password"
                          name="newPassword"
                          placeholder="enter new password"
                          className="profile_input"
                        />
                      </div>
                      <div className="profile_btn_wrapper">
                        <button className="profile_btn">confirm</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
