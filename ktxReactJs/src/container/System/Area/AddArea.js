
import { useEffect, useState } from 'react';

import {getDetailAreaByIdService, createNewAreaService, updateAreaService  } from '../../../services/areaService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddArea = (props) => {
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
   
    const dataGender = [
        {code: 'F', value: "Nữ"},
        {code: 'M', value: "Nam"}
    ]
    const [inputValues, setInputValues] = useState({
        areaName: '', gender: 'F'
    });

    // 
    
    useEffect(() => {    
        if (id) {
            let fetchDetailArea = async () => {
                setisActionADD(false)
                let area = await getDetailAreaByIdService(id)
                if (area && area.errCode === 0) {
                    setInputValues({ ...inputValues, 
                        ["areaName"]: area.data.areaName, 
                        ["gender"]: area.data.gender,
                    })
                }
            }
            fetchDetailArea()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveArea = async () => {
        console.log( inputValues)
        if (isActionADD === true) {
            
            let res = await createNewAreaService({
                areaName: inputValues.areaName,
                gender: inputValues.gender,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm khu thành công")
                setInputValues({
                    ...inputValues,
                    ["areaName"]: '',
                    ["gender"]: 'F',
                })
            }
            else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Thêm khu thất bại")
        } else {
            let res = await updateAreaService({
                areaName: inputValues.areaName,
                gender: inputValues.gender,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật khu thành công")
                setInputValues({ ...inputValues, 
                    ["areaName"]:'', 
                    ["gender"]:'F',
                })

            }
            else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else if (res && res.errCode === 2) {
                toast.error(res.errMessage)
            }
            else toast.error("Cập nhật khu thất bại")
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý khu</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm mới khu' : 'Cập nhật thông tin khu'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Tên khu</label>
                                <input type="text" value={inputValues.areaName} name="areaName" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Dành cho sinh viên</label>
                                <select value={inputValues.gender}  name= "gender" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {
                                        dataGender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            
                        </div>
                        <button type="button" onClick={() => handleSaveArea()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
       
    )
}
export default AddArea;


;


