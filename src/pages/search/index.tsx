import React, { useEffect, useState } from 'react'
import { getDanhSachCongViecTheoTen } from '../../apis/apiCongViec';
import { CongViecById } from '../../models/CongViecViewModel';
import JobItem from '../../components/jobs/jobitem';
import { useParams } from 'react-router-dom';

export default function Search() {
    const { search } = useParams();
    //const [search, searchText] = useState<string>("logo");
    const [lsSearch, setLst] = useState<CongViecById[]>([]);
    useEffect(() => {
        getDanhSachCongViecTheoTen(search).then((res) => {
            setLst(res);
        })
    }, []);

    function renderJobs() {
        return lsSearch?.map((item) => {
            return <JobItem item={item.congViec}></JobItem>

        });

    }

    return (
        <div className='container m-auto '>
            <h2 className="text-4xl my-5"> Results ({lsSearch.length})</h2>
            <div className="grid grid-cols-4 gap-4">
                {renderJobs()}
            </div>

        </div>
    )
}
