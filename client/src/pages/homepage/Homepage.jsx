/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import "./Homepage.css";
import JobDetail from "../../components/UI/JobDetail";
import JobApplicationForm from "../../components/Forms/JobApplicationForm";

export default function Homepage() {
  // const [searchInput, setSearchInput] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [defaultJobList, setDefaultJobList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false); //changes the view to render the job application form

  useEffect(() => {
    const getAllPostedJobs = () => {
      const jobList = axios
        .get(`/api/jobs`)
        .then((response) => {
          if (!response.status === 200) {
            throw Error({ message: "No jobs found!" });
          }
          setDefaultJobList(response.data.result);
          setAllJobs(response.data.result);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllPostedJobs();
  }, []);

  const searchByExperience = (e) => {
    e.preventDefault();
    if (experienceLevel === "Experience Level" && defaultJobList.length > 0) {
      setAllJobs((prevList) => [...defaultJobList]);
    } else {
      axios
        .get(`/api/jobs/${experienceLevel}`)
        .then((response) => {
          if (!response.status === 200) {
            return "No Jobs Found!";
          }
          setAllJobs(response.data.result);
        })
        .catch((error) => {
          setAllJobs([]);
          console.error(error);
        });
    }
  };
  // This function opens a detailed info section of selected job
  function handleShowDetail(e) {
    const jobId = parseInt(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    // console.log(jobId);
    const job = allJobs.filter((job) => {
      if (job.id === jobId) {
        return job;
      }
    });
    setSelectedJob(job[0]);
    setShowDetails(true);
  }
  // This function closes the detailed info section of selected job
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  /**
   * Function Open Job application form
   */
  const showJobApplicationForm = (e) => {
    setShowDetails(false);
    setShowApplicationForm(true);
  };
  const closeApplicationForm = () => {
    setShowDetails(true);
    setShowApplicationForm(false);
  };
  /**
   * ****************
   */
  return (
    <Container className="p-0">
      <Row>
        <h2 style={{ margin: "0 auto" }}>Welcome to the Homepage</h2>
      </Row>
      <Row className="d-flex justify-content-end">
        <Navbar className="" style={{ width: "fitContent" }}>
          <Form inline="true" style={{ width: "fitContent" }}>
            <Form.Group className="" controlId="">
              <Form.Label className="mr-2">Filter By:</Form.Label>
              <Form.Select
                aria-label="Default"
                name="experience"
                // value={newJobData.experience}
                onChange={(e) => {
                  let exp = e.target.value;
                  setExperienceLevel(exp);
                }}
                style={{ width: "10em" }}
                className="mr-2 p-2"
              >
                <option>Experience Level</option>
                <option value="Entry-level">
                  Entry-level (Little to No Experience Required)
                </option>
                <option value="Junior">Junior ( 0 to 2 years )</option>
                <option value="Associate">Associate ( 2 to 5 years )</option>
                <option value="Mid-level">Mid-level ( 5 to 10 years )</option>
                <option value="Senior">Senior ( 10 years and above )</option>
              </Form.Select>
              <Button type="submit" onClick={searchByExperience}>
                Search
              </Button>
            </Form.Group>
          </Form>
        </Navbar>
      </Row>
      <hr />
      {showDetails ? (
        <JobDetail
          job={selectedJob}
          handleCloseDetails={handleCloseDetails}
          showJobApplicationForm={showJobApplicationForm}
        />
      ) : showApplicationForm ? (
        <JobApplicationForm closeApplicationForm={closeApplicationForm} />
      ) : (
        <Row>
          <Col>
            <Row>
              {allJobs.length >= 1 ? (
                allJobs.map((job) => {
                  return (
                    <Col
                      key={Math.random()}
                      className="col-lg-4 col-md-12 col-sm-12"
                    >
                      <Card
                        className="mb-3"
                        data-id={job.id}
                        key={Math.random()}
                        style={{ boxShadow: "-3px 5px 8px grey" }}
                      >
                        <Card.Body>
                          <Card.Title>
                            {job.experience} {job.job_title}
                          </Card.Title>
                          <Card.Text>{job.skills}</Card.Text>
                          <Card.Text>
                            {job.location_city}, {job.location_state}
                          </Card.Text>
                          <Card.Text>{job.job_type}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button onClick={handleShowDetail}>
                            Show Details
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <h4>No jobs found</h4>
              )}

              {/* </ul> */}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}
