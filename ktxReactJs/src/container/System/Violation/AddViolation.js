import React from 'react';
import { useEffect, useState } from 'react';
import { getAllCodeByTypeStatus, createNewCodeService, updateCodeService, getDetailCodeByIdService} from '../../../services/codeService';

import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFetchAllcode } from '../../customize/fetch';
import moment from 'moment';
const AddFAQ = (props) => {
    const [isViolationADD, setisViolationADD] = useState(true)
    const { id } = useParams();
    const [inputValues, setInputValues] = useState({
        code: '', value: '',  status: '', type: ''
        
   });
    useEffect(() => {

        if (id) {
            let fetchDetailViolation = async () => {
                let res = await getDetailCodeByIdService(id)
                if (res && res.errCode === 0) {
                    setInputValues(res.data)
                    setisViolationADD(false)
                }
            }
            fetchDetailViolation()
        }
    }, [])


    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveViolation = async () => {
        if (isViolationADD === true) {
            let res = await createNewCodeService({
                type: 'VIOLATION',
                value: inputValues.value,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm nội dung vi phạm thành công")
                setInputValues({
                    ...inputValues,
                    ["value"]: ''
                })
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Thêm nội dung vi phạm thất bại")
        } else {
            let res = await updateCodeService({
                value: inputValues.value,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật nội dung vi phạm thành công")

            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
           
            else {
                toast.error("Cập nhật nội dung vi phạm thất bại")
                console.log("res.errCode " + res.errCode)
            }
        }
    }


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý nội dung vi phạm </h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isViolationADD === true ? 'Thêm mới nội dung vi phạm ' : 'Cập nhật thông tin nội dung vi phạm '}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputEmail4">Nội dung vi phạm</label>
                                <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            
                            
                        </div>
                        <button type="button" onClick={() => handleSaveViolation()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddFAQ;