
import React from 'react';
import { useEffect, useState } from 'react';
import CommonUtils from '../../../utils/CommonUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import {getAllRoomByWithoutTypeRoom} from "../../../services/roomService"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";



const AddImageModal = (props) => {

    const [inputValues, setInputValues] = useState({
        id: ''
    });
    
    const [dataRoom, setdataRoom] = useState({})
    useEffect(() => {
        let fetchRoom = async () => {
            let arrData = await getAllRoomByWithoutTypeRoom()
            if (arrData && arrData.errCode === 0) {
                setdataRoom(arrData.data)
            }
        }
        fetchRoom()
    }, [props.isOpenModal])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let HandleSendDataFromModal = () => {
        props.sendDataRealFromModal({
            id: inputValues.id
        })
        setInputValues({ ...inputValues, ["id"]: '' })
    }
    let handleCloseModal = () => {
        props.closeModal()
        setInputValues({ ...inputValues, ["id"]: '' })
    }
    return (
        <div className="">
            <Modal isOpen={props.isOpenModal} className={'booking-modal-container'}
                size="md" centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Thêm phòng</h5>
                    <button onClick={handleCloseModal} type="button" className="btn btn-time" aria-label="Close">X</button>
                </div>
                <ModalBody>
                    <div className="row">
                    <label>Danh sách phòng chưa được xếp loại phòng</label>  
                    <select className=" form-select  " onChange={handleOnChange} name="id">
                    <option value={'ALL'} selected>Phòng</option>
                    {
                        dataRoom && dataRoom.length > 0 &&
                        dataRoom.map((item, index) => {
                            return (
                                <option value={item.id}>{item.roomName}</option>
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
            {inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                />
            }
        </div >
    )
}
export default AddImageModal;