import React, { Component } from "react";
import Link from "next/link";
import Router from 'next/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { toast } from 'react-toastify';
import { loginAPI } from "../../services/login-service";
import Cookies from "js-cookie";
import { PASSWORD_REGEX } from "../../utils/constant";



export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }


    ValidateEmail = (mail) => {
        // return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        return /^[a-zA-Z]{1}\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,100})+$/.test(
            mail
        )
    }

    ValidatePassword = (password) => {
        return PASSWORD_REGEX.test(password)
    }

    validateData = () => {

        if (this.state.email === '' && this.state.password === '') {
            toast.error('Please enter email address and password')
            return false
        }

        if (this.state.email === '') {
            toast.error('Please enter email address')
            return false
        }

        if (!this.ValidateEmail(this.state.email)) {
            toast.error("Please enter a valid email address")
            return false
        }

        if (!this.state.password) {
            toast.error('Please enter Password')
            return false
        }

        return true
    }

    logIn = () => {
        if (this.validateData()) {
            let data = {
                "email": this.state.email,
                "password": this.state.password
            }
            loginAPI.signup(data).then(response => {
                    toast.success("Signup Successfully");
                    Cookies.set("access_token_admin", response?.data?.token);
                    Router.push('/');
            }).catch(error => {
                toast.error('Invalid User ID & Password.', {
                    autoClose: 5000,
                })
            })
        }
    }


    render() {
        return (
            <div data-component='login'>
                <div className="admin-login">
                    <span>signup</span>
                </div>
                <div className="login-form">
                    <label>Email<span className="mandatory-star">*</span></label>
                    <input type="text" placeholder="Enter your email address"
                        value={this.state.email}
                        onChange={(e) => {
                            this.setState({ email: e.target.value })
                        }}
                    />
                </div>
                <div className="login-form">
                    <label>Password<span className="mandatory-star">*</span></label>
                    <input type="password" placeholder="Enter your password"
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value })
                        }}
                    />
                </div>
                <div className="custom-btn " onClick={() => this.logIn()}>
                    <span>Signup </span>
                    <ArrowForwardIosIcon className='arrow-icon' />
                </div>

                <div className="custom-btn mt-4" onClick={() => Router.push("/")}>
                    <span>Go to Login </span>
                    <ArrowForwardIosIcon className='arrow-icon' />
                </div>

            </div>
        )
    }
}
