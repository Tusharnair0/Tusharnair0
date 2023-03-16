import React from "react";
import Logo from "../../image/logo.png";

const Footer = () => {
  return (
    <footer className="Footer-Wrapper">
      <section className="Footer-Section">
        <div className="Footer-Content">
          <div className="Footer-Left">
            <div className="Footer-Column">
              <div>
                <div className="Footer-Column-Top">
                  <a>
                    <img
                      className="Footer-Column-Logo"
                      alt="Shop Uy Tín"
                      src={Logo}
                    />
                  </a>
                  <h2 className="Footer-Column-Slogan">Shop Uy Tín</h2>
                </div>
                <p className="Footer-Contact-List">
                  Điện Thoại:
                  <span> 0386.614.659</span>
                  <br />
                  Email:
                  <span> ndduc.18it2@vku.udn.vn</span>
                  <br />
                  Địa Chỉ:
                  <span>
                    {" "}
                    86 Lê Trung Đình, phường Hòa Hải, quận Ngũ Hành Sơn, Đà
                    Nẵng, Việt Nam
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="Footer-Right">
            <div className="Footer-Column">
              <div>
                <div className="Footer-Column-Top">
                  <h2 className="Footer-Column-Slogan">Thông tin Chi Tiết</h2>
                </div>
                <p className="Footer-Contact-List">
                  Họ và Tên:
                  <span> Nguyễn Đình Đức</span>
                  <br />
                  Lớp Học:
                  <span> 18IT2</span>
                  <br />
                  Mã Sinh Viên:
                  <span> 18IT087</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer-Content">
          <div className="Footer-Bottom">
            <p className="Footer-Copyright">
              © 2023. Website uy tín hàng đầu Việt Nam
            </p>
            <div className="Footer-Social-List">
              <a
                className="Footer-Social-Item"
                style={{color: "#eb2c3b"}}
                href="https://www.youtube.com/"
                title="F8 trên Youtube"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  style={{color: "#4867aa"}}
                  data-icon="youtube-square"
                  className="svg-inline--fa fa-youtube-square "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"
                  ></path>
                </svg>
              </a>
              <a
                className="Footer-Social-Item"
                href="https://www.facebook.com/ducmoon99"
                title="F8 trên Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  style={{color: "#CCC"}}
                  data-icon="facebook-square"
                  className="svg-inline--fa fa-facebook-square "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.3V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0 -48-48z"
                  ></path>
                </svg>
              </a>
              <a
                className="Footer-Social-Item"
                href="https://www.tiktok.com/"
                title="F8 trên Tiktok"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="tiktok"
                  className="svg-inline--fa fa-tiktok "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.25V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.2 121.2 0 0 0 1.86 22.17h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.14z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
