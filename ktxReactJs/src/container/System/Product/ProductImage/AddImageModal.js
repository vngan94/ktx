import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";
import { getAllRoomBedNewByIdService } from '../../../../services/codeService';


const AddImageModal = (props) => {

    const [inputValues, setInputValues] = useState({
        code: ''
    });
    const [dataBed, setdataBed] = useState([]);

    useEffect(() => {
        
        let idRoom = props.roomId
        if (idRoom &&  props.isOpenModal) {
            let fetchBed = async () => {
                let res = await getAllRoomBedNewByIdService(idRoom)
                if (res && res.errCode === 0) {
                    setdataBed(res.data)
                }
                else {
                    toast.error(res.errMessage)
                }
            }
            fetchBed();
        }
    }, [props.isOpenModal])



    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let HandleSendDataFromModal = () => {
        props.sendDataFromModal({
            code: inputValues.code
        })
        setInputValues({
            ...inputValues, ["code"]: '',
        })
        setdataBed(null)

    }
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({
            ...inputValues, ["code"]: ''
        })
        setdataBed(null)
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Thêm giường</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                        
                    <select className=" form-select  " name='code' onChange={handleOnChange}>
                    <option value={'ALL'} selected >Giường</option>
                    {
                        dataBed && dataBed.length > 0 &&
                        dataBed.map((item, index) => {
                            return (
                                <option value={item.code}>{item.value}</option>
                            )
                        })
                    }
                </select>
                        </div>
                    
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={HandleSendDataFromModal}
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
export default AddImageModal;