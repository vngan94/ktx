import React from 'react';
import { useEffect, useState } from 'react';

import {getDetailFAQByIdService, createNewFAQService, updateFAQService  } from '../../../services/faqService';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
const AddFAQ = (props) => {
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
   
    const [user, setUser] = useState({})
    const [inputValues, setInputValues] = useState({
        userId: '', question: '',answer: ''
    });

    // 
    
    useEffect(() => {    
        const userData = JSON.parse(localStorage.getItem('userData'));
      
        setUser(userData)
        if (id) {
            let fetchDetailFAQ = async () => {
                setisActionADD(false)
                let faq = await getDetailFAQByIdService(id)
                if (faq && faq.errCode === 0) {
                    setInputValues({ ...inputValues, 
                        ["userId"]: faq.data.userId, 
                        ["question"]: faq.data.question,
                        ["answer"]: faq.data.answer,
                    })
                }
            }
            fetchDetailFAQ()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleSaveFAQ = async () => {
        if (isActionADD === true) {
            let res = await createNewFAQService({
                userId: user.id,
                question: inputValues.question,
                answer: inputValues.answer,
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm FAQ thành công")
                setInputValues({
                    ...inputValues,
                    ["question"]: '',
                    ["answer"]: '',
                })
            }
            else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else toast.error("Thêm FAQ thất bại")
        } else {
            let res = await updateFAQService({
                question: inputValues.question,
                answer: inputValues.answer,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật FAQ thành công")

            }
            else if (res && res.errCode === 1) {
                toast.error(res.errMessage)
            }
            else toast.error("Cập nhật FAQ thất bại")
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý FAQ</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {isActionADD === true ? 'Thêm mới FAQ' : 'Cập nhật thông tin FAQ'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Câu hỏi</label>
                                <input type="text" value={inputValues.question} name="question" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Câu trả lời</label>
                                <input type="text" value={inputValues.answer} name="answer" onChange={(event) => handleOnChange(event)} className="form-control" id="inputPassword4" />
                            </div>
                            
                        </div>
                        <button type="button" onClick={() => handleSaveFAQ()} className="btn btn-primary">Lưu thông tin</button>
                    </form>
                </div>
            </div>
        </div>
       
    )
}
export default AddFAQ;


