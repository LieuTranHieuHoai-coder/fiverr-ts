import React from "react";
import { LoaiCongViecViewModel } from "./../../models/LoaiCongViecModel";
import { getLoaiCogViec } from "../../apis/apiLoaiCongViec";
import { Link } from "react-router-dom";

export default function CatLink() {
  const [loaiCongViec, setLoaiCongViec] = React.useState<
    LoaiCongViecViewModel[]
  >([]);
  React.useEffect(() => {
    getLoaiCogViec()
      .then((data) => {
        setLoaiCongViec(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div  className="menu container">
      {loaiCongViec.map((item, index) => {
        return (
          <Link key={index} className="link menuLink" to={`/category/${item.id}`}>
            {item.tenLoaiCongViec}
          </Link>
        );
      })}
    </div>
  );
}
