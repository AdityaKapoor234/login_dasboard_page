import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
// import AdminApi from "../../services/admin";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";

export default class AdminDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props?.admin?.is_active ? props?.admin?.is_active : false,
            tab: 1,
            admin: props?.admin,
            mode: props?.mode,
            oldPassword: "",
            password: "",
            password2: "",
            timeout: "",
            id: props?.id,
            currentPage: 1,
            currentPageAddress: 1,
            open: false,
            address: [],
            orders: [],
            orderTotal: 1,
            addressTotal: 1,
            dialog: false,
            input: {
                password: "",
                is_active: props?.admin?.is_active ? props?.admin?.is_active : false,
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.admin !== nextProps.admin ||
            prevState.mode !== nextProps.mode ||
            prevState.id !== nextProps.id
        ) {
            return {
                admin: nextProps?.admin,
                mode: nextProps?.mode,
                id: nextProps?.id,
                active: nextProps?.admin?.is_active
                    ? nextProps?.admin?.is_active
                    : false,
                input: {
                    is_active: nextProps?.admin?.is_active
                        ? nextProps?.admin?.is_active
                        : false,
                },
            };
        }
        return null;
    }

    handleNameChange = (event) => {
        this.props?.name(event.target.value);
    };
    handlePhoneChange = (event) => {
        this.props?.phone(event.target.value);
    };
    handleMailChange = (event) => {
        this.props?.mail(event.target.value);
    };
    handleChange = (event) => {
        this.setState({ password: event.target.value });
        this.props?.pass(event.target.value);
        if (this.state.mode === "edit") {
            this.props?.passCheck();
            if (event.target.value === "") {
                this.props?.passCheckFalse();
            }
        }
    };
    handleChange2 = (event) => {
        this.setState({ password2: event.target.value });
        this.props?.pass2(event.target.value);
        if (this.state.mode === "edit") {
            this.props?.passCheck();
            if (event.target.value === "") {
                this.props?.passCheckFalse();
            }
        }
    };
    handleChange3 = (event) => {
        this.setState({ oldPassword: event.target.value });
        this.props?.oldPass(event.target.value);
        if (this.state.mode === "edit") {
            this.props?.passCheck();
            if (event.target.value === "") {
                this.props?.passCheckFalse();
            }
        }
    };
    handleClose = () => {
        this.setState({
            open: false,
        });
    };
    handleClickOpen = () => {
        this.setState({ dialog: true });
    };
    handleClickClose = () => {
        this.setState({ dialog: false });
    };
    validateDataPassword = () => {
        if (
            !this.state.password ||
            this.state.password === -1 ||
            this.state.password === "" ||
            this.state.password === null ||
            this.state.password === undefined ||
            this.state.password.replace(/\s/g, "").length <= 0 ||
            !this.state.password.match(/^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{10,}$/)
        ) {
            toast.error("Please enter valid password");
            return false;
        }
        if (!this.state.password2 ||
            this.state.password2 === -1 ||
            this.state.password2 === "" |
            this.state.password2 === null ||
            this.state.password2 === undefined ||
            this.state.password2.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the password again");
            return false;
        }
        if (this.state.password !== this.state.password2) {
            toast.error("Your password doesn't match");
            return false;
        }
        return true;
    };

    handleClickSubmitClose = () => {
        if (this.validateDataPassword()) {
            this.setState({ dialog: false });
            this.props.save(this.state.id);
            this.setState({ oldPassword: "" });
            this.setState({ password: "" });
            this.setState({ password2: "" });    
        }
    };

    handleCheckbox = () => {
        this.setState({ open: false });

        this.state.timeout = setTimeout(() => {
            if (this.state.active) {
                this.setState({
                    active: false,
                });
                this.props?.active(false);
            } else {
                this.setState({
                    active: true,
                });
                this.props?.active(true);
            }
        }, 200)

    };
    onPageChange = (e, page) => {
        this.setState({ currentPage: page });
        this.getOrder(this.state.id, page);
    };

    onPageChangeAddress = (e, page) => {
        this.setState({ currentPageAddress: page });
        this.getAddress(this.state.id, page);
    };

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
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };

    //   getAddresses = (id, page) => {
    //     AdminApi.AdminAddresses(id, page)
    //       .then((response) => {
    //         this.setState({ 
    //           address: response?.data?.data?.list,
    //           addressTotal: response?.data?.data?.pages,
    //          });
    //       })
    //       .catch((error) => {
    //         toast.error(
    //           error?.response &&
    //             error?.response?.data &&
    //             error?.response?.data?.message
    //             ? error.response.data.message
    //             : "Unable to process your request, please try after sometime"
    //         );
    //       });
    //   };

    getOrder = (id, page) => {
        AdminApi.AdminOrder(id, page)
            .then((response) => {
                this.setState({
                    orders: response?.data?.data?.list,
                    orderTotal: response?.data?.data?.pages,
                });
            })
            .catch((error) => {
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime"
                );
            });
    };

    //   componentDidMount() {
    //     this.getAddresses(this.state.id, 1);
    //     this.getOrder(this.state.id, 1);
    //   }

    render() {
        return (
            <div data-component="edit-customer">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tab">
                            <div
                                className={
                                    this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                                }
                                onClick={() => {
                                    this.setState({ tab: 1 });
                                }}
                            >
                                info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        {this.state.mode === "create" && (
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="login-form ">
                                        <label>Name<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            onChange={this.handleNameChange.bind(this)}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Phone No<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            onChange={this.handlePhoneChange.bind(this)}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Email<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            onChange={this.handleMailChange.bind(this)}
                                        />
                                    </div>
                                    {/* <span title="Password Requirements:&#13;
                                    I) At least 10 characters&#13;
                                    II) Contain all of the following types of characters:
                                    &nbsp;&nbsp;1) Lower case (a-z)
                                    &nbsp;&nbsp;2) Upper case (A-Z)
                                    &nbsp;&nbsp;3) Numbers (i.e. 0-9)
                                    &nbsp;&nbsp;4) Special Characters (e.g. !@#$%^&*)">
                                                <IconButton>
                                                    <InfoIcon className="iBut" />
                                                </IconButton>
                                            </span> */}
                                    <div className="login-form ">
                                        <label className="d-flex align-items-center">Password
                                            <Tooltip
                                                style={{ all: "unset" }}
                                                title={<span>Password Requirements:<br /><br />
                                                    I) At least 10 characters<br /><br />
                                                    II) Contain all of the following types of characters:<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) Lower case (a-z)<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) Upper case (A-Z)<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3) Numbers (i.e. 0-9)<br />
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4) Special Characters (e.g. !@#$%^&*)</span>}>
                                                <IconButton>
                                                    <InfoIcon className="iBut" />
                                                </IconButton>
                                            </Tooltip>
                                            <span className="mandatory-star">*</span></label>
                                        <input
                                            type="password"
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Confirm Password<span className="mandatory-star">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state?.password2}
                                            onChange={this.handleChange2.bind(this)}
                                        />
                                    </div>
                                    <div className="signup-check">
                                        <Checkbox
                                            size="small"
                                            style={{ color: "#012169" }}
                                            checked={this.state.active}
                                            onChange={() => {
                                                this.setState({ open: true });
                                            }}
                                        />
                                        <label>Active</label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.mode === "edit" && (
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="login-form ">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={this.state.admin?.name}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Phone No</label>
                                        <input
                                            type="text"
                                            value={this.state.admin?.phone_number}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            value={this.state.admin?.email}
                                            readOnly={true}
                                        />
                                    </div>


                                    <div className="login-form ">
                                        <button
                                            type="button"
                                            onClick={this.handleClickOpen}
                                        >
                                            Change Password
                                        </button>
                                        <Dialog
                                            open={this.state.dialog}
                                            onClose={this.handleClickClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                <div className="d-flex justify-content-between">
                                                    <span style={{ color: "#012169" }}>
                                                        {"Change Password"}
                                                    </span>
                                                    <Box position="absolute" right={0}>
                                                        <Button style={{ cursor: "pointer", color: "#012169" }} onClick={this.handleClickClose}>
                                                            {<CloseIcon />}
                                                        </Button>
                                                    </Box></div>
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText
                                                    id="alert-dialog-description"
                                                    sx={{ color: "#012169" }} >
                                                    <div className="login-form ">
                                                        <label>Old Password<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="password"
                                                            value={this.state?.oldPassword}
                                                            onChange={this.handleChange3.bind(this)}
                                                        />
                                                    </div>
                                                    <div className="login-form ">
                                                        <label>Password
                                                            <Tooltip
                                                                style={{ all: "unset" }}
                                                                title={<span>Password Requirements:<br /><br />
                                                                    I) At least 10 characters<br /><br />
                                                                    II) Contain all of the following types of characters:<br />
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) Lower case (a-z)<br />
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) Upper case (A-Z)<br />
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3) Numbers (i.e. 0-9)<br />
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4) Special Characters (e.g. !@#$%^&*)</span>}>
                                                                <IconButton>
                                                                    <InfoIcon className="iBut" />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="password"
                                                            value={this.state?.password}
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                    <div className="login-form ">
                                                        <label>Confirm Password<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="password"
                                                            value={this.state?.password2}
                                                            onChange={this.handleChange2.bind(this)}
                                                        />
                                                    </div>

                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <div className="login-form ">
                                                    <Button
                                                        style={{ background: "#f54a00", borderRadius: "0px", color: "#ffffff", border: "1.5px solid #f54a00" }}
                                                        color="secondary"
                                                        variant="contained"

                                                        onClick={this.handleClickSubmitClose}
                                                        autoFocus
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </DialogActions>
                                        </Dialog>
                                    </div>

                                    {/* <div className="login-form ">
                                        <label>Password<span className="mandatory-star">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state?.password}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Confirm Password<span className="mandatory-star">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state?.password2}
                                            onChange={this.handleChange2.bind(this)}
                                        />
                                    </div> */}
                                    <div className="signup-check">
                                        <Checkbox
                                            size="small"
                                            style={{ color: "#012169" }}
                                            checked={this.state.active}
                                            onChange={() => {
                                                this.setState({ open: true });
                                            }}
                                        />
                                        <label>Active</label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.mode === "view" && (
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="login-form ">
                                        <label>Name<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            readOnly={true}
                                            value={this.state.admin?.name}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Phone No<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            value={this.state.admin?.phone_number}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Email<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            readOnly={true}
                                            value={this.state.admin?.email}
                                        />
                                    </div>
                                    <div className="login-form ">
                                        <label>Password<span className="mandatory-star">*</span></label>
                                        <input
                                            type="password"
                                            readOnly={true}
                                            value={this.state.admin?.password}
                                        />
                                    </div>
                                    <div className="signup-check">
                                        <Checkbox
                                            size="small"
                                            disabled
                                            style={{ color: "#012169" }}
                                            checked={this.state.active}
                                        />
                                        <label>Active<span className="mandatory-star">*</span></label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ color: "#012169" }}>
                        Confirm the action
                    </DialogTitle>
                    <Box position="absolute" top={0} right={0}>
                        <IconButton onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogContent>
                        <Typography style={{ color: "#7e8f99" }}>
                            Are you sure you want to{" "}
                            {this.state.active
                                ? " deactivate this user"
                                : "activate this user"}
                            ?
                        </Typography>
                    </DialogContent>
                    <DialogActions style={{ marginBottom: "0.5rem" }}>
                        <Button
                            onClick={this.handleClose}
                            style={{
                                color: "#012169",
                                background: "white",
                                borderRadius: "0px",
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCheckbox}
                            style={{ background: "#f54a00", borderRadius: "0px" }}
                            color="secondary"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

