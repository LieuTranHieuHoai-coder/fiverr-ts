import { StarFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { CongViecViewModel } from '../../models/CongViecViewModel'

type Props = {
  item: CongViecViewModel
}
export default function JobItem(props: Props) {
  const { item } = props;
  return (
    <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={item.id}>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        <img className="rounded-t-lg m-auto" src={item.hinhAnh} />
        <Link to={`/gig/${item.id}`}>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
        </Link>
      </div>
      <div className="p-6 text-surface dark:text-white">
        <h5 className="mb-2 text-lg text-black font-bold leading-tight">
          {item.tenCongViec}
        </h5>
        <p className="mb-4 text-base truncate  text-ellipsis overflow-hidden">
          {item.moTaNgan}
        </p>
        <div className="flex items-center align-baseline justify-between">
          <div>
            <span className="text-black font-bold"> Rate {item.saoCongViec}/5</span>
            <StarFilled className="ml-1 mb-1" />
          </div>
          <div>
            <span className="text-gray-500">
              Vote: {item.danhGia}
            </span>
          </div>
        </div>
        <div className="my-3">
          <span className="text-black font-bold text-lg">
            From ${item.giaTien}
          </span>
        </div>
      </div>
    </div>
  )
}
