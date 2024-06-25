import VideoHeader from "../components/VideoHeader";
import ContentofThePage from "../components/Content";
import { useEffect } from "react";

const homepageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const videoHeaderContainerStyle = {
  width: "100%",
  margin: "0 auto",
  padding: "30px",
  boxSizing: "border-box",
};

const contentContainerStyle = {
  width: "100%",
  marginTop: "80px", 
  padding: "30px",
  boxSizing: "border-box",
};

function Homepage() {
  useEffect(() => {
    console.log(localStorage.getItem("userID"));
  },[]);
  return (
    <div style={homepageContainerStyle}>
      <div style={videoHeaderContainerStyle}>
        <VideoHeader />
      </div>
      <div style={contentContainerStyle}>
        <ContentofThePage />
      </div>
    </div>
  );
}

export default Homepage;
