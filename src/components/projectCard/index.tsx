import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CatCard from "../../components/catCard";
import { getChiTietLoaiCongViec } from "./../../apis/apiChiTietLoaiCongViec";
import { ChiTietLoaiCongViecViewModel } from "../../models/ChiTietLoaiCongViecViewModel";

export default function () {
  const [chiTietLoaiCongViec, setChiTietLoaiCongViec] = React.useState<ChiTietLoaiCongViecViewModel[]>([]);
  React.useEffect(() => {
    getChiTietLoaiCongViec().then((data) => {
      setChiTietLoaiCongViec(data);
    });
  }, []);

  function loadServices() {
    return chiTietLoaiCongViec.map((item) => {
      return (
        <CatCard
          key={item.id}
          chiTietLoaiCongViec={item}
        />
      );
    });
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <Carousel
      className='container m-auto'
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {loadServices() }
    </Carousel>
  )
}

