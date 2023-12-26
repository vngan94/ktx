import React from 'react';
import { useEffect, useState } from 'react';
import { createNewUser, getDetailUserById, UpdateUserService } from '../../../services/userService';
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

    const [inputValues, setInputValues] = useState({
        id: '',
        email: '',
                password:'',
                fullName:'',
                gender: '',
                address: '',
                 phonenumber: '',
                 dob: '',
                 code: '',
                 // k bắt buộc
                 image: '',
                 idenBefore: '',
                 idenAfter: '',
                 identification: '',
                 class: ''
    });

    let setStateUser = (data) => {
        setInputValues({
            ...inputValues,
            ["email"]: data.email,
            ["password"]: data.password,
            ["fullName"]: data.fullName,
            ["gender"]: data.gender,
            ["address"]: data.address,
            ["phonenumber"]: data.phonenumber,
            
            ["code"]: data.code,
            ["image"]: data.image,
            ["idenBefore"]: data.idenBefore,
            ["idenAfter"]: data.idenAfter,
            ["identification"]: data.identification,
            ["class"]: data.class,
            ["id"]: data.id,
        })
        setbirthday(moment.unix(+data.dob / 1000).locale('vi').format('DD/MM/YYYY'))
    }
    useEffect(() => {

        if (id) {
            let fetchUser = async () => {
                setisActionADD(false)
                let user = await getDetailUserById(id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
    }, [])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    const { data: dataGender } = useFetchAllcode('GENDER');
    const { data: dataRole } = useFetchAllcode('ROLE')


    if (dataGender && dataGender.length > 0 && inputValues.gender === '' && dataRole && dataRole.length > 0 && inputValues.roleId === '') {
        setInputValues({ ...inputValues, ["gender"]: dataGender[0].code, ["roleId"]: dataRole[0].code })
    }
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file.size > 31312281){
            toast.error("Dung lượng file bé hơn 30mb")
        }
        else{
        
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }



    let handleOnChangeDatePicker = (date) => {
        setbirthday(date[0])
        setisChangeDate(true)

    }
    let handleSaveUser = async () => {
        if (isActionADD === true) {
            let res = await createNewUser({
                email: inputValues.email,
                password: inputValues.password,
                fullName: inputValues.fullName,
                gender: inputValues.gender,
                 roleId: inputValues.roleId,
                 address: inputValues.address,
                 phonenumber: inputValues.phonenumber,
                 dob: inputValues.dob,
                 code: inputValues.code,
                 // k bắt buộc
                 image: inputValues.image,
                 idenBefore: inputValues.idenBefore,
                 idenAfter: inputValues.idenAfter,
                 identification: inputValues.identification,
                 class: inputValues.class

            })
            if (res && res.errCode === 0) {
                toast.success("Thêm mới sinh viên thành công")
                setInputValues({
                    ...inputValues,
                    ["email"]: '',
                    ["password"]: '',
                    ["fullName"]: '',
                    ["code"]: '',
                    ["class"]: '',
                    ["gender"]: '',
                    ["address"]: '',
                    ["phonenumber"]: '',
                    ["dob"]: '',
                    ["identification"]: '',
                    ["idenBefore"]: '',
                    ["idenAfter"]: '',
                    ["image"]: '',
                })
                setbirthday('')
            } else {
                toast.error(res.errMessage)
            }
        } else {

            let res = await UpdateUserService({
                id: inputValues.id,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleId: inputValues.roleId,
                genderId: inputValues.genderId,
                phonenumber: inputValues.phonenumber,
                dob: isChangeDate === false ? inputValues.dob : new Date(birthday).getTime()
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật người dùng thành công")

            } else {
                toast.error(res.errMessage)
            }
        }

    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý sinh viên</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm sinh viên' : 'Cập nhật thông tin sinh viên'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" value={inputValues.email} disabled={isActionADD === true ? false : true} name="email" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" disabled={isActionADD === true ? false : true} name="password" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Họ tên</label>
                                <input type="text" value={inputValues.fullName} name="fullName" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">MSV</label>
                            <input type="text" value={inputValues.code} name="code" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Lớp</label>
                                <input type="text" name="class" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputEmail4">Giới tính</label>
                                <select value={inputValues.gender} name="gender" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataGender && dataGender.length > 0 &&
                                        dataGender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                           <div className="form-group col-4">
                            <label htmlFor="inputAddress">Địa chỉ</label>
                            <input type="text" value={inputValues.address} name="address" onChange={(event) => handleOnChange(event)} className="form-control" id="inputAddress" />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputEmail4">Số điện thoại</label>
                                <input type="text"  name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control" id="" />
                            </div>
                            <div className="form-group col-4">
                                <label htmlFor="inputEmail4">Ngày sinh</label>
                                <DatePicker className="form-control" onChange={handleOnChangeDatePicker}
                                    value={birthday} name="dob"

                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-3">
                                <label htmlFor="inputCity">CCCD</label>
                                <input type="number"  name="identification" onChange={(event) => handleOnChange(event)} className="form-control" id="" />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">CCCD mặt trước</label>
                                <input type="file" id="previewImg" accept=".jpg,.png" name='idenBefore'
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">CCCD mặt sau</label>
                                <input type="file" id="previewImg" accept=".jpg,.png" name='idenAfter'
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="inputPassword4">Hình 3x4</label>
                                <input type="file" id="previewImg" accept=".jpg,.png" name='image'
                                    hidden onChange={(event) => handleOnChangeImage(event)}
                                />
                                <br></br>
                                <label style={{ backgroundColor: '#eee', borderRadius: '5px', padding: '6px', cursor: 'pointer' }} className="label-upload" htmlFor="previewImg"

                                >Tải ảnh <i className="fas fa-upload"></i></label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-image"></div>
                            </div>
                        </div>

                        <button type="button" onClick={() => handleSaveUser()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddStudent;