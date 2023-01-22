import { 
  Button,
  Grid,
  Card,
  CardContent,
 } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Thanks.css";
// import NoSsr from '@mui/base/NoSsr'
// import Frame from "react-frame-component";

const Thanks = () => {
  const history = useHistory();

  const routeToProducts = () => {
    history.push("/");
  };

  const routeToCheckout = () => {
    history.push("/checkout")
  }

  const iframeProducts = [
    {
      name: 'Ipad Mini 64GB',
      image:
        'https://crio-directus-assets.s3.ap-south-1.amazonaws.com/7ad56699-20c9-4778-a783-4021e5f0864c.png',
      _id: '34sLtEcMpzabRy',
    },
    {
      name: 'Galaxy A21',
      image:
        'https://crio-directus-assets.s3.ap-south-1.amazonaws.com/cdb64440-5e95-4aaa-858b-8c12ee316d93.png',
      _id: '34sLtEcMpzabRyfx',
    },
  ]

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      <Header />
      <Box className="greeting-container">
        <h2>Yay! It's ordered 😃</h2>
        <p>You will receive an invoice for your order shortly.</p>
        <p>Your order will arrive in 7 business days.</p>
        <p id="balance-overline">Wallet Balance</p>
        <p id="balance">${localStorage.getItem('balance')} Available</p>
        <Button
          variant="contained"
          size="large"
          id="continue-btn"
          onClick={routeToProducts}
        >
          Continue Shopping
        </Button>
        <Grid container marginY="2rem" paddingX="1rem" spacing={4}>
          {iframeProducts.length &&
            iframeProducts.map((product) => (
              // <NoSsr>
                // <Frame
                //   width="200"
                //   height="250"
                //   className="iframe"
                //   frameBorder="0"
                // >
                  <Grid item xs={5} md={3} key={product._id}>
                    <Card className="card">
                      {/* <CardMedia
                        component="img"
                        alt={product.name}
                        image={product.image}
                      /> */}
                      <img
                        style={{ margin: '-8px' }}
                        width="200px"
                        alt={product.name}
                        src={product.image}
                      ></img>
                      <CardContent>
                        {/* <Typography class="title">{product.name}</Typography> */}
                        <p className="para" style={{ textAlign: 'center',margin: '25px',fontWeight: 600 }}>
                          {product.name}
                        </p>
                        <Box class="action_buttons">
                          <Button
                            style={{
                              fontWeight: 600,
                              fontFamily: 'Lato',
                              fontSize: ' 0.875rem',
                              lineHeight: '1',
                              minWidth: '64px',
                              padding: ' 10px 30px',
                              color: '#fff',
                              backgroundColor: '#00a278',
                              borderRadius: '4px',
                              border: 'none',
                              display: 'block',
                              cursor:'pointer',
                              margin: 'auto auto 10px auto',
                            }}
                            variant="contained"
                            s
                            size="large"
                            id="continue-btn"
                            onClick={routeToProducts}
                          >
                            View Cart
                          </Button>
                          <Button
                            style={{
                              fontWeight: 600,
                              fontFamily: 'Lato',
                              fontSize: ' 0.875rem',
                              lineHeight: '1',
                              minWidth: '64px',
                              cursor:'pointer',
                              padding: '10px 32px',
                              color: '#fff',
                              backgroundColor: '#00a278',
                              borderRadius: '4px',
                              border: 'none',
                              display: 'block',
                              margin: 'auto auto 10px auto',
                            }}
                            variant="contained"
                            size="large"
                            id="continue-btn"
                            onClick={routeToCheckout}
                          >
                            Buy Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                // </Frame>
              

            ))}
        </Grid>
        <iframe
          style={{
            border: 0,
            scrolling: 'none',
            height: '110px',
            width: '150px',
            right: '25px',
            position: 'fixed',
          }}
          title="scroll"
          src="https://tamil.oneindia.com/common/corona/corona-virus-flip.html"
        ></iframe>
      </Box>
      <Footer />
    </>
  );
};

export default Thanks;
