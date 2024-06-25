import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "react-modal";
import { Button } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
// import Box from "@mui/material";

const sectionStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
  padding: "40px",
  backgroundColor: "#f5ca49",
};

const productStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  width: "200px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  gap: "20px",
};
const imgContainerStyle = {
  width: "100%",
  height: "180px",
  overflow: "hidden",
  borderRadius: "10px 10px 0 0",
  marginBottom: "15px",
  position: "relative",
};

const nameStyle = {
  fontSize: "12px",
  color: "#333",
  margin: "12px 0 5px 0",
  fontWeight: "bold",
};

const typeStyle = {
  fontSize: "13px",
  color: "#666",
  marginBottom: "10px",
};

const locationStyle = {
  fontSize: "15px",
  color: "#000",
  fontWeight: "bold",
  margin: "10px 0",
};
const imgStyle = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  objectFit: "cover",
  transition: "transform 0.3s ease",
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
};
const MyBookingsButtonStyle = {
  zIndex:1000,
  position: 'absolute',
  top: '20px', 
  right: '20px', 
};
const AllResButtonStyle = {
  zIndex:1000,
  position: 'absolute',
  top: '20px', 
  right: '190px', 
};
function ContentofThePage() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurantTableData, setRestaurantTableData] = useState([]);
  const [selectedRestaurantData, setSelectedRestaurantData] = useState(null);
  const [selectedTable, setSelectedTable] = useState("none");
  const [allRes, setAllRes] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAllRestaurantsFromDB = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/alltherestaurants"
        );
        console.log(response.data.message);
        console.log(response.data.data);
        console.log(response.data.data[0].image_path);
        if (response.data != null) {
          setRestaurantData(response.data.data);
          setAllRes(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAllRestaurantsFromDB();
  }, [allRes]);
const getMyBookings = async ()=>{ const userId = localStorage.getItem("userID");
  const url = `http://localhost:5000/restaurant/booked-by/${userId}`;
  try {
    const response = await axios.get(url);
    console.log("Bookings:", response.data); 
    setRestaurantData(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
   
    throw error;
  }
}
  const fetchTableData = async (restaurantId) => {
    console.log(`fetching table data for restaurant ID: ${restaurantId}`);
    const selectedRestaurantData = restaurantData.find(
      (restaurant) => restaurant._id === restaurantId
    );
    if (selectedRestaurantData) {
      setRestaurantTableData(selectedRestaurantData.tables);
      console.log(selectedRestaurantData.tables);
      setSelectedRestaurantData(selectedRestaurantData);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTable(null);
  };

  const handleTableClick = (tableNumber) => {
    console.log(`Table clicked: ${tableNumber}`);
    setSelectedTable(tableNumber);
  };

  const handleTableBook = async () => {
    // console.log(selectedTable);
    // console.log(selectedRestaurantData._id);
    // console.log(localStorage.getItem("userID"));
    const payload = {
      selectedTable: selectedTable,
      selectedRestaurant: selectedRestaurantData._id,
      userID: localStorage.getItem("userID"),
    };
    const response = await axios.post(
      "http://localhost:5000/restaurant/book",
      payload
    );

    console.log(payload);
    handleClose();
  };

  return (
    <>
     <section style={sectionStyle}>
      {restaurantData.map((restaurant, id) => (
        <Tilt
          className="tilt"
          tiltMaxAngleX={25}
          tiltMaxAngleY={25}
          perspective={1000}
          scale={1.05}
          transitionSpeed={1000}
          gyroscope={true}
          key={id}
        >
          <div key={id}>
            <div
              style={productStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => fetchTableData(restaurant._id)}
            >
              <div
                style={imgContainerStyle}
                onMouseOver={(e) =>
                  (e.currentTarget.querySelector('img').style.transform =
                    'scale(1.2)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.querySelector('img').style.transform =
                    'scale(1)')
                }
              >
                <img
                  style={imgStyle}
                  src={restaurant.image_path}
                  alt="Restaurant"
                />
              </div>

              <h2 style={nameStyle}>{restaurant.name}</h2>
              <p style={typeStyle}>{restaurant.type}</p>
              <div style={locationStyle}>{restaurant.location}</div>
              <Stack direction="row" spacing={1}>
                <Chip label={`Rating: ${restaurant.rating}`} />
                <Chip label={'View Details'} />
              </Stack>
            </div>
          </div>
        </Tilt>
      ))}
     <Button style={MyBookingsButtonStyle} variant="contained" onClick={getMyBookings}>
        My Bookings
      </Button>
      <Button variant="contained" style={AllResButtonStyle} onClick={()=>{setAllRes(true)}} >
          All Restaurants
        </Button>
    </section>
   
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {selectedRestaurantData && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
                width: "100%",
              }}
            >
              {selectedRestaurantData.name && (
                <h2 style={{ margin: "0", fontSize: "24px", color: "#333" }}>
                  {selectedRestaurantData.name}
                </h2>
              )}
              {selectedRestaurantData.location && (
                <p style={{ margin: "5px 0 0", color: "#666" }}>
                  {selectedRestaurantData.location}
                </p>
              )}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              width: "70%",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {restaurantTableData.map((item) => (
                <div
                  key={item.tableNumber}
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.isAvailable ? "green" : "red",
                    color: "#fff",
                    cursor: item.isAvailable ? "pointer" : "default", 
                    borderRadius: "8px",
                    transition: "transform 0.2s",
                  }}
                  onClick={
                    item.isAvailable
                      ? () => handleTableClick(item.tableNumber)
                      : null
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <p style={{ margin: "5px 0" }}>{item.tableNumber}</p>
                  <p style={{ margin: "5px 0" }}>
                    Seats: {item.seatingCapacity}
                  </p>
                  {!item.isAvailable && (
                    <p style={{ margin: "5px 0" }}>Booked</p>
                  )}{" "}
                 
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "20px",
              borderTop: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            <h3>Selected Table</h3>
            <p style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}>
              {selectedTable ? `Table: ${selectedTable}` : "No table selected"}
            </p>
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ alignSelf: "center", marginTop: "20px" }}
            onClick={handleTableBook}
          >
            Book Table
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ContentofThePage;
