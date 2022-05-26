import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class EmailSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props?.list,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.list !== nextProps.list
    ) {
      return {
        list: nextProps?.list
      };
    }
    return null;
  }

  convertDateStringToDate = (dateStr) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date(dateStr);
    let str =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    return str;
  };

  componentDidMount(){
  }

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col-2 pe-1 ">Name</div>
              {/* <div className="col text-center">Type</div> */}
              <div className="col-4  text-center ">Email</div>
              <div className="col-2  text-center ">Category</div>
              <div className="col-2  text-center ">Description</div>
              <div className="col-2 text-center ">View</div>
            </div>
          </div>
        </div>
        {
		this.state.list && this.state.list.length === 0 ? <div className="not-found">No Data Found</div> :
          this.state.list?.map((p, index) => {
          return (

            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="tableCell">
                  <div className="tableBody  col-2 pe-1 elip-text" title={p?.name}>{p?.name}</div>
                  {/* <div className="col text-center">{p?.type?p?.type:"General"}</div> */}
                  <div className="tableBody  col-4 justify-content-center elip-text" title={p?.email}>
                    {p?.email}
                  </div>
                  <div className="col-2  text-center elip-text" title={p?.category}>{p?.category}</div>
                  <div className="col-2  text-center elip-text" title={p?.customer_query}>{p?.customer_query}</div>
                  <div className="col-2 text-center">
                    <RemoveRedEyeIcon
                      className="view-icon"
                      onClick={() => {
                        Router.push(`/email-support/${p?.id}/view`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
