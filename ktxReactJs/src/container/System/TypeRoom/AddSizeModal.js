import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useFetchAllcode } from '../../customize/fetch';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import {getTypeRomPriceByIdService} from "../../../services/typeRoomPriceService"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import DatePicker from '../../../component/input/DatePicker';



const AddSizeModal = (props) => {

    
    const [inputValues, setInputValues] = useState({
        priceService: '', priceTypeRoom: '', startAt: '', isActionUpdate: false, typeRoomPriceId: '', endAt: '', 
        isChangeFromDate: false, isChangeToDate: false,
    });
    const [oldStartAt, setoldStartAt] = useState('')
    const [oldEndAt, setoldEndAt] = useState('')
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    useEffect(() => {
        let id = props.typeRoomPriceId
        if (id) {
            let fetchDetailTypeRomPrice = async () => {
                let res = await getTypeRomPriceByIdService(id)
                if (res && res.errCode === 0) {
                    setoldStartAt( res.data.startAt)
                    setoldEndAt( res.data.endAt)
                    setInputValues({
                        ...inputValues, ["isActionUpdate"]: true, ["priceService"]: res.data.priceService, ["priceTypeRoom"]: res.data.priceTypeRoom,
                        ["startAt"]:  moment.unix(+res.data.startAt  / 1000).locale('vi').format('DD/MM/YYYY'),
                        ["typeRoomPriceId"]: res.data.typeRoomPriceId, 
                        ["endAt"]: moment.unix(+ res.data.endAt  / 1000).locale('vi').format('DD/MM/YYYY'),
                    })

                }
            }
            fetchDetailTypeRomPrice()
        }
    }, [props.isOpenModal])
    let handleSaveInfor = () => {
        const id = props.typeRoomPriceId
        if(id) { // update
            props.sendDataFromModalSize({
                priceService: inputValues.priceService,
                priceTypeRoom: inputValues.priceTypeRoom,
                isActionUpdate: inputValues.isActionUpdate,
                typeRoomPriceId: props.typeRoomPriceId,
                id: props.typeRoomPriceId ,        
                startAt: inputValues.isChangeFromDate === false ? oldStartAt : new Date(inputValues.startAt).getTime(),
                endAt: inputValues.isChangeToDate === false ? oldEndAt: new Date(inputValues.endAt).getTime()
               
            })
        }
        else { // them moi
            props.sendDataFromModalSize({
                priceService: inputValues.priceService,
                priceTypeRoom: inputValues.priceTypeRoom,
                startAt: inputValues.startAt,
                isActionUpdate: inputValues.isActionUpdate,
                typeRoomPriceId: props.typeRoomPriceId,
                endAt: inputValues.endAt,
                id: props.typeRoomPriceId ,
            })
        }
        setInputValues({ ...inputValues, ["endAt"]: '',["priceService"]: '',  ["priceTypeRoom"]: '', ["startAt"]: '', ["typeRoomPriceId"]: '', ["isActionUpdate"]: false, ["isChangeFromDate"]: false, ["isChangeToDate"]: false })
    }
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({ ...inputValues, ["endAt"]: '',["priceService"]: '',  ["priceTypeRoom"]: '', ["startAt"]: '', ["typeRoomPriceId"]: '', ["isActionUpdate"]: false,["isChangeFromDate"]: false , ["isChangeToDate"]: false})

    }
    let handleOnChangeDatePicker =(date) => {
        
        setInputValues({
            ...inputValues,
            ["startAt"]: date[0],
            ["isChangeFromDate"]: true
        })
    }
    let handleOnChangeDatePickerToDate = (date) => {
        
        setInputValues({
            ...inputValues,
            ["endAt"]: date[0],
            ["isChangeToDate"]: true
        })
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Thêm giá</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Giá dịch vụ</label>
                            <input value={inputValues.priceService} name="priceService" onChange={(event) => handleOnChange(event)} type="text" className="form-control"/>
                        </div>
                        <div className="col-12 form-group">
                            <label>Giá loại phòng</label>
                            <input value={inputValues.priceTypeRoom} name="priceTypeRoom" onChange={(event) => handleOnChange(event)} type="text" className="form-control"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label>Thời gian áp dụng bắt đầu</label>
                            <DatePicker className="form-control" onChange={handleOnChangeDatePicker}
                                    value={inputValues.startAt}                                />
                        </div>
                        <div className="col-12 form-group">
                            <label>Thời gian áp dụng kết thúc</label>
                            <DatePicker className="form-control" onChange={handleOnChangeDatePickerToDate}
                                    value={inputValues.endAt}/>
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={handleSaveInfor}
                    >
                        Lưu thông tin
                    </Button>
                    {' '}
                    <Button onClick={handleCloseModal}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    )
}
export default AddSizeModal;