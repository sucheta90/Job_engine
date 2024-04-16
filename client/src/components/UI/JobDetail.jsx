/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function JobDetail(props) {
  const { handleCloseDetails, job, showJobApplicationForm } = props;
  const [experince, setExperience] = useState("");

  useEffect(() => {
    const experienceReq = (job) => {
      const exp = job.experience;
      switch (exp) {
        case "Entry-level":
          setExperience("Little to NO Experince Required");
          break;
        case "Junior":
          setExperience("0 to 2 years");
          break;
        case "Associate":
          setExperience("2 to 5 years");
          break;
        case "Mid-level":
          setExperience("5 to 10 years");
          break;
        case "Senior":
          setExperience("10 years and above");
          break;
      }
    };
    experienceReq(job);
  }, [job]);

  const applyToAJob = (e) => {
    e.preventDefault();
    const data = axios
      .put(`api/company/${job.company_id}/job/${job.id}/application`)
      .then((data) => {
        if (!data.status === 200) {
          toast.error("Could not complete request");
          throw Error({ message: "Could not complete request" });
        }
        toast.success("Applied to the job successfully");
        return data;
      })
      .catch((error) => {
        console.log("Could not complete request", error);
      });
  };

  return (
    <div className="p-3">
      <h2 className="mb-3">Job Details</h2>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Card
        data-id={job.id}
        style={{ boxShadow: "-3px 5px 8px grey" }}
        className="p-3"
      >
        <section>
          <Button
            style={{ float: "inline-end", boxShadow: "-3px 5px 8px grey" }}
            aria-label="Close"
            className="btn btn-dark btn-sm "
            onClick={handleCloseDetails}
          >
            X
          </Button>
        </section>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>
            {job.experience} {job.job_title}
          </Card.Title>
          <Card.Text>{job.company_details}</Card.Text>
          <Card.Text>
            <b>Description</b> <br />
            {job.description}
          </Card.Text>
          <Card.Text>
            <b>Exprerience required</b> <br />
            {experince}
          </Card.Text>
          <Card.Text>
            <b>Skills Required</b> {job.skills}
          </Card.Text>

          <Card.Text>
            <b>Postion</b> {job.job_type}
          </Card.Text>
          <Card.Text>
            <b>Location</b> {job.location_city}, {job.location_state}
          </Card.Text>
          <Card.Text>
            <b>Responsibilities Include</b> {job.responsibility}
          </Card.Text>
          <Card.Text>
            <b>Estimated Annual Salary</b> ${job.salary_min} - ${job.salary_max}
          </Card.Text>
          <Card.Text>
            <b>Expiry Date</b>
          </Card.Text>

          <Button
            variant="primary"
            className="mr-3"
            onClick={showJobApplicationForm}
          >
            Apply
          </Button>
          <Button onClick={handleCloseDetails}>Back to Jobs List</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
