import React from 'react';
import { useEffect, useState } from 'react';
import { getAllCode,getAllCodeByTypeStatus } from '../../services/codeService';

const useFetchAllcode = (type) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        try {
            let fetchData = async () => {
                
                let arrData = await getAllCode({
                    type: type
                })
               
                if (arrData && arrData.errCode === 0) {
                    
                    setdata(arrData.data)

                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [])
    return { data }
}

const useFetchAllcodeByTypeStatus = (dataQuery) => {
    const [data, setdata] = useState([])
    useEffect(() => {
        try {
            let fetchData = async () => {
                
                let arrData = await getAllCodeByTypeStatus({
                    limit: dataQuery.limit,
                    offset: dataQuery.offset,
                    keyword: dataQuery.keyword,
                    type: dataQuery.type,
                    status: dataQuery.status
                })
               
                if (arrData && arrData.errCode === 0) {
                    
                    setdata(arrData.data)

                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [])
    return { data }
}

export {
    useFetchAllcode, useFetchAllcodeByTypeStatus
}