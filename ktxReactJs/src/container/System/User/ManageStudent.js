import React from 'react';
import { useEffect, useState } from 'react';
import { getAllUsers, DeleteUserService } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../utils/constant';
import ReactPaginate from 'react-paginate';
import CommonUtils from '../../../utils/CommonUtils';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import FormSearch from '../../../component/Search/FormSearch';

const ManageStudent = () => {

    const [dataUser, setdataUser] = useState([]);
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [keyword, setkeyword] = useState('')
    
    useEffect(() => {
        
         fetchAllStudent(keyword)
    }, [])
    let fetchAllStudent = async (keyword) => {
       
        let res = await getAllUsers({
            limit: PAGINATION.pagerow,
            offset: 0,
            keyword:keyword,
            roleId: 'R2'
        })
        setdataUser(res);
        if (res && res.errCode === 0) {

            setdataUser(res.data);
            setCount(Math.ceil(res.count / PAGINATION.pagerow))
            
        }
        
    }

    let handleBanUser = async (event, id) => {
        event.preventDefault();

        let res = await DeleteUserService(id)
        if (res && res.errCode === 0) {
            toast.success("Xóa người dùng thành công")
            let user = await getAllUsers({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                keyword:keyword
            })
            if (user && user.errCode === 0) {

                setdataUser(user.data);
                setCount(Math.ceil(user.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Xóa người dùng thất bại")
        }
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllUsers({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            keyword:keyword,
            roleId:'R2'

        })
        if (arrData && arrData.errCode === 0) {
            setdataUser(arrData.data)

        }
    }
    let handleSearchUser = (keyword) =>{
        fetchAllStudent(keyword)
        setkeyword(keyword)
    }
    let handleOnchangeSearch = (keyword) =>{
        if(keyword === ''){
            fetchAllStudent(keyword)
            setkeyword(keyword)
        }
    }
    let handleOnClickExport =async (keyword) =>{
        let res = await getAllUsers({
            limit: '',
            offset: '',
            keyword:keyword,
            roleId: 'R2'
        })
        if(res && res.errCode == 0){
            await CommonUtils.exportExcel(res.data,"Danh sách sinh viên","ListStudent")
        }
       
    }
    
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý sinh viên</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    Danh sách sinh viên
                </div>
                <div className="card-body">
                    <div className='row'>
                    <div  className='col-6'>
                    <FormSearch title={"mã sinh viên, số điện thoại"} handleOnchange={handleOnchangeSearch} handleSearch={handleSearchUser} />
                    </div>
                    <div className='col-6'>
                    <button  style={{float:'right'}} onClick={() => handleOnClickExport(keyword)} className="btn btn-success" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                    </div>
                    </div>
               
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>MSV</th>
                                    <th>Email</th>
                                    <th>Họ và tên</th>
                                    <th>Lớp</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataUser && dataUser.length > 0 &&
                                    dataUser.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.code}</td>
                                                <td>{item.email}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.class}</td>
                                                <td>{item.phonenumber}</td>
                                                
                                                
                                          
                                                <td>{item.stayStatus == 1 ? 'Còn ở KTX' : 'Đã ra KTX' }</td>
                                                <td>
                                                    <Link to={`/admin/edit-student/${item.id}`}>Edit</Link>
                                                    &nbsp; &nbsp;
                                                    <a href="#" onClick={(event) => handleBanUser(event, item.id)} >---</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Quay lại'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                pageCount={count}
                marginPagesDisplayed={3}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                breakClassName={"page-item"}
                activeClassName={"active"}
                onPageChange={handleChangePage}
            />
        </div>
    )
}
export default ManageStudent;