import React, { useEffect, useState } from 'react'
import { getDanhSachCongViecTheoTen } from '../../apis/apiCongViec';
import { CongViecById, CongViecViewModel } from '../../models/CongViecViewModel';
import JobItem from '../../components/jobs/jobitem';

export default function Search() {
    const [search, searchText] = useState<string>("logo");
    const [lsSearch, setLst] = useState<CongViecById[]>([]);
    useEffect(() => {
        getDanhSachCongViecTheoTen("logo").then((res) => {
            setLst(res);
        })
    }, []);

    function renderJobs() {
        return lsSearch?.map((item) => {
            return <JobItem item={item.congViec}></JobItem>

        });
           
    }

    return (
        <>
        <div className="flex">
        {renderJobs()}
        </div>
        
        </>
    )
}
