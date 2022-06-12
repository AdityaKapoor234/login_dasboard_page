import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialCategoryCreateComponent from "../../../component/testimonial-category/testimonial-category-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TestimonialCategoryApi from "../../../services/testimonial-category";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class TestimonialCategoryEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      testimonialCategory: {},
      open: false,
      testimonialCategoryDetails: {
        name: "",
        is_active: false,
      },
    };
  }
  validateData = () => {


    if (this.state.testimonialCategoryDetails.name === "" || this.state.testimonialCategoryDetails.name === null || this.state.testimonialCategoryDetails.name === undefined) {
      toast.error("Please enter name");
      return false;
    }

    if (this.state.testimonialCategoryDetails.name !== undefined) {
      if (this.state.testimonialCategoryDetails.name.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter name");
        return false;
      }
    }


    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.testimonialCategoryDetails.name,
        is_active: this.state.testimonialCategoryDetails.is_active,
      };
      TestimonialCategoryApi.testimonialCategoryListEDIT(this.state.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ testimonialCategory: response.data.data.updated });
            toast.success(response.data.message);
            Router.push(`/testimonial-category`);
          }
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
    }
  };
  stateHandle = (value) => {
    this.setState({ testimonialCategoryDetails: value });
  };
  gettestimonialCategoryDetails = (id) => {
    TestimonialCategoryApi.testimonialCategoryViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.view.name ? response.data.data.view.name : "",
            is_active: response.data.data.view.is_active ? response.data.data.view.is_active : false,
          };
          this.setState({
            testimonialCategoryDetails: details,
            testimonialCategory: response.data.data.view,
          });
        }
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
  Delete = (id) => {
    let data = {};
    TestimonialCategoryApi.testimonialCategoryDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          Router.push("/testimonial-category");
          toast.success(response.data.message);
        }
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
  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.gettestimonialCategoryDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Category</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Testimonial / Category / </span>Edit Category
                </div>
                <div className="page-name">
                  Edit Category Details - {this.state.testimonialCategory?.name}
                </div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="custom-btn "
                  onClick={() => {
                    this.OnSave();
                  }}
                >
                  <span>Save </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/testimonial-category`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <TestimonialCategoryCreateComponent
                  testimonialCategory={this.state.testimonialCategory}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            maxWidth="sm"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#012169" }}>
              Confirm the action
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={() => this.setState({ open: false })}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography style={{ color: "#7e8f99" }}>
                Are you sure you want to delete this category?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  borderRadius: "0px",
                  background: "white",
                }}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.Delete(this.state.id)}
                style={{ background: "#f54a00", borderRadius: "0px" }}
                color="secondary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}
