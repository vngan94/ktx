import React from 'react';
import { useEffect, useState } from 'react';

import {getDetailRoomByIdService, createNewRoomService, updateRoomService  } from '../../../services/roomService';
import {getAllArea} from '../../../services/areaService';
import {getAllTypeRoom} from '../../../services/typeRoomService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
const AddRoom = (props) => {
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
    const [dataArea, setdataArea] = useState({})
    const [dataTypeRoom, setdataTypeRoom] = useState({})
    const [inputValues, setInputValues] = useState({
        areaId: '', typeRoomId: '',roomName: ''
    });

    // 
    
    useEffect(() => {    
        
        fetchDataArea()
         
        fetchDataTypeRoom()
         
        
        if (id) {
            let fetchDetailRoom = async () => {
                setisActionADD(false)
                let room = await getDetailRoomByIdService(id)
                if (room && room.errCode === 0) {
                    setInputValues({ ...inputValues, 
                        ["areaId"]: room.data.areaId, 
                        ["typeRoomId"]: room.data.typeRoomId,
                        ["roomName"]: room.data.roomName,
                    })
                }
            }
            fetchDetailRoom()
        }
    }, [])
    
    let fetchDataArea = async () => {
        let arrData = await getAllArea({
            limit: '',
            offset: '',
            keyword: ''
        })
        if (arrData && arrData.errCode === 0) {
            setdataArea(arrData.data)
        }
    }
    let fetchDataTypeRoom = async () => {
        let arrData = await getAllTypeRoom({
            limit: '',
            offset: '',
            keyword: ''
        })
        if (arrData && arrData.errCode === 0) {
            setdataTypeRoom(arrData.data)
        }
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveRoom = async () => {
        if (isActionADD === true) {
            
            let res = await createNewRoomService({
                typeRoomId: inputValues.typeRoomId,
                roomName: inputValues.roomName,
                areaId: inputValues.areaId,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm phòng thành công")
                setInputValues({
                    ...inputValues,
                    ["areaId"]:'', 
                    ["typeRoomId"]: '',
                    ["roomName"]: '',
                })
            }
            else if (res && res.errCode !== 0) {
                toast.error(res.errMessage)
            }
           
            else toast.error("Thêm phòng thất bại")
        } else {
            let res = await updateRoomService({
                typeRoomId: inputValues.typeRoomId,
                roomName: inputValues.roomName,
                areaId: inputValues.areaId,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật phòng thành công")

            }
            else if (res && res.errCode !== 0) {
                toast.error(res.errMessage)
            }
            else toast.error("Cập nhật phòng thất bại")
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý phòng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm mới phòng' : 'Cập nhật thông tin phòng'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                        <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Khu</label>
                                <select value={inputValues.areaId} onChange={(event) => handleOnChange(event)} name='areaId' id="inputState" className="form-control">
                                    <option value={'ALL'} selected >Chọn khu </option>
                                    {dataArea && dataArea.length > 0 &&
                                        dataArea.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.areaName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Loại phòng</label>
                                <select value={inputValues.typeRoomId} onChange={(event) => handleOnChange(event)}  name='typeRoomId' id="inputState" className="form-control">
                                    <option value={'ALL'} selected >Chọn loại phòng </option>
                                    {dataTypeRoom && dataTypeRoom.length > 0 &&
                                        dataTypeRoom.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.typeRoomName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputPassword4">Tên phòng</label>
                                <input type="text" value={inputValues.roomName} name="roomName" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            
                        </div>
                        <button type="button" onClick={() => handleSaveRoom()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
       
    )
}
export default AddRoom;


