import React from "react";
import { Button } from "../../../Component";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>HomePage</p>
      <Button onClickFunction={() => navigate("/auth")} />
    </div>
  );
}

export default HomePage;
