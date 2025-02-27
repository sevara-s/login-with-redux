import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="section">
        <div className="container">
          <h1>Home Page</h1>
          <Button onClick={() => navigate(-1)}>Log out</Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
