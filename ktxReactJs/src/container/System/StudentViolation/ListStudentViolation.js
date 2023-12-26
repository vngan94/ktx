// import React from 'react';
// import { useEffect, useState } from 'react';
// import { deleteReceiptService, getAllReceipt } from '../../../services/userService';
// import moment from 'moment';
// import { toast } from 'react-toastify';
// import { PAGINATION } from '../../../utils/constant';
// import ReactPaginate from 'react-paginate';
// import CommonUtils from '../../../utils/CommonUtils';
// import FormSearch from '../../../component/Search/FormSearch';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect
// } from "react-router-dom";

// const ManageRegulation = () => {

//     const [dataReceipt, setdataReceipt] = useState([])
//     const [dataArea, setdataArea] = useState([
//       {id: "1",value: "Khu A"},
//       {id: "2",value: "Khu B"},
//       {id: "3",value: "Khu C"},
//     ])
//     const [dataTypeRoom, setdataTypeRoom] = useState([
//         {id: "1",typeRoomName: "Phòng 2 sinh viên", maxStudent: "2", status: "Hoạt động"},
//         {id: "2",typeRoomName: "Phòng 4 sinh viên", maxStudent: "4",  status: "Hoạt động"},
//         {id: "3",typeRoomName: "Phòng 6 sinh viên", maxStudent: "6", status: "Hoạt động"},
//     ])

//     const [dataStatus, setdataStatus] = useState([
//         {id: "1",value: "Hết slot"},
//         {id: "2",value: "Còn trống"},

//     ])

//     const [keyword, setkeyword] = useState([])
//     const [count, setCount] = useState('')
//     const [numberPage, setnumberPage] = useState('')
//     useEffect(() => {
//         try {

//             fetchData();
//         } catch (error) {
//             console.log(error)
//         }

//     }, [])
//     let handleOnchangeSearch = (keyword) =>{
//         if(keyword === ''){
//             fetchData(keyword)
//             setkeyword(keyword)
//         }
//     }
//     let handleSearchUser = (keyword) =>{
//         fetchData(keyword)
//         setkeyword(keyword)
//     }
//     let fetchData = async () => {
//         let arrData = await getAllReceipt({

//             limit: PAGINATION.pagerow,
//             offset: 0,

//         })
//         if (arrData && arrData.errCode === 0) {
//             setdataReceipt(arrData.data)
//             setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
//         }
//     }

//     let handleChangePage = async (number) => {
//         setnumberPage(number.selected)
//         let arrData = await getAllReceipt({

//             limit: PAGINATION.pagerow,
//             offset: number.selected * PAGINATION.pagerow,

//         })
//         if (arrData && arrData.errCode === 0) {
//             setdataReceipt(arrData.data)

//         }
//     }

//     let handleOnClickExport =async () =>{
//         let res = await getAllReceipt({
//             limit: '',
//             offset: '',

//         })
//         if(res && res.errCode == 0){
//             await CommonUtils.exportExcel(res.data,"Danh sách nhập hàng","ListReceipt")
//         }

//     }
//     return (
//         <div className="container-fluid px-4">
//             <h1 className="mt-4">Quản lý vi phạm sinh viên</h1>

//             <div className="card mb-4">
//                 <div className="card-header">
//                     <i className="fas fa-table me-1" />
//                     Danh sách vi phạm sinh viên
//                 </div>
//                 <div className="card-body ">
//                     <div className='row mb-2' >

//                     <div className='col-4 '>
//                         <FormSearch title={"mã sinh viên"} />
//                     </div>
//                 <div className='col-8 '>
//                         <button  style={{float:'right'}} onClick={() => handleOnClickExport()} className="btn btn-success mb-2" >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
//                     </div>
//                </div>
//                {/* <div className='row mb-2'>
//                <select className="col-2 ml-3">
//                     <option value={'ALL'} selected>Khu</option>
//                     {
//                         dataArea && dataArea.length > 0 &&
//                         dataArea.map((item, index) => {
//                             return (
//                                 <option value={item.code}>{item.value}</option>
//                             )
//                         })
//                     }
//                 </select>

//                     <select className=" col-2 ml-2  " >
//                     <option value={'ALL'} selected>Loại phòng</option>
//                     {
//                         dataTypeRoom && dataTypeRoom.length > 0 &&
//                         dataTypeRoom.map((item, index) => {
//                             return (
//                                 <option value={item.code}>{item.value}</option>
//                             )
//                         })
//                     }
//                 </select>

//                     <select  className=" col-2 ml-2 "  >
//                     <option value={'ALL'} selected>Trạng thái</option>
//                     {
//                         dataStatus && dataStatus.length > 0 &&
//                         dataStatus.map((item, index) => {
//                             return (
//                                 <option value={item.code}>{item.value}</option>
//                             )
//                         })
//                     }
//                 </select>
//                 <div className='col-2 '>
//                         <button  style={{float:'left'}} className="btn btn-success " >Tìm <i class=""></i></button>
//                     </div>
//                </div> */}
//                     <div className="table-responsive">
//                         <table className="table table-bordered" style={{ border: '1' }} width="100%" cellspacing="0">
//                             <thead>
//                                 <tr>
//                                     <th>STT</th>
//                                     <th>Mã vi phạm sinh viên</th>
//                                     <th>Mã sinh viên</th>
//                                     <th>Họ tên</th>
//                                     <th>Số lần vi phạm</th>
//                                     <th>Thao tác</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {dataTypeRoom && dataTypeRoom.length > 0 &&
//                                     dataTypeRoom.map((item, index) => {
//                                         return (

//                                             <tr key={index}>
//                                                 <td>{index + 1}</td>
//                                                 <td>1</td>
//                                                 <td>N19DCCN119</td>
//                                                 <td>Võ Thị Ngân</td>
//                                                 <td>2</td>
//                                                 <td>
//                                                     {/* view theo mã sinh viên, chỉnh lại id nhé*/}
//                                                 <Link to={`/admin/studentviolation/${item.id}`}>View</Link>
//                                                     &nbsp; &nbsp;

//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                 }

//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             <ReactPaginate
//                 previousLabel={'Quay lại'}
//                 nextLabel={'Tiếp'}
//                 breakLabel={'...'}
//                 pageCount={count}
//                 marginPagesDisplayed={3}
//                 containerClassName={"pagination justify-content-center"}
//                 pageClassName={"page-item"}
//                 pageLinkClassName={"page-link"}
//                 previousLinkClassName={"page-link"}
//                 nextClassName={"page-item"}
//                 nextLinkClassName={"page-link"}
//                 breakLinkClassName={"page-link"}
//                 breakClassName={"page-item"}
//                 activeClassName={"active"}
//                 onPageChange={handleChangePage}
//             />
//         </div>
//     )
// }
// export default ManageRegulation;
import React from "react";
import { useEffect, useState } from "react";
import {
  deleteReceiptService,
  getAllReceipt,
} from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import { PAGINATION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import FormSearch from "../../../component/Search/FormSearch";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const ManageRegulation = () => {
  console.log("Hellooooooooooooooooo");
  const [dataReceipt, setdataReceipt] = useState([]);
  const [dataArea, setdataArea] = useState([
    { id: "1", value: "Khu A" },
    { id: "2", value: "Khu B" },
    { id: "3", value: "Khu C" },
  ]);
  const [dataTypeRoom, setdataTypeRoom] = useState([
    {
      id: "1",
      typeRoomName: "Phòng 2 sinh viên",
      maxStudent: "2",
      status: "Hoạt động",
    },
    {
      id: "2",
      typeRoomName: "Phòng 4 sinh viên",
      maxStudent: "4",
      status: "Hoạt động",
    },
    {
      id: "3",
      typeRoomName: "Phòng 6 sinh viên",
      maxStudent: "6",
      status: "Hoạt động",
    },
  ]);

  const [dataStatus, setdataStatus] = useState([
    { id: "1", value: "Hết slot" },
    { id: "2", value: "Còn trống" },
  ]);

  const [keyword, setkeyword] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  let handleOnChange = (event) => {
    // if(keyword === ''){
    //     fetchData(keyword)
    //     setkeyword(keyword)
    // }
  };
  let handleSearchUser = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let fetchData = async () => {
    let arrData = await getAllReceipt({
      limit: PAGINATION.pagerow,
      offset: 0,
    });
    if (arrData && arrData.errCode === 0) {
      setdataReceipt(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllReceipt({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
    });
    if (arrData && arrData.errCode === 0) {
      setdataReceipt(arrData.data);
    }
  };

  let handleOnClickExport = async () => {
    let res = await getAllReceipt({
      limit: "",
      offset: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách nhập hàng",
        "ListReceipt"
      );
    }
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý vi phạm sinh viên</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách vi phạm của Võ Thị Ngân - N19DCCN119
        </div>

        <div className="card-body ">
          <div className="row mb-2">
            <div className="col-4 ">
              <FormSearch title={"tên vi phạm"} />
            </div>
            {/* <div className="col-8 ">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport()}
                className="btn btn-success mb-2"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
            </div> */}
          </div>
          {/* <div className='row mb-2'>
               <select className="col-2 ml-3">
                    <option value={'ALL'} selected>Khu</option>
                    {
                        dataArea && dataArea.length > 0 &&
                        dataArea.map((item, index) => {
                            return (
                                <option value={item.code}>{item.value}</option>
                            )
                        })
                    }
                </select>
                    
                    
                    <select className=" col-2 ml-2  " >
                    <option value={'ALL'} selected>Loại phòng</option>
                    {
                        dataTypeRoom && dataTypeRoom.length > 0 &&
                        dataTypeRoom.map((item, index) => {
                            return (
                                <option value={item.code}>{item.value}</option>
                            )
                        })
                    }
                </select>
                 
                    
                    <select  className=" col-2 ml-2 "  >
                    <option value={'ALL'} selected>Trạng thái</option>
                    {
                        dataStatus && dataStatus.length > 0 &&
                        dataStatus.map((item, index) => {
                            return (
                                <option value={item.code}>{item.value}</option>
                            )
                        })
                    }
                </select>
                <div className='col-2 '>
                        <button  style={{float:'left'}} className="btn btn-success " >Tìm <i class=""></i></button>
                    </div>
               </div> */}
          <div className="table-responsive">
            <table
              className="table table-bordered"
              style={{ border: "1" }}
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên vi phạm</th>
                  <th>Vi phạm lần thứ</th>
                  <th>Hình phạt</th>
                  <th>Ngày vi phạm</th>
                  <th>Ghi chú</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataTypeRoom &&
                  dataTypeRoom.length > 0 &&
                  dataTypeRoom.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>Đánh nhau</td>
                        <td>1</td>
                        <td>Kỷ luật mức cảnh cáo</td>
                        <td>20/3/2021</td>
                        <td>Ghi chú</td>

                        <td>
                          <Link to={`/admin/edit-studentviolation/${item.id}`}>
                            Edit
                          </Link>
                          &nbsp; &nbsp;
                          <Link
                            to={`/admin/delete-studentviolation/${item.id}`}
                          >
                            Xóa
                          </Link>
                          &nbsp; &nbsp;
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Quay lại"}
        nextLabel={"Tiếp"}
        breakLabel={"..."}
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
  );
};
export default ManageRegulation;
