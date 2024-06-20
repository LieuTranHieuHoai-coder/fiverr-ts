import React from "react";
import { MenuLoaiCongViec } from "./../../models/LoaiCongViecModel";
import { Link } from "react-router-dom";
import { getMenuLoaiCongViec } from "../../apis/apiCongViec";

export default function CatLink() {
  const [loaiCongViec, setLoaiCongViec] = React.useState<
    MenuLoaiCongViec[]
  >([]);
  React.useEffect(() => {
    getMenuLoaiCongViec()
      .then((data) => {
        setLoaiCongViec(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <div  className="menu container">
      {loaiCongViec?.map((item) => {
        return (
          <Link key={item.id} className="link menuLink" to={`/category/${item.id}`}>
            {item.tenLoaiCongViec}
          </Link>
        );
      })}
    </div>
  );
}
