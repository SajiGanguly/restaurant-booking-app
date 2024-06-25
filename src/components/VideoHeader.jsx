function VideoHeader() {
  const videoHeaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "30%",
    overflow: "hidden",
    zIndex: 1,
  };

  const videoStyle = {
    width: "100%",
    height: "90%",
    objectFit: "cover",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    
  };

  return (
    <div style={videoHeaderStyle}>
      <video autoPlay loop muted style={videoStyle}>
        <source
          src="/videos/HeaderVideo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoHeader;
