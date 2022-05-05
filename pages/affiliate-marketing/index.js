import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CustomerApi from "../../services/customer";
import ExcelApi from "../../services/excel-export";
import { useRouter } from "next/router";
import  AffiliatedMarketing from "../../component/enquiry/affiliated-marketing/affiliated-marketing.component"
import InquiryApi from "../../services/inquiry";

export default function Affiliate_Marketing() {
    const [affiliateMarketing, setAffiliateMarketing] = useState([]);
    const [Page, setPage] = useState(1);

    const getAffiliateMarketingList = (page,search) => {
		// setIsLoader(true);
		InquiryApi.getAffiliateMarketingList(page,search)
			.then((response) => {
                 console.log(response)
                 setAffiliateMarketing(response.data.data.list);
				// setTotalCustomer(response.data.data);
				// setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
				// setIsLoader(false);
			})
			.catch((error) => {
				// setIsLoader(false);
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime"
				);
			});
	};
    useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
		getAffiliateMarketingList(Page, "");
	}, []);

    return (
        <div>
            <div page-component="category-page">
                <Head>
                    <title>{APP_NAME} - Affiliate Marketing</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-6">
                                <div className="hamburger">
                                    <span>Inquiry / </span>Affiliate-Marketing
                                </div>
                                <div className="page-name">Affiliate-Marketing</div>
                            </div>
                            <div className="col-md-4">
                                <div className="login-form ">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="search-box"
                                        // value={wordEntered}
                                        // onChange={handleFilter}
                                        // onKeyPress={handleKeyPress}
                                    />
                                    <SearchIcon className="search-icon point-but"  />
                                </div>
                            </div>
                            <div className="col-md-2 btn-save">
                                <div className="custom-btn ">
                                    <span
                                       
                                        className="d-flex"
                                    >
                                        Download&nbsp;<FileDownloadIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row sticky-scroll scroll">
                            <div className="col-md-12 ">
                                {/* {
                                //     isLoader ? (
                                //         <div className="row justify-content-center">
                                //             <div className="col-md-12 loader-cart">
                                //                 <Box sx={{ display: "flex" }}>
                                //                     <CircularProgress
                                //                         style={{ color: "#F54A00" }}
                                //                     />
                                //                 </Box>
                                //             </div>
                                //         </div>
                                //     ) : (
                                //         // customer && customer.length === 0 ? <div className="not-found">No Data Found</div> :
                                //         <CustomerList customer={customer} />
                                //     )
                                }
                                <CustomerList customer={customer} /> */}
                          { affiliateMarketing.length>0 && <AffiliatedMarketing list={affiliateMarketing} />} 
                            </div>
                        </div>
                        {/* <div className="row">
            <div className="col-md-12">
              <div className="pagiantion-category">
                <Pagination
                  className="pagination"
                  page={currentPage}
                  count={totalPage}
                  onChange={onPageChange}
                />
              </div>
            </div>
          </div> */}
                        <div className="row">
                            <div className="col-md-12 justify-content-between d-flex position-relative">
                                <div className="pagiantion-category">
                                    <div>
                                        <Pagination
                                            className="pagination pagi"
                                            page={1}
                                            count={65}
                                            // onChange={onPageChange}
                                        />
                                    </div>
                                    {/* <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                                        Total Customers: {totalCustomer.total}
                                    </div> */}
                                </div>
                            </div>
                        </div>

                    </DashboardLayoutComponent>
                </main>
            </div>
        </div>
    );
}
