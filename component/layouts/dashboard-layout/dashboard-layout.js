import Head from 'next/head'
import React from "react";
import { useEffect, useState } from "react";
import Router from "next/router"
import { useRouter } from "next/router";
import { APP_NAME, APP_TAGLINE, APP_IMAGE } from "../../../utils/constant";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Cookies from "js-cookie";
import { loginAPI } from "../../../services/login-service";
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function DashboardLayoutComponent({ children }) {

    const pathArr = useRouter().pathname.split("/")[1]

    const [tab, setTab] = useState(pathArr);
    const [tabSale, setTabSale] = useState(pathArr === "order" ? true : false);
    const [tabCatalog, setTabCatalog] = useState(pathArr === "category" || pathArr === "ingredient" || pathArr === "classification" || pathArr === "brand" || pathArr === "product" || pathArr === "flavor" ? true : false);
    const [tabCustomer, setTabCustomer] = useState(pathArr === "customer" || pathArr === "customer-type" ? true : false);
    const [tabAdmin, setTabAdmin] = useState(pathArr === "admin" || pathArr === "admin" ? true : false);
    const [tabAskthePros, setAskthePros] = useState(pathArr === "ask-the-pros" || pathArr === "query" ? true : false);
    const [tabInquiry, setTabInquiry] = useState(pathArr === "inquiry" || pathArr === "feedback" || pathArr === "advertise-with-us" || pathArr === "affiliate-marketing" || pathArr === "marketing-and-sponsorships" || pathArr === "sell-on-fitcart" || pathArr === "bulk-buys" ? true : false);
    const [categary, setCategary] = useState(pathArr);
    const [logout, setLogout] = useState(false);
    const [email, setEmail] = useState("admin@fitcart.com");

    const handleCategary = (url, value) => {
        Router.push(url)
        setCategary(value)
        setTab('')
    }
    const handleDashboard = () => {
        Router.push("/dashboard")
        setTab("dashboard")
        setCategary("")
    }
    const handleLogout = () => {
        Cookies.remove("access_token_admin")
        Router.push("/")
    }

    const getEmail = () => {
        loginAPI.adminLogin().then(response => {
            if (response?.data?.httpStatusCode === 200) {
                let data = response.data?.data?.user
                setEmail(data?.email)
            }
        }).catch(error => {
        })
    }

    useEffect(() => {
        getEmail()
    }, []);

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content={APP_TAGLINE}
                />
                <meta
                    property="og:image"
                    content={APP_IMAGE}
                />
                <meta name="og:title" content={APP_NAME} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <main className="dashboard-background">
                <div className='container-fluid '>
                    <div className='header'>
                        <img src="/images/fitcart-logo.png" className="img-fluid" alt="logo" />
                        {logout &&
                            <ul>
                                <li onClick={() => handleLogout()}><LogoutIcon className='logout-icon' />Logout</li>
                            </ul>
                        }
                        <div className='login'>{email} <ArrowDropDownIcon className={logout ? 'drop-icon icon-drop' : 'drop-icon'} onClick={() => { setLogout(!logout) }} /></div>
                    </div>
                    <div className='main-module'>
                        <div className='module-menu'>
                            <div className='menu'>
                                <div className={tab === "dashboard" ? 'menu-btn active' : 'menu-btn'} onClick={() => handleDashboard()}>
                                    <span>
                                        {tab === "dashboard" ? <DashboardIcon className='outline-icon' /> : <DashboardOutlinedIcon className='outline-icon' />}
                                        dashboard
                                    </span>
                                </div>
                                <div className={tabSale ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabSale(!tabSale)}>
                                    <span>
                                        {tabSale ? <LocalGroceryStoreIcon className='outline-icon' /> : <LocalGroceryStoreOutlinedIcon className='outline-icon' />}
                                        sales
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabSale &&
                                    <ul>
                                        <li className={categary === "order" ? "sub_active" : ""} onClick={() => handleCategary("/order", "order")}>order</li>
                                    </ul>
                                }
                                <div className={tabCatalog ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabCatalog(!tabCatalog)}>
                                    <span>
                                        {tabCatalog ? <CategoryIcon className='outline-icon' /> : <CategoryOutlinedIcon className='outline-icon' />}
                                        catalog
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabCatalog &&
                                    <ul>
                                        <li className={categary === "category" ? "sub_active" : ""} onClick={() => handleCategary("/category", "category")}>category</li>
                                        <li className={categary === "ingredient" ? "sub_active" : ""} onClick={() => handleCategary("/ingredient", "ingredient")}>ingredient</li>
                                        <li className={categary === "classification" ? "sub_active" : ""} onClick={() => handleCategary("/classification", "classification")}>classification</li>
                                        <li className={categary === "brand" ? "sub_active" : ""} onClick={() => handleCategary("/brand", "brand")}>brand</li>
                                        <li className={categary === "product" ? "sub_active" : ""} onClick={() => handleCategary("/product", "product")}>product</li>
                                        {/* <li className={categary=== "inventory" ? "sub_active":""} onClick={()=> handleCategary("#","inventory")}>inventory</li> */}
                                        <li className={categary === "flavor" ? "sub_active" : ""} onClick={() => handleCategary("/flavor", "flavor")}>flavor</li>
                                    </ul>
                                }
                                <div className={tabAskthePros ? 'menu-btn active' : 'menu-btn'} onClick={() => setAskthePros(!tabAskthePros)}>
                                    <span>
                                        {tabAskthePros ? <GroupsIcon className='outline-icon' /> : <GroupsOutlinedIcon className='outline-icon' />}
                                        ask the pros
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabAskthePros &&
                                    <ul>
                                        <li className={categary === "ask-the-pros" ? "sub_active" : ""} onClick={() => handleCategary("/ask-the-pros", "ask-the-pros")}>ask the pros</li>
                                        <li className={categary === "query" ? "sub_active" : ""} onClick={() => handleCategary("/query", "query")}>query</li>
                                    </ul>
                                }
                                <div className={tabCustomer ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabCustomer(!tabCustomer)}>
                                    <span>
                                        {tabCustomer ? <GroupIcon className='outline-icon' /> : <GroupOutlinedIcon className='outline-icon' />}
                                        customer
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabCustomer &&
                                    <ul>
                                        <li className={categary === "customer" ? "sub_active" : ""} onClick={() => handleCategary("/customer", "customer")}>customer</li>
                                        {/* <li className={categary=== "customer-type" ? "sub_active":""} onClick={()=> handleCategary("#","customer-type")}>customer type</li> */}
                                    </ul>
                                }
                                <div className={tabAdmin ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabAdmin(!tabAdmin)}>
                                    <span>
                                        {tabAdmin ? <AdminPanelSettingsOutlinedIcon className='outline-icon' /> : <AdminPanelSettingsOutlinedIcon className='outline-icon' />}
                                        user
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabAdmin &&
                                    <ul>
                                        <li className={categary === "admin" ? "sub_active" : ""} onClick={() => handleCategary("/admin", "admin")}>user</li>
                                    </ul>
                                }
                                <div className={tabInquiry ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabInquiry(!tabInquiry)}>
                                    <span>
                                        {tabInquiry ? <GroupIcon className='outline-icon' /> : <GroupOutlinedIcon className='outline-icon' />}
                                        Inquiry
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabInquiry &&
                                    <ul>
                                        <li className={categary === "feedback" ? "sub_active" : ""} onClick={() => handleCategary("/feedback", "feedback")}>Feedback</li>
                                        <li className={categary === "advertise-with-us" ? "sub_active" : ""} onClick={() => handleCategary("/advertise-with-us", "advertise-with-us")}>Advertise with Us</li>
                                        <li className={categary === "affiliate-marketing" ? "sub_active" : ""} onClick={() => handleCategary("/affiliate-marketing", "affiliate-marketing")}>Affiliate Marketing</li>
                                        <li className={categary === "marketing-and-sponsorships" ? "sub_active" : ""} onClick={() => handleCategary("/marketing-and-sponsorships", "marketing-and-sponsorships")}>Marketing & Sponsorships</li>
                                        <li className={categary === "sell-on-fitcart" ? "sub_active" : ""} onClick={() => handleCategary("/sell-on-fitcart", "sell-on-fitcart")}>Sell on Fitcart</li>
                                        <li className={categary === "bulk-buys" ? "sub_active" : ""} onClick={() => handleCategary("/bulk-buys", "bulk-buys")}>Bulk Buys</li>
                                    </ul>
                                    
                                }

                            </div>


                        </div>
                        <div className='main-componemt'>
                            {children}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
