import React from 'react';
import { useEffect, useState } from 'react';
import { getViolationActionById, createNewViolationAction, updateViolationAction } from '../../../services/violationActionService';
import {getAllCode} from '../../../services/codeService';
import DatePicker from '../../../component/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFetchAllcode } from '../../customize/fetch';
import localization from 'moment/locale/vi';
import CommonUtils from '../../../utils/CommonUtils';
import moment from 'moment';
const AddStudent = (props) => {


    const [birthday, setbirthday] = useState('');

    const [isActionADD, setisActionADD] = useState(true)
    const [isChangeDate, setisChangeDate] = useState(false)
    const { id } = useParams();
    const [dataViolation, setdataViolation] = useState({})
    const [dataAction, setdataAction] = useState({})
    const [inputValues, setInputValues] = useState({
        actionId: '', violationId: '', times: '', note: ''
    });

    let setStateViolationAction = (data) => {
        setInputValues({
            ...inputValues,
            ["actionId"]: data.actionId,
            ["violationId"]: data.violationId,
            ["times"]: data.times,
            ["note"]: data.note
        })
        
    }
    useEffect(() => {
        fetchViolation()
        fetchAction()
        if (id) {
            let fetchViolationAction = async () => {
                setisActionADD(false)
                let res = await getViolationActionById(id)
                if (res && res.errCode === 0) {
                    setStateViolationAction(res.data)
                }
            }
            fetchViolationAction()
        }
    }, [])
    let fetchViolation = async () => {
        
        let res = await getAllCode({
            type: 'VIOLATION'
        })
        if (res && res.errCode === 0) {
            
            setdataViolation(res.data)
        }
    }
    let fetchAction = async () => {
       
        let res = await getAllCode({
            type: 'ACTION'
        })
        if (res && res.errCode === 0) {
            setdataAction(res.data)
        }
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleSaveViolationAction = async () => {
        if (isActionADD === true) {
            let res = await createNewViolationAction({
                actionId: inputValues.actionId,
                violationId: inputValues.violationId,
                times: inputValues.times,
                note: inputValues.note,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm mới xử lý thành công")
                setInputValues({
                    ...inputValues,
                    ["actionId"]: '',
                    ["violationId"]: '',
                    ["times"]: '',
                    ["note"]: ''
                })
               
            } else {
                toast.error(res.errMessage)
            }
        } else {
            let res = await updateViolationAction({
                id: id,
                actionId: inputValues.actionId,
                violationId: inputValues.violationId,
                times: inputValues.times,
                note: inputValues.note,
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật xử lý thành công")

            } else {
                toast.error(res.errMessage)
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Khung xử lý</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm xử lý' : 'Cập nhật thông tin xử lý'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-12 ">
                                <label htmlFor="inputAddress">Tên vi phạm</label>
                                <select value={inputValues.violationId} onChange={(event) => handleOnChange(event)} name='violationId' id="inputState" className="form-control">
                                <option value={'ALL'} selected >Chọn vi phạm </option>
                                    {dataViolation && dataViolation.length > 0 &&
                                        dataViolation.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputEmail4">Số lần vi phạm</label>
                                <input type="number" value={inputValues.times}  name="times" onChange={(event) => handleOnChange(event)} className="form-control" id="" />
                            </div>
                            <div className="form-group  col-md-12">
                                <label htmlFor="inputEmail4">Hình phạt</label>
                                <select value={inputValues.actionId} onChange={(event) => handleOnChange(event)} name='actionId' id="inputState" className="form-control">
                                <option value={'ALL'} selected >Chọn hình phạt </option>
                                    {dataAction && dataAction.length > 0 &&
                                        dataAction.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-row mb-4">
                        <label htmlFor="inputEmail4">Ghi chú</label>
                        <textarea rows="4"  value={inputValues.note} name="note" onChange={(event) => handleOnChange(event)} className="form-control"></textarea>
                        </div>

                        <button type="button" onClick={() => handleSaveViolationAction()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddStudent;