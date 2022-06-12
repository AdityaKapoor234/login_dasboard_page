import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialCategoryList from "../../component/testimonial-category/testimonial-category-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TestimonialCategoryApi from "../../services/testimonial-category";
import { useRouter } from "next/router";

export default function TestimonialCategory() {
  const pathArr = useRouter();
  const [testimonialCategory, setTestimonialCategory] = useState([]);
  const [totalTestimonialCategory, setTotalTestimonialCategory] = useState([]);
  const [wordEntered, setWordEntered] = useState(
    pathArr.query?.q ? pathArr.query?.q : ""
  );
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoader, setIsLoader] = useState(true);

  const handleKeyPress = (event) => {
    let router_query_object = {};
    if (wordEntered !== "") {
      router_query_object["q"] = wordEntered;
    }
    if (event.key === "Enter") {
      Router.push({
        pathname: "/testimonial-category",
        query: router_query_object,
      });
      setCurrentPage(1)
      testimonialCategoryList(1, wordEntered);
    }
  };

  const handleClickPress = (event) => {
    let router_query_object = {};
    if (wordEntered !== "") {
      router_query_object["q"] = wordEntered;
    }
    Router.push({
      pathname: "/testimonial-category",
      query: router_query_object,
    });
    setCurrentPage(1)
    testimonialCategoryList(1, wordEntered);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (event.target.value === "") {
      Router.push({
        pathname: "/testimonial-category",
        query: "",
      });
      testimonialCategoryList(1, "");
    }
  };

  let onPageChange = function (e, page) {
    setCurrentPage(page)
    testimonialCategoryList(page, wordEntered)
  };

  const testimonialCategoryList = (page, search) => {
    setIsLoader(true);
    TestimonialCategoryApi.testimonialCategoryList(page, search)
      .then((response) => {
        setTestimonialCategory(response.data.data.list);
        setTotalTestimonialCategory(response.data.data);
        setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);
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
    testimonialCategoryList(currentPage, "");
  }, []);
  return (
    <div page-component="category-page">
      <Head>
        <title>{APP_NAME} - Category</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-6">
              <div className="hamburger">
                <span>Testimonial / </span>Category
              </div>
              <div className="page-name">Category</div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-box"
                  value={wordEntered}
                  onChange={handleFilter}
                  onKeyPress={handleKeyPress}
                />
                <SearchIcon className="search-icon point-but" onClick={handleClickPress} />
              </div>
            </div>
            <div className="col-md-2 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  Router.push(`/testimonial-category/create`);
                }}
              >
                <span>Add New </span>
              </div>
            </div>
          </div>
          <div className="row sticky-scroll scroll">
            <div className="col-md-12 ">
              {
                isLoader ? (
                  <div className="row justify-content-center">
                    <div className="col-md-12 loader-cart">
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress
                          style={{ color: "#F54A00" }}
                        />
                      </Box>
                    </div>
                  </div>
                ) : (
                  // testimonialCategory && testimonialCategory.length === 0 ? <div className="not-found">No Data Found</div> :
                    <TestimonialCategoryList testimonialCategory={testimonialCategory} />
                )
              }



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
                    page={currentPage}
                    count={totalPage}
                    onChange={onPageChange}
                  />
                </div>
                <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                  Total Category: {totalTestimonialCategory.total}
                </div>
              </div>
            </div>
          </div>

        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
