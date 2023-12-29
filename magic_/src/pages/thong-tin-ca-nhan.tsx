import styled from "@emotion/styled";
import { MasterLayout } from "../components/templates/MasterLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@emotion/css";
import { cloneDeep } from "lodash-es";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  faChevronDown,
  faChevronUp,
  faFilter,
  faBars,
  faUser,
  faListCheck,
  faTrash,
  faMagnifyingGlass,
  faListUl,
  faCloudArrowDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useState, useMemo } from "react";

const ProfilePageStyled = styled.div`
  background: white;
  height: 100%;
  .menuSide {
    padding: 40px;
    border-right: 1px solid #d7d8e5;

    &_select {
      padding: 10px;
      color: white;
      font-size: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background-color: #7c7fe4;
      margin-bottom: 20px;
      font-weight: 700;
    }
    &_subSelect {
      padding: 0 20px;
      button {
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid;
        padding: 10px;
        border-radius: 10px;
        font-weight: 700;
        background-color: white;
        &.-active {
          background-color: #efecec;
        }
      }
    }
  }
  .contentSide {
    padding: 40px;
    .buttonSubmit {
      padding: 5px 25px;
      color: white;
      font-weight: 700;
      background-color: #150e60;
    }
    table {
      thead th {
        background-color: #7c7fe4;
        border: 1px solid white;
        color: white;
        text-align: center;
      }
    }
    .createOrder {
      border-radius: 40px;
      background-color: #7c7fe4;
      padding: 20px;
    }
    .editProfile {
      border-radius: 40px;
      background-color: #7c7fe4;
      padding: 20px 60px;
    }
    .searchInput {
      display: flex;
      border: 1px solid #7c7fe4;
      align-items: center;
      width: 350px;
      padding: 5px 10px;
      border-radius: 20px;
      color: #7c7fe4;
      input {
        border: none;
        width: 100%;
        padding: 5px;
        outline: none;
      }
    }
    .filterBtn {
      position: relative;
      &_icon {
        color: #595ce2;
        font-size: 36px;
      }
      &_content {
        background-color: #7c7fe4;
        padding: 10px;
        border-radius: 10px;
        position: absolute;
        font-size: 0.75rem;
        font-weight: 700;
        width: 140px;
        right: 0;
        color: white;
        border: 1px solid white;
      }
    }
    .addFieldBtn {
      cursor: pointer;
      margin-bottom: 5px;
      &.-isShow {
        color: #adadad;
      }
    }
    .searchFields {
      display: flex;
      flex-flow: wrap;
      &_item {
        color: #7c7fe4;
        margin-right: 10px;
        margin-bottom: 5px;
        input {
          border: 1px solid #7c7fe4;
          width: 140px;
          padding: 10px 15px;
          border-radius: 20px;
          outline: none;
        }
      }
    }
  }
`;

const ProfilePage = () => {
  const [selectChosen, setSelectChosen] = useState("qltk");
  const [subSelectChosen, setSubSelectChosen] = useState("tttk");
  const [filterBtnType, setFilterBtnType] = useState("");
  const [tableSearchColumns, setTableSearchColumns] = useState([
    {
      name: "Mã đơn",
      isShow: true,
    },
    {
      name: "Thời gian",
      isShow: true,
    },
    {
      name: "Người gửi",
      isShow: true,
    },
    {
      name: "Người nhận",
      isShow: true,
    },
    {
      name: "Tình trạng",
      isShow: true,
    },
    {
      name: "All/dtk/dgd",
      isShow: true,
    },
  ]);
  const [filterInputList, setFilterInputList] = useState([
    {
      name: "Mã đơn",
      isShow: false,
    },
    {
      name: "Thời gian",
      isShow: false,
    },
    {
      name: "Người gửi",
      isShow: false,
    },
    {
      name: "Người nhận",
      isShow: false,
    },

    {
      name: "Tình trạng",
      isShow: false,
    },
    {
      name: "All/dtk/dgd",
      isShow: false,
    },
  ]);

  const [tableSearchColumnsWithOrder, setTableSearchColumnsWithOrder] = useState([
    {
      name: "Mã đơn",
      isShow: true,
    },
    {
      name: "Người nhận",
      isShow: true,
    },
    {
      name: "Kho xuất",
      isShow: true,
    },
    {
      name: "Điểm giao dịch",
      isShow: true,
    },
    {
      name: "Trạng thái",
      isShow: true,
    },
    {
      name: "Thao tác",
      isShow: true,
    },
  ]);

  const [tableSearchColumnsWithOrderDestination, setTableSearchColumnsWithOrderDestination] =
    useState([
      {
        name: "Mã đơn",
        isShow: true,
      },
      {
        name: "Người nhận",
        isShow: true,
      },
      {
        name: "Contact",
        isShow: true,
      },
      {
        name: "Địa chỉ",
        isShow: true,
      },
      {
        name: "Thao tác",
        isShow: true,
      },
    ]);

  const [selectedStatus, setSelectedStatus] = useState<"waiting" | "destination">("waiting");

  Chart.register(...registerables);

  function handleChangeFilterColumn(index) {
    const tableSearchColumnsData = cloneDeep(tableSearchColumns);
    tableSearchColumnsData[index].isShow = !tableSearchColumnsData[index].isShow;
    setTableSearchColumns(tableSearchColumnsData);
  }

  function handleAddSearchField(index) {
    const filterInputListData = cloneDeep(filterInputList);
    filterInputListData[index].isShow = !filterInputListData[index].isShow;
    setFilterInputList(filterInputListData);
  }

  function handleChangeFilterColumnWithOder(index) {
    if (selectedStatus === "waiting") {
      const tableSearchColumnsData = cloneDeep(tableSearchColumnsWithOrder);
      tableSearchColumnsData[index].isShow = !tableSearchColumnsData[index].isShow;
      setTableSearchColumnsWithOrder(tableSearchColumnsData);
    } else {
      const tableSearchColumnsData = cloneDeep(tableSearchColumnsWithOrderDestination);
      tableSearchColumnsData[index].isShow = !tableSearchColumnsData[index].isShow;
      setTableSearchColumnsWithOrderDestination(tableSearchColumnsData);
    }
  }

  const dataRenderOrder = useMemo(() => {
    if (selectedStatus === "waiting") {
      return tableSearchColumnsWithOrder;
    }

    return tableSearchColumnsWithOrderDestination;
  }, [selectedStatus, tableSearchColumnsWithOrder, tableSearchColumnsWithOrderDestination]);

  console.log("====================================");
  console.log(`subSelectChosen`, subSelectChosen);
  console.log("====================================");

  return (
    <MasterLayout activeButton="">
      <ProfilePageStyled>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="menuSide h-100">
                <div
                  className="menuSide_select"
                  onClick={() => {
                    setSelectChosen("qltk");
                    setSubSelectChosen("tttk");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ms-3">Quản lý tài khoản</span>
                  <FontAwesomeIcon icon={selectChosen == "qltk" ? faChevronUp : faChevronDown} />
                </div>
                {selectChosen == "qltk" && (
                  <div className="menuSide_subSelect">
                    <button
                      onClick={() => setSubSelectChosen("tttk")}
                      className={cx({
                        "-active": subSelectChosen == "tttk" || subSelectChosen == "tttk_edit",
                      })}
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={() => setSubSelectChosen("dstk")}
                      className={cx({ "-active": subSelectChosen == "dstk" })}
                    >
                      Danh sách tài khoản
                    </button>
                  </div>
                )}
                <div
                  className="menuSide_select"
                  onClick={() => {
                    setSelectChosen("qlht");
                    setSubSelectChosen("qlht");
                  }}
                >
                  <FontAwesomeIcon icon={faBars} />
                  <span className="ms-3">Quản lý hệ thống</span>
                  <FontAwesomeIcon icon={selectChosen == "qlht" ? faChevronUp : faChevronDown} />
                </div>
                {selectChosen == "qlht" && (
                  <div className="menuSide_subSelect">
                    <button
                      onClick={() => setSubSelectChosen("tdgd")}
                      className={cx({
                        "-active": subSelectChosen == "tdgd" || subSelectChosen == "tttk_edit",
                      })}
                    >
                      Tạo ĐGD
                    </button>
                    <button
                      onClick={() => setSubSelectChosen("qlht")}
                      className={cx({ "-active": subSelectChosen == "qlht" })}
                    >
                      Danh sách ĐGD
                    </button>
                  </div>
                )}
                <div
                  className="menuSide_select"
                  onClick={() => {
                    setSelectChosen("qldh");
                    setSubSelectChosen("tdh");
                  }}
                >
                  <FontAwesomeIcon icon={faListCheck} />
                  <span className="ms-3">Quản lý đơn hàng</span>
                  <FontAwesomeIcon icon={selectChosen == "qldh" ? faChevronUp : faChevronDown} />
                </div>
                {selectChosen == "qldh" && (
                  <div className="menuSide_subSelect">
                    <button
                      onClick={() => setSubSelectChosen("tdh")}
                      className={cx({ "-active": subSelectChosen == "tdh" })}
                    >
                      Tạo đơn hàng
                    </button>
                    <button
                      onClick={() => setSubSelectChosen("xndh")}
                      className={cx({ "-active": subSelectChosen == "xndh" })}
                    >
                      Xác nhận đơn hàng
                    </button>
                  </div>
                )}
                <div
                  className="menuSide_select"
                  onClick={() => {
                    setSelectChosen("tk");
                    setSubSelectChosen("hg");
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <span className="ms-3">Thống kê</span>
                  <FontAwesomeIcon icon={selectChosen == "tk" ? faChevronUp : faChevronDown} />
                </div>
                {selectChosen == "tk" && (
                  <div className="menuSide_subSelect">
                    <button
                      onClick={() => setSubSelectChosen("hg")}
                      className={cx({ "-active": subSelectChosen == "hg" })}
                    >
                      Xem thống kê
                    </button>
                    <button
                      onClick={() => setSubSelectChosen("hn")}
                      className={cx({ "-active": subSelectChosen == "hn" })}
                    >
                      Hàng gửi
                    </button>
                    <button
                      onClick={() => setSubSelectChosen("tc")}
                      className={cx({ "-active": subSelectChosen == "tc" })}
                    >
                      Hàng nhận
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="col-8">
              <div className="contentSide">
                {}
                {subSelectChosen === "tttk" && (
                  <div className="row align-items-center">
                    <div className="col-6">
                      <Image src="/images/v1/user-is-logged.png" alt="" width={300} height={300} />
                    </div>
                    <div className="col-6 text-center">
                      <div className="p-2 border-bottom border-secondary">Username</div>
                      <div className="p-2 border-bottom border-secondary">ID</div>
                      <div className="p-2 border-bottom border-secondary">Chức vụ</div>
                      <div className="p-2 border-bottom border-secondary">Password</div>
                      <button
                        className="btn buttonSubmit mt-4"
                        onClick={() => setSubSelectChosen("tttk_edit")}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                )}
                {subSelectChosen === "tdgd" && (
                  <div className="createOrder">
                    <h4 className="fw-bold text-center text-black mb-3">Tạo điểm giao dịch</h4>
                    <form>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Tỉnh thành phố</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

                        <div className="col-12 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Huyện/Quận</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-12 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Xã/phường</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-12 mb-3">
                          <input className="form-control" placeholder="Địa chỉ cụ thể" />
                        </div>

                        <div className="col-10 mb-3">
                          <input className="form-control" placeholder="Tên điểm giao dịch" />
                        </div>
                        <div className="col-2 mb-3">
                          <input className="form-control" placeholder="Id" />
                        </div>

                        <div className="col-10 mb-3">
                          <input
                            className="form-control"
                            placeholder="Tên quản lý điểm giao dịch"
                          />
                        </div>
                        <div className="col-2 mb-3">
                          <input className="form-control" placeholder="Id" />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <button className="btn buttonSubmit me-2">Hủy</button>
                        <button className="btn buttonSubmit ">Lưu</button>
                      </div>
                    </form>
                  </div>
                )}
                {subSelectChosen === "qlht" && (
                  <div>
                    <table className="table table-striped mt-5">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">DGD</th>
                          <th scope="col">Quản lý</th>
                          <th scope="col">Thành phố</th>
                          <th scope="col">Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <tr key={index}>
                            <th>{`23071WCQF${index + 1}`}</th>
                            <td align="center">{`13:${(index + 1) * 10}`}</td>
                            <td align="center">{`Ola ${index + 1}`}</td>
                            <td align="center">{`Elsa ${index + 1}`}</td>
                            <td align="left" style={{ fontSize: 13 }}>
                              <button className="btn btn-danger">Xóa</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Trước
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Sau
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
                {subSelectChosen === "tttk_edit" && (
                  <div className="editProfile">
                    <h4 className="fw-bold text-center text-black mb-3">Chỉnh sửa tài khoản</h4>
                    <form>
                      <div className="mb-3">
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Chức vụ</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <select className="form-select" aria-label="Default select example">
                          <option selected>Điểm giao dịch</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <input className="form-control" placeholder="Tên đăng nhập" />
                      </div>
                      <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Mật khẩu *" />
                      </div>
                      <div className="d-flex mt-2">
                        <button
                          className="btn buttonSubmit w-50 me-3"
                          onClick={() => setSubSelectChosen("tttk")}
                        >
                          Hủy
                        </button>
                        <button type="submit" className="btn buttonSubmit w-50">
                          Lưu
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {subSelectChosen === "dstk" && (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tài khoản</th>
                        <th scope="col">Chức vụ</th>
                        <th scope="col">Mật khẩu</th>
                        <th scope="col">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1257820</th>
                        <td>Mark</td>
                        <td>Chức vụ</td>
                        <td>453**********</td>
                        <td className="text-center text-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                      </tr>
                      <tr>
                        <th>1257820</th>
                        <td>Mark</td>
                        <td>Chức vụ</td>
                        <td>453**********</td>
                        <td className="text-center text-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                      </tr>
                      <tr>
                        <th>1257820</th>
                        <td>Mark</td>
                        <td>Chức vụ</td>
                        <td>453**********</td>
                        <td className="text-center text-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {subSelectChosen === "tdh" && (
                  <div className="createOrder">
                    <h4 className="fw-bold text-center text-black mb-3">Tạo đơn hàng</h4>
                    <form>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="Người gửi" />
                        </div>
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="Người nhận" />
                        </div>
                        <div className="col-6 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Điểm giao dịch gửi</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Điểm giao dịch nhận</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="SDT người gửi" />
                        </div>
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="SDT người nhận" />
                        </div>
                        <div className="col-6 mb-3">
                          <select className="form-select" aria-label="Default select example">
                            <option selected>Loại hàng</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <input type="date" className="form-control" placeholder="Thời gian" />
                        </div>
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="Khối lượng" />
                        </div>
                        <div className="col-6 mb-3">
                          <input className="form-control" placeholder="Chi phí" />
                        </div>
                      </div>
                      <div className="text-center mt-2">
                        <button className="btn buttonSubmit w-50">Tạo đơn hàng</button>
                      </div>
                    </form>
                  </div>
                )}
                {subSelectChosen === "xndh" && (
                  <div className="createOrder">
                    <h4 className="fw-bold text-center text-black mb-3">Xác nhận đơn hàng</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="searchInput d-flex gap-3">
                        <button
                          className={`btn btn-${
                            selectedStatus === "waiting" ? "danger" : "secondary"
                          } fw-bold`}
                          onClick={() => setSelectedStatus("waiting")}
                        >
                          Chờ giao (1)
                        </button>
                        <button
                          className={`btn btn-${
                            selectedStatus === "destination" ? "info" : "secondary"
                          } fw-bold`}
                          onClick={() => setSelectedStatus("destination")}
                        >
                          Đã tới (5)
                        </button>
                      </div>

                      <div className="d-flex">
                        <div className="filterBtn">
                          <div
                            className="filterBtn_icon me-4 text-white"
                            onClick={() =>
                              setFilterBtnType(
                                filterBtnType == "filterColumn" ? "" : "filterColumn"
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faListUl} />
                          </div>
                          {filterBtnType == "filterColumn" && (
                            <div className="filterBtn_content">
                              {dataRenderOrder.map((item, index) => {
                                return (
                                  <div className="form-check form-switch">
                                    <label className="form-check-label">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isShow}
                                        onChange={() => handleChangeFilterColumnWithOder(index)}
                                      />
                                      {item.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <div className="filterBtn">
                          <div className="filterBtn_icon text-white">
                            <FontAwesomeIcon icon={faCloudArrowDown} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <table className="table table-striped ">
                      <thead>
                        <tr>
                          {dataRenderOrder
                            .filter((item) => item.isShow)
                            .map((item) => {
                              return <th scope="col">{item.name}</th>;
                            })}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index}>
                            {dataRenderOrder
                              .filter((item) => item.isShow)
                              .map((item) => {
                                if (item.name === "Trạng thái") {
                                  return (
                                    <td>
                                      <div>
                                        <span
                                          style={{ background: "#B4B4E4" }}
                                          className="badge badge-pill badge-success text-white"
                                        >
                                          Đã tới điểm gd
                                        </span>
                                      </div>
                                    </td>
                                  );
                                }

                                if (item.name === "Thao tác") {
                                  return (
                                    <td scope="col">
                                      {selectedStatus === "waiting" ? (
                                        <>
                                          <button className={`btn btn-success btn-sm fw-bold`}>
                                            Xác nhận
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            className={`btn btn-small btn-success fw-bold btn-sm`}
                                            onClick={() => setSelectedStatus("waiting")}
                                          >
                                            Thành công
                                          </button>
                                          <button
                                            className={`btn btn-danger ms-1 fw-bold btn-sm`}
                                            onClick={() => setSelectedStatus("destination")}
                                          >
                                            Thất bại
                                          </button>
                                        </>
                                      )}
                                    </td>
                                  );
                                }

                                return <td scope="col">x</td>;
                              })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Trước
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Sau
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
                {subSelectChosen === "hg" && (
                  <div>
                    <Line
                      data={{
                        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                        datasets: [
                          {
                            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                            label: "Africa",
                            borderColor: "#3e95cd",
                            fill: false,
                          },
                          {
                            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                            label: "Asia",
                            borderColor: "#8e5ea2",
                            fill: false,
                          },
                          {
                            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                            label: "Europe",
                            borderColor: "#3cba9f",
                            fill: false,
                          },
                          {
                            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                            label: "Latin America",
                            borderColor: "#e8c3b9",
                            fill: false,
                          },
                          {
                            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                            label: "North America",
                            borderColor: "#c45850",
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: true,
                          text: "World population per region (in millions)",
                        },
                        legend: {
                          display: true,
                          position: "bottom",
                        },
                      }}
                    />

                    <table className="table table-striped mt-5">
                      <thead>
                        <tr>
                          <th scope="col">Mã đơn</th>
                          <th scope="col">Thời gian</th>
                          <th scope="col">Người gửi</th>
                          <th scope="col">Người nhận</th>
                          <th scope="col">Tình trạng</th>
                          <th scope="col">All/dtk/dgd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </th>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input
                              style={{ width: "116px", heigth: "34px" }}
                              type="submit"
                              value="Find"
                            />
                          </td>
                        </tr>

                        {Array.from({ length: 4 }).map((_, index) => (
                          <tr key={index}>
                            <th>{`23071WCQF${index + 1}`}</th>
                            <td align="center">{`13:${(index + 1) * 10}`}</td>
                            <td align="center">{`Ola ${index + 1}`}</td>
                            <td align="center">{`Elsa ${index + 1}`}</td>
                            <td align="left" style={{ fontSize: 13 }}>
                              {index % 2 === 0 ? "Chuyển thành công" : `Đang  giao`}
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Trước
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Sau
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
                {subSelectChosen === "hn" && (
                  <div>
                    <Line
                      data={{
                        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                        datasets: [
                          {
                            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                            label: "Africa",
                            borderColor: "#3e95cd",
                            fill: false,
                          },
                          {
                            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                            label: "Asia",
                            borderColor: "#8e5ea2",
                            fill: false,
                          },
                          {
                            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                            label: "Europe",
                            borderColor: "#3cba9f",
                            fill: false,
                          },
                          {
                            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                            label: "Latin America",
                            borderColor: "#e8c3b9",
                            fill: false,
                          },
                          {
                            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                            label: "North America",
                            borderColor: "#c45850",
                            fill: false,
                          },
                        ],
                      }}
                      options={{
                        title: {
                          display: true,
                          text: "World population per region (in millions)",
                        },
                        legend: {
                          display: true,
                          position: "bottom",
                        },
                      }}
                    />

                    <table className="table table-striped mt-5">
                      <thead>
                        <tr>
                          <th scope="col">Mã đơn</th>
                          <th scope="col">Thời gian</th>
                          <th scope="col">Người gửi</th>
                          <th scope="col">Người nhận</th>
                          <th scope="col">Tình trạng</th>
                          <th scope="col">All/dtk/dgd</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </th>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input style={{ width: "116px", heigth: "34px" }} />
                          </td>
                          <td>
                            <input
                              style={{ width: "116px", heigth: "34px" }}
                              type="submit"
                              value="Find"
                            />
                          </td>
                        </tr>

                        {Array.from({ length: 4 }).map((_, index) => (
                          <tr key={index}>
                            <th>{`23071WCQF${index + 1}`}</th>
                            <td align="center">{`13:${(index + 1) * 10}`}</td>
                            <td align="center">{`Ola ${index + 1}`}</td>
                            <td align="center">{`Elsa ${index + 1}`}</td>
                            <td align="left" style={{ fontSize: 13 }}>
                              {index % 2 === 0 ? "Chuyển thành công" : `Đang  giao`}
                            </td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Trước
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Sau
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
                {subSelectChosen === "tc" && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="searchInput">
                        <input type="text" placeholder="Search" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
                      </div>
                      <div className="d-flex">
                        <div className="filterBtn">
                          <div
                            className="filterBtn_icon me-4"
                            onClick={() =>
                              setFilterBtnType(
                                filterBtnType == "filterColumn" ? "" : "filterColumn"
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faListUl} />
                          </div>
                          {filterBtnType == "filterColumn" && (
                            <div className="filterBtn_content">
                              {tableSearchColumns.map((item, index) => {
                                return (
                                  <div className="form-check form-switch">
                                    <label className="form-check-label">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.isShow}
                                        onChange={() => handleChangeFilterColumn(index)}
                                      />
                                      {item.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="filterBtn me-4">
                          <div
                            className="filterBtn_icon"
                            onClick={() =>
                              setFilterBtnType(filterBtnType == "addFilter" ? "" : "addFilter")
                            }
                          >
                            <FontAwesomeIcon icon={faSquarePlus} />
                          </div>
                          {filterBtnType == "addFilter" && (
                            <div className="filterBtn_content">
                              {filterInputList.map((item, index) => (
                                <div
                                  className={cx("addFieldBtn", {
                                    "-isShow": item.isShow,
                                  })}
                                  onClick={() => handleAddSearchField(index)}
                                >
                                  <div className="d-flex justify-content-between">
                                    <span>{item.name}</span>
                                    <FontAwesomeIcon icon={item.isShow ? faMinus : faPlus} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="filterBtn">
                          <div className="filterBtn_icon">
                            <FontAwesomeIcon icon={faCloudArrowDown} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="searchFields">
                      {filterInputList
                        .filter((item) => item.isShow)
                        .map((item) => {
                          return (
                            <div className="searchFields_item">
                              <input type="text" placeholder={item.name} />
                            </div>
                          );
                        })}
                    </div>

                    <table className="table table-striped mt-5">
                      <thead>
                        <tr>
                          {tableSearchColumns
                            .filter((item) => item.isShow)
                            .map((item) => {
                              return <th scope="col">{item.name}</th>;
                            })}
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          {tableSearchColumns
                            .filter((item) => item.isShow)
                            .map((item, idx) => {
                              if (item.name === "All/dtk/dgd") {
                                return (
                                  <td>
                                    <input
                                      style={{ width: "116px", heigth: "34px" }}
                                      type="submit"
                                      value="Find"
                                    />
                                  </td>
                                );
                              }

                              return (
                                <td key={idx}>
                                  <input style={{ width: "116px", heigth: "34px" }} />
                                </td>
                              );
                            })}
                        </tr>
                        <tr>
                          {tableSearchColumns
                            .filter((item) => item.isShow)
                            .map((item, idx) => {
                              if (item.name === "Thời gian") {
                                return <td>13:20</td>;
                              }

                              if (item.name === "Người gửi") {
                                return <td>Ola</td>;
                              }

                              if (item.name === "Người nhận") {
                                return <td>Elsa</td>;
                              }

                              if (item.name === "All/dtk/dgd") {
                                return <td></td>;
                              }

                              if (item.name === "Tình trạng") {
                                return <td style={{ fontSize: 13 }}>Đang chuyển</td>;
                              }

                              return (
                                <td key={idx} scope="col">
                                  23071WCQF
                                </td>
                              );
                            })}
                        </tr>
                      </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Trước
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Sau
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ProfilePageStyled>
    </MasterLayout>
  );
};
export default ProfilePage;
