import React from 'react';
import { useEffect, useState } from 'react';
import { getAllCodeByTypeStatus, createNewCodeService, updateCodeService, getDetailCodeByIdService} from '../../../services/codeService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFetchAllcode } from '../../customize/fetch';
import moment from 'moment';
const AddFAQ = (props) => {
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
    const [inputValues, setInputValues] = useState({
        code: '', value: '',  status: '', type: ''
        
   });
    useEffect(() => {

        if (id) {
            let fetchDetailBed = async () => {
                let res = await getDetailCodeByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues(res.data)
                    setisActionADD(false)
                }
            }
            fetchDetailBed()
        }
    }, [])


    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveBed = async () => {
        if (isActionADD === true) {
            let res = await createNewCodeService({
                type: 'BED',
                value: inputValues.value,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm giường thành công")
                setInputValues({
                    ...inputValues,
                    ["value"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Tên giường đã tồn tại")
        } else {
            let res = await updateCodeService({
                value: inputValues.value,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật giường thành công")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
           
            else {
                toast.error("Cập nhật giường thất bại")
                console.log("res.errCode " + res.errCode)
            }
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý giường</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm mới giường' : 'Cập nhật thông tin giường'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputEmail4">Giường</label>
                                <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            
                            
                        </div>
                        <button type="button" onClick={() => handleSaveBed()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddFAQ;