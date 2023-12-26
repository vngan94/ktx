import React from 'react';
import { useEffect, useState } from 'react';

import {getDetailTypeRoomByIdService, updateTypeRoomService  } from '../../../services/typeRoomService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddTypeRoom = (props) => {
    
    const { id } = useParams();
   
    
    const [inputValues, setInputValues] = useState({
        maxStudent: '', typeRoomName: ''
    });

    // 
    
    useEffect(() => {    
        if (id) {
            let fetchDetailTypeRoom = async () => {
                let typeRoom = await getDetailTypeRoomByIdService(id)
                if (typeRoom && typeRoom.errCode === 0) {
                    setInputValues({ ...inputValues, 
                        ["maxStudent"]: typeRoom.data.maxStudent, 
                        ["typeRoomName"]: typeRoom.data.typeRoomName,
               
                    })
                }
            }
            fetchDetailTypeRoom()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveTypeRoom = async () => {
       
            let res = await updateTypeRoomService ({
                id: id,
                typeRoomName: inputValues.typeRoomName,
                maxStudent: inputValues.maxStudent,
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật loại phòng thành công")
                setInputValues({
                    ...inputValues,
                    ["typeRoomName"]: '',
                    ["maxStudent"]: '',
                    ["id"]: '',
                })
            }
            else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else toast.error("Cập nhật loại phòng thất bại")
        } 
    

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý loại phòng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                   Cập nhật thông tin loại phòng
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Loại phòng</label>
                                <input type="text" value={inputValues.typeRoomName} name="typeRoomName" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Số sinh viên tối đa</label>
                                <input type="text" value={inputValues.maxStudent} name="maxStudent" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            
                        </div>
                        <button type="button" onClick={() => handleSaveTypeRoom()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
       
    )
}
export default AddTypeRoom;


