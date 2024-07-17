import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export default function Dashboard() {

  const [newProject, setNewProject] = useState({
    project_name: "",
    work_order_no: "",
    project_type: "select",
    category: "select",
    client: "select",
    client_contact: "select",
    sales_person: "select",
    project_manager: "select",
    project_description: "",
    device: [
      {
        id: 1,
        name: "Mobile",
        selected: false,
      },
      {
        id: 2,
        name: "Tablet",
        selected: false,
      },
      {
        id: 3,
        name: "Desktop",
        selected: false,
      },
    ],
    filter_option: [
      {
        id: 1,
        name: "Gatesurvey",
        selected: false,
      },
      {
        id: 2,
        name: "Fraud_detection",
        selected: false,
      },
    ],
    regions: [],
  });
  const [specifications, setSpecifications] = useState([
    {
      id: 1,
      checked: false,
      country: "Brazil",
      language: "Portuguese",
      target_group: "",
      cpi: "",
      loi: "",
      ir: "",
      completes: "",
    },
  ]);
  const [projectType, setProjectType] = useState([
    {
      id: 1,
      name: "Project Type 1",
    },
    {
      id: 2,
      name: "Project Type 2",
    },
    {
      id: 3,
      name: "Project Type 3",
    },
  ]);
  const [category, setCategory] = useState([
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    },
    {
      id: 3,
      name: "Category 3",
    },
  ]);
  const [client, setClient] = useState([
    {
      id: 1,
      name: "Client 1",
    },
    {
      id: 2,
      name: "Client 2",
    },
    {
      id: 3,
      name: "Client 3",
    },
  ]);
  const [clientContact, setClientContact] = useState([
    {
      id: 1,
      name: "Client Contact 1",
    },
    {
      id: 2,
      name: "Client Contact 2",
    },
    {
      id: 3,
      name: "Client Contact 3",
    },
  ]);
  const [salesPerson, setSalesPerson] = useState([
    {
      id: 1,
      name: "Sales Person 1",
    },
    {
      id: 2,
      name: "Sales Person 2",
    },
    {
      id: 3,
      name: "Sales Person 3",
    },
  ]);
  const [projectManager, setProjectManager] = useState([
    {
      id: 1,
      name: "Project Manager 1",
    },
    {
      id: 2,
      name: "Project Manager 2",
    },
    {
      id: 3,
      name: "Project Manager 3",
    },
  ]);
  const country = [
    { title: 'Afghanistan' },
    { title: 'Albania' },
    { title: 'Algeria' },
    { title: 'Andorra' },
    { title: 'Angola' },
    { title: 'Antigua and Barbuda' },
    { title: 'Argentina' },
    { title: 'Armenia' },
    { title: 'Australia' },
    { title: 'Austria' },
    { title: 'Azerbaijan' },
    { title: 'The Bahamas' },
    { title: 'Bahrain' },
    { title: 'Bangladesh' },
    { title: 'Barbados' },
    { title: 'Belarus' },
    { title: 'Belgium' },
    { title: 'Belize' },
    { title: 'Benin' },
    { title: 'Bhutan' },
    { title: 'Bolivia' },
    { title: 'Bosnia and Herzegovina' },
    { title: 'Botswana' },
    { title: 'Brazil' },
    { title: 'Brunei' },
    { title: 'Bulgaria' },
    { title: 'Burkina Faso' },
    { title: 'Burundi' },
    { title: 'India' },
  ];
  const handleChange = (event) => {
    setNewProject((prevProject) => ({
      ...prevProject,
      [event.target.name]: event.target.value
    }));
  };

  const handleCheck = (event) => {
    const { name, checked } = event.target;
    const deviceId = parseInt(name);

    setNewProject((prevProject) => ({
      ...prevProject,
      device: prevProject.device.map((elem) =>
        elem.id === deviceId ? { ...elem, selected: checked } : elem
      )
    }));
  };

  const handleFilter = (event) => {
    const { name, checked } = event.target;
    const filterId = parseInt(name);

    setNewProject((prevProject) => ({
      ...prevProject,
      filter_option: prevProject.filter_option.map((elem) =>
        elem.id === filterId ? { ...elem, selected: checked } : elem
      )
    }));
  };

  const handleRegion = (value) => {
    let list = [];

    value.map((elem) => {
      let obj = {
        id: newProject.regions.length === 0 ? 1 : newProject.regions[newProject.regions.length - 1].id + 1,
        name: elem?.title,
      };
      list.push(obj);
    })

    setNewProject((prevProject) => ({
      ...prevProject,
      regions: [...list]
    }));
  };

  const handleChangeSpecification = (id, event) => {
    setSpecifications(prevSpecifications => prevSpecifications.map(elem =>
      elem.id === id ? { ...elem, [event.target.name]: event.target.name === "checked" ? event.target.checked : event.target.value } : elem
    ));
  };

  const addSpecifications = () => {
    let obj = {
      id: specifications.length === 0 ? 1 : specifications[specifications.length - 1].id + 1,
      checked: false,
      country: "Brazil",
      language: "Portuguese",
      target_group: "",
      cpi: "",
      loi: "",
      ir: "",
      completes: "",
    };

    setSpecifications((prevSpecifications) => [
      ...prevSpecifications,
      obj
    ]);
  };

  const removeSpecifications = (id) => {
    let list = specifications.filter((elem) => elem.id !== id);
    setSpecifications([...list]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Project Submitted:');
    console.log('Project Data:', newProject);
    console.log('Specifications:', specifications);
  };

  return (
    <div>
      <main>
        <DashboardLayoutComponent>
          <div page-component="project-info-form">
            <div className="mb-3">
              <div className="backButton d-flex justify-content-center align-items-center">
                <ArrowBackIcon fontSize="small" />
                Back
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row mb-4">
                  <div className="col-8">
                    <div className="formBox">
                      <div className="formBoxHead">
                        Project Information
                      </div>
                      <div className="formBoxBody">
                        <div className="row mb-2">
                          <div className="col">
                            <div className="pb-2">
                              project name<span className="madatory-star">*</span>
                            </div>
                            <input
                              type="text"
                              name="project_name"
                              maxLength="200"
                              className="w-100"
                              placeholder="Project Name"
                              value={newProject.project_name}
                              onChange={handleChange.bind(this)}
                            />
                          </div>
                          <div className="col">
                            <div className="pb-2">
                              work order no.#
                            </div>
                            <input
                              type="text"
                              name="work_order_no"
                              maxLength="200"
                              className="w-100"
                              placeholder="World Order Number"
                              value={newProject.work_order_no}
                              onChange={handleChange.bind(this)}
                            />
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col sort">
                            <div className="pb-2">
                              project type<span className="madatory-star">*</span>
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="project_type"
                                className="sort-by-select"
                                value={newProject.project_type}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Please Select{" "}
                                </MenuItem>
                                {
                                  projectType?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                          <div className="col sort">
                            <div className="pb-2">
                              category
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="category"
                                className="sort-by-select"
                                value={newProject.category}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Please Select{" "}
                                </MenuItem>
                                {
                                  category?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                          <div className="col sort">
                            <div className="pb-2">
                              client
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="client"
                                className="sort-by-select"
                                value={newProject.client}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Select a Person{" "}
                                </MenuItem>
                                {
                                  client?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col sort">
                            <div className="pb-2">
                              client's contact
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="client_contact"
                                className="sort-by-select"
                                value={newProject.client_contact}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Please Select{" "}
                                </MenuItem>
                                {
                                  clientContact?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                          <div className="col sort">
                            <div className="pb-2">
                              sales person
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="sales_person"
                                className="sort-by-select"
                                value={newProject.sales_person}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Please Select{" "}
                                </MenuItem>
                                {
                                  salesPerson?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                          <div className="col sort">
                            <div className="pb-2">
                              project manager
                            </div>
                            <div className="sort-by-select-wrapper">
                              <Select
                                disableUnderline
                                variant="standard"
                                autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                name="project_manager"
                                className="sort-by-select"
                                value={newProject.project_manager}
                                onChange={handleChange.bind(this)}
                              >
                                <MenuItem
                                  value="select"
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Select a Manager{" "}
                                </MenuItem>
                                {
                                  projectManager?.map(elem => {
                                    return (
                                      <MenuItem value={elem?.id}>{elem?.name}</MenuItem>
                                    )
                                  })
                                }
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="pb-2">
                            project description<span className="madatory-star">*</span>
                          </div>
                          <textarea
                            cols="100"
                            rows="5"
                            type="text"
                            name="project_description"
                            maxLength="250"
                            className="w-100"
                            placeholder="Project Description"
                            value={newProject.project_description}
                            onChange={handleChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="formBox mb-4">
                      <div className="formBoxHead">
                        Devices
                      </div>
                      <div className="formBoxBody">
                        <div className="check">
                          {
                            newProject.device.map((elem) => {
                              return (
                                <div className="d-flex align-items-center justify-content-start">
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          size="small"
                                          style={{ color: "#012169" }}
                                          checked={elem.selected}
                                          name={elem.id}
                                          onChange={handleCheck.bind(this)}
                                        />
                                      }
                                      label={elem.name}
                                    />
                                  </FormGroup>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="formBox">
                      <div className="formBoxHead">
                        Filter Options
                      </div>
                      <div className="formBoxBody">
                        <div className="check">
                          {
                            newProject.filter_option.map((elem) => {
                              return (
                                <div className="d-flex align-items-center justify-content-start">
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          size="small"
                                          style={{ color: "#012169" }}
                                          checked={elem.selected}
                                          name={elem.id}
                                          onChange={handleFilter.bind(this)}
                                        />
                                      }
                                      label={elem.name}
                                    />
                                  </FormGroup>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="formBox mb-4">
                  <div className="formBoxHead">
                    Regions
                  </div>
                  <div className="formBoxBody">
                    <div className="pb-2">
                      country
                    </div>
                    <div className="d-flex flex-wrap justify-content-start align-items-center">
                      <Autocomplete
                        multiple
                        id="size-small-standard-multi"
                        size="small"
                        className="w-100"
                        options={country}
                        sx={{
                          backgroundColor: "#ffffff"
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                          />
                        )}
                        onChange={(event, newValue) => {
                          handleRegion(newValue)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="formBox mb-4">
                  <div className="formBoxHead">
                    Specifications<span className="madatory-star">*</span>
                  </div>
                  <div className="formBoxBody">
                    <div className="specificationTable">
                      <div className="specificationTableHead">
                        <div className="row">
                          <div className="col-1">
                            Sel.
                          </div>
                          <div className="col">
                            Country
                          </div>
                          <div className="col">
                            Language
                          </div>
                          <div className="col">
                            Target Group
                          </div>
                          <div className="col-1">

                          </div>
                          <div className="col">
                            CPI(S)
                          </div>
                          <div className="col">
                            LOI(MIN.)
                          </div>
                          <div className="col">
                            IR(%)
                          </div>
                          <div className="col">
                            Completes
                          </div>
                        </div>
                      </div>
                      <div className="specificationTableBody">

                        {
                          specifications.length > 0 &&
                          specifications.map((elem) => {
                            return (
                              <div className="row d-flex align-items-center">
                                <div className="col-1">
                                  <Checkbox
                                    size="small"
                                    style={{ color: "#012169" }}
                                    checked={elem.checked}
                                    name="checked"
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                                <div className="col">
                                  {elem.country}
                                </div>
                                <div className="col">
                                  {elem.language}
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    name="target_group"
                                    maxLength="200"
                                    className="w-100"
                                    value={elem.target_group}
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                                <div className="col-1 d-flex align-items-center justify-content-ceter">
                                  <div
                                    className="d-flex align-items-center justify-content-ceter"
                                    onClick={addSpecifications}
                                  >
                                    <AddCircleRoundedIcon
                                      fontSize="small"
                                      className="me-2"
                                      sx={{
                                        color: "green",
                                        cursor: "pointer"
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="d-flex align-items-center justify-content-ceter"
                                    onClick={() => removeSpecifications(elem.id)}
                                  >
                                    <CancelRoundedIcon
                                      fontSize="small"
                                      sx={{
                                        color: "red",
                                        cursor: "pointer"
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    name="cpi"
                                    maxLength="200"
                                    className="w-100"
                                    value={elem.cpi}
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    name="loi"
                                    maxLength="200"
                                    className="w-100"
                                    value={elem.loi}
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    name="ir"
                                    maxLength="200"
                                    className="w-100"
                                    value={elem.ir}
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    name="completes"
                                    maxLength="200"
                                    className="w-100"
                                    value={elem.completes}
                                    onChange={handleChangeSpecification.bind(this, elem.id)}
                                  />
                                </div>
                              </div>
                            )
                          })
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <div className="buttonRow mb-4">
                  <button className="cancelButton me-3">Cancel</button>
                  <button className="submitButton" type="submit">Submit</button>
                </div>
              </div>

            </form>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
