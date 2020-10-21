import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Carousel from "react-material-ui-carousel";
import { Divider, Paper, Typography } from "@material-ui/core";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { PageDrawer } from "../../PageDrawer/PageDrawer";
import { resourceStyles } from "../../../styles/resourceStyles";

export const Resources = () => {
  const styles = resourceStyles();
  const resources = [
    {
      name: "National Suicide Prevention Hotline",
      description:
        "Your life matters. If you're feeling thoughts of suicide, please contact the NSPH at 800-273-8255. You are loved.",
    },
    {
      name: "Recognize that talking about personal issues can be a challenge.",
      description:
        "Talking about your experience can be a challenge at times, but it’s worth it. By being vocal, you can develop more coping skills, stronger relationships and a better sense of yourself.",
    },
    {
      name: "HopeLine",
      description:
        "Call or Text 877-235-4525 to speak to someone who cares about you and wants to help you. If you're in a crisis, they can help.",
    },
    {
      name: "You Are Not Alone",
      description:
        "“I found that with depression, one of the most important things you can realize is that you’re not alone. You’re not the first to go through it, you’re not gonna be the last to go through it,” — Dwayne “The Rock” Johnson",
    },
    {
      name: "Emergency",
      description: "If you're in an emergency situation, please call 911.",
    },
    {
      name: "You Are Not A Burden",
      description:
        "“I understand your pain. Trust me, I do. I’ve seen people go from the darkest moments in their lives to living a happy, fulfilling life. You can do it too. I believe in you. You are not a burden. You will NEVER BE a burden.” — Sophie Turner",
    },
    {
      name: "National Domestic Violence Hotline",
      description:
        "It's okay to speak up. You are strong for even considering it, and we are proud of you. Please call 800-787-3224 to speak to someone from the NDVH that can help you.",
    },
  ];

  //   <MarkerWithLabel
  //                 labelVisible
  //                 labelStyle={{
  //                   backgroundColor: "rebeccapurple",
  //                   fontSize: "12px",
  //                   color: "white",
  //                   width: "200px",
  //                   border: "2px solid rebeccapurple",
  //                   WebkitBorderTopRightRadius: "30%",
  //                   WebkitBorderBottomLeftRadius: "35%",
  //                   WebkitBorderBottomRightRadius: "35%",
  //                 }}
  //                 position={{ lat: 38.9463263, lng: -95.3184562 }}
  //               >
  //                 <div>
  //                   Kansas Suicide Prevention Resource Center
  //                   <br />
  //                   785-841-9900
  //                   <br />
  //                   2110 Delaware St Suite B, Lawrence, KS 66046
  //                 </div>
  //               </MarkerWithLabel>
  const [coords, setCoords] = useState(null);
  const Map = withScriptjs(
    withGoogleMap((props) => {
      return (
        <GoogleMap
          defaultZoom={coords ? 8 : 4}
          defaultCenter={{
            lat: coords.lat ? coords.lat : 38.9463263,
            lng: coords.lng ? coords.lng : -95.3184562,
          }}
        >
          {props.isMarkerShown && (
            <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
              {props.markers.map((marker) => {
                return (
                  <Marker position={{ lat: marker.lat, lng: marker.lng }} />
                );
              })}
            </MarkerClusterer>
          )}
        </GoogleMap>
      );
    })
  );

  useEffect(() => {
    const onSuccess = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setCoords((x) => (x = { lat: lat, lng: lng }));
    };

    const onFail = () => {
      setCoords("failed");
    };
    if (!navigator.geolocation) {
      console.log("Geolocation unsupported.");
    } else {
      console.log("Geolocation found.");
      navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    }
  }, []);

  const markers = [
    {
      lat: 38.9463263,
      lng: -95.3184562,
    },
    {
      lat: 39.5167689,
      lng: -119.7770029,
    },
    {
      lat: 35.5374727,
      lng: -97.5896816,
    },
    {
      lat: 31.7730007,
      lng: -106.4791582,
    },
    {
      lat: 29.67845,
      lng: -95.54055,
    },
    {
      lat: 35.6039798,
      lng: -77.3697727,
    },
    {
      lat: 33.5157039,
      lng: -86.7790114,
    },
    {
      lat: 39.7472443,
      lng: -75.6267286,
    },
    {
      lat: 45.486132,
      lng: -122.6772387,
    },
    {
      lat: 47.5045441,
      lng: -111.2933778,
    },
    {
      lat: 33.443188,
      lng: -111.9622497,
    },
    {
      lat: 36.1282394,
      lng: -95.941723,
    },
    {
      lat: 27.8741433,
      lng: -82.7150244,
    },
    {
      lat: 44.3119654,
      lng: -69.7679767,
    },
    {
      lat: 40.7899842,
      lng: -77.8609482,
    },
    {
      lat: 39.112561,
      lng: -84.5052557,
    },
    {
      lat: 39.7989335,
      lng: -162.589301,
    },
    {
      lat: 32.8018207,
      lng: -96.8052471,
    },
    {
      lat: 30.2587946,
      lng: -97.7296643,
    },
    {
      lat: 40.4776271,
      lng: -88.9944425,
    },
    {
      lat: 39.7760425,
      lng: -86.1541307,
    },
    {
      lat: 40.4176745,
      lng: -86.8883861,
    },
    {
      lat: 38.2495342,
      lng: -85.7915568,
    },
    {
      lat: 37.7229153,
      lng: -85.8849548,
    },
    {
      lat: 34.7108739,
      lng: -86.6692755,
    },
    {
      lat: 33.4961755,
      lng: -88.4240928,
    },
    {
      lat: 32.353012,
      lng: -90.1669716,
    },
    {
      lat: 30.4401037,
      lng: -84.2874902,
    },
    {
      lat: 30.3193863,
      lng: -81.658862,
    },
  ];

  const CarouselGenerator = (item) => {
    console.log(item);
    return (
      <Paper>
        <h2>{item.item.name}</h2>
        <p>{item.item.description}</p>
      </Paper>
    );
  };

  return (
    <>
      <Helmet>
        <title>Seroful - Resources</title>
      </Helmet>
      <Carousel className={styles.carousel}>
        {resources.map((x, i) => (
          <CarouselGenerator key={i} item={x} />
        ))}
      </Carousel>
      <br />
      <br />
      <br />
      <Paper className={styles.crisisCenters}>
        <header>
          <Typography component="h3">Find a Crisis Center Near You</Typography>
        </header>
        <main>
          <Typography variant="caption">
            Your safety is important. If you are in immediate danger or need
            assistance, find a Crisis Center near you.
          </Typography>
          <br />
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJKzKsmAauODrejY_kE5TyBI3qEgozHY0&callback=initMap&libraries=&v=weekly"
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "400px" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            markers={markers}
          />
        </main>
      </Paper>
      <PageDrawer />
    </>
  );
};
