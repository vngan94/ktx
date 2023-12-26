import React from 'react';
import { useEffect, useState } from 'react';
import { createNewTypeRoomService, getDetailTypeRoomByIdService, UpdateTypeRoomService } from '../../../services/typeRoomService';
import DatePicker from '../../../component/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFetchAllcode } from '../../customize/fetch';
import localization from 'moment/locale/vi';
import CommonUtils from '../../../utils/CommonUtils';
import moment from 'moment';
import {getAllRoomByWithoutTypeRoom} from "../../../services/roomService"
const AddRegister = (props) => {

    const [files, setFiles] = useState()
    const [birthday, setbirthday] = useState('');

    const [isActionADD, setisActionADD] = useState(true)
    const [isChangeDate, setisChangeDate] = useState(false)
    const { id } = useParams();
    const [dataRoom, setdataRoom] = useState({})
    const [inputValues, setInputValues] = useState({
        typeRoomName: '', maxStudent: '', 	priceService: '', priceTypeRoom: '', caption: '', image: '', startAt: '',
        endAt: '', roomId: ''
    });

    let setStateTypeRoom = (data) => {
        setInputValues({
            ...inputValues,
            ["typeRoomName"]: data.typeRoomName,
            ["maxStudent"]: data.maxStudent,
            ["priceService"]: data.priceService,
            ["priceTypeRoom"]: data.priceTypeRoom,
            ["caption"]: data.caption,
            ["image"]: data.image,
            ["startAt"]: data.startAt,
            ["endAt"]: data.endAt,
            ["roomId"]: data.roomId
        })
    }
    useEffect(() => {
        let fetchRoom = async () => {
            let arrData = await getAllRoomByWithoutTypeRoom()
            if (arrData && arrData.errCode === 0) {
                setdataRoom(arrData.data)
            }
        }
        fetchRoom()

        if (id) {
            let fetchTypeRoom = async () => {
                setisActionADD(false)
                let typeRoom = await getDetailTypeRoomByIdService(id)
                if (typeRoom && typeRoom.errCode === 0) {
                    setStateTypeRoom(typeRoom.data)
                }
            }
            fetchTypeRoom()
        }
    }, [])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file.size > 31312281){
            toast.error("Dung lượng file bé hơn 30mb")
        }
        else{
            let base64 = await CommonUtils.getBase64(file);
            setInputValues({ ...inputValues, ["image"]: base64})
        }
    }

    let handleOnChangeDatePicker = (date) => {
        setInputValues({
            ...inputValues,
            ["startAt"]: date[0]})
    }
    let handleOnChangeDatePickerToDate = (date) => {
        
        setInputValues({
            ...inputValues,
            ["endAt"]: date[0],
        })
    }
    let handleSaveTypeRoom = async () => { // chưa làm
            let res = await createNewTypeRoomService({
                typeRoomName: inputValues.typeRoomName,
                maxStudent: inputValues.maxStudent,
                priceService: inputValues.priceService,
                caption: inputValues.caption,
                priceTypeRoom: inputValues.priceTypeRoom,
                image: inputValues.image,
                startAt: new Date(inputValues.startAt).getTime(),
                endAt: new Date(inputValues.endAt).getTime(),
                roomId: inputValues.roomId
                
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm loại phòng thành công")
                setInputValues({
                    ...inputValues,
                    ["typeRoomName"]: '',
                    ["maxStudent"]: '',
                    ["priceService"]: '',
                    ["caption"]: '',
                    ["image"]: '',
                    ["priceTypeRoom"]: '',
                    ["startAt"]: '',
                    ["endAt"]: '',
                    ["roomId"]: ''

                })
            } else {
                toast.error(res.errMessage)
            }
        

    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý loại phòng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm loại phòng' : 'Cập nhật thông tin loại phòng'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Loại phòng</label>
                                <input type="text"  name="typeRoomName" value={inputValues.typeRoomName} onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Số sinh viên tối đa</label>
                            <input type="number"  name="maxStudent" value={inputValues.maxStudent} onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Giá phòng</label>
                                <input type="number" name="priceTypeRoom" value={inputValues.priceTypeRoom} onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                            <label htmlFor="inputAddress">Giá dịch vụ</label>
                            <input type="number" name="priceService" value={inputValues.priceService} onChange={(event) => handleOnChange(event)} className="form-control" id="inputAddress" />
                            </div>
                            
                        </div>

                        <div className="form-row">

                            <div className="form-group col-6">
                                <label htmlFor="inputEmail4">Thời gian áp dụng bắt đầu</label>
                                <DatePicker className="form-control" onChange={handleOnChangeDatePicker}  value={inputValues.startAt}
                                    />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="inputEmail4">Thời gian áp dụng kết thúc</label>
                                <DatePicker className="form-control" onChange={handleOnChangeDatePickerToDate} value={inputValues.endAt}
                                   />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label htmlFor="inputEmail4">Tên hình ảnh </label>
                                <input type="text" name="caption" value={inputValues.caption} onChange={(event) => handleOnChange(event)} className="form-control" id="inputAddress" />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="inputEmail4" >Chọn hình ảnh</label>
                                <input accept=".jpg,.png"  onChange={(event) => handleOnChangeImage(event)} type="file" className="form-control "  />
                            </div>
                        </div>
                  

                        <div className="form-row">
                        <button type="button" onClick={() => handleSaveTypeRoom()} className="btn btn-primary">Lưu thông tin</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddRegister;