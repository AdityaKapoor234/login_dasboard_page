import React from "react";
import { useEffect, useState } from "react";
import Router from "next/router"
import { useRouter } from "next/router";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StoreIcon from '@mui/icons-material/Store';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import { toast } from 'react-toastify';
import Link from 'next/link'

export default function DashboardLayoutComponent({ children }) {

    const pathArr = useRouter().pathname.split("/")[1]

    const [tab, setTab] = useState(pathArr);
    const [tabCompany, setTabCompany] = useState(pathArr === "company1" || pathArr === "company2" ? true : false);
    const [tabProject, setTabProject] = useState(pathArr === "create-project" || pathArr === "manage-project" ? true : false);
    const [tabReporting, setTabReporting] = useState(pathArr === "reporting1" || pathArr === "reporting2" ? true : false);
    const [tabAdministration, setTabAdministration] = useState(pathArr === "administration1" || pathArr === "administration2" ? true : false);
    const [categary, setCategary] = useState(pathArr);

    const handleCategary = (url, value) => {
        Router.push("/")
        setCategary(value)
        setTab('')
    }
    const handleDashboard = () => {
        Router.push("/")
        setTab("dashboard")
        setCategary("")
    }

    return (
        <div>
            <main className="dashboard-background">
                <div className='container-fluid '>
                    <div className='main-module'>
                        <div className='module-menu'>
                            <div className='menu'>
                                <div className={tab === "dashboard" ? 'menu-btn active' : 'menu-btn'} onClick={() => handleDashboard()}>
                                    <span>
                                        {tab === "dashboard" ? <DashboardIcon className='outline-icon' /> : <DashboardOutlinedIcon className='outline-icon' />}
                                        dashboard
                                    </span>
                                </div>
                                <div className={tabCompany ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabCompany(!tabCompany)}>
                                    <span>
                                        {tabCompany ? <LocalGroceryStoreIcon className='outline-icon' /> : <LocalGroceryStoreOutlinedIcon className='outline-icon' />}
                                        company
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabCompany &&
                                    <ul>
                                        <li className={categary === "company1" ? "sub_active" : ""} onClick={() => handleCategary("/", "company1")}>Company Tab 1</li>
                                        <li className={categary === "company2" ? "sub_active" : ""} onClick={() => handleCategary("/", "company2")}>Company Tab 2</li>
                                    </ul>
                                }
                                <div className={tabProject ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabProject(!tabProject)}>
                                    <span>
                                        {tabProject ? <CategoryIcon className='outline-icon' /> : <CategoryOutlinedIcon className='outline-icon' />}
                                        project
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabProject &&
                                    <ul>
                                        <li className={categary === "create-project" ? "sub_active" : ""} onClick={() => handleCategary("/", "company1")}>Create Project</li>
                                        <li className={categary === "manage-project" ? "sub_active" : ""} onClick={() => handleCategary("/", "company2")}>Manage Project</li>
                                    </ul>
                                }
                                <div className={tabReporting ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabReporting(!tabReporting)}>
                                    <span>
                                        {tabReporting ? <GroupsIcon className='outline-icon' /> : <GroupsOutlinedIcon className='outline-icon' />}
                                        reporting
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabReporting &&
                                    <ul>
                                        <li className={categary === "reporting1" ? "sub_active" : ""} onClick={() => handleCategary("/", "reporting1")}>Reporting Tab 1</li>
                                        <li className={categary === "reporting2" ? "sub_active" : ""} onClick={() => handleCategary("/", "reporting2")}>Reporting Tab 2</li>
                                    </ul>
                                }
                                <div className={tabAdministration ? 'menu-btn active' : 'menu-btn'} onClick={() => setTabAdministration(!tabAdministration)}>
                                    <span>
                                        {tabAdministration ? <StoreIcon className='outline-icon' /> : <StoreMallDirectoryOutlinedIcon className='outline-icon' />}
                                        administration
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon' />
                                </div>
                                {tabAdministration &&
                                    <ul>
                                        <li className={categary === "administration1" ? "sub_active" : ""} onClick={() => handleCategary("/", "administration1")}>Administration Tab 1</li>
                                        <li className={categary === "administration2" ? "sub_active" : ""} onClick={() => handleCategary("/", "administration2")}>Administration Tab 2</li>
                                    </ul>
                                }

                            </div>

                        </div>
                        <div className='main-componemt' style={{backgroundColor: "#ededed"}}>
                            {children}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

