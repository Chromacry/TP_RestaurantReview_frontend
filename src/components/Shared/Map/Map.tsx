import React, { FC, useEffect, useState } from "react";
import {
    Container
} from "./MapElements";
import { RestaurantDetailsProps } from "../../../types/RestaurantDetailsType";





const Map: FC<RestaurantDetailsProps> = ({location}) => {
    // const urlStreet = "Watson, 200 Victoria St, Bugis Junction, Singapore 188021".trim();
    const urlStreet = location?.trim();
    const mapSrc = "https://maps.google.com/maps?q="+ urlStreet +"&t=&z=17&ie=UTF8&iwloc=&output=embed";

    return (
        <>
            <Container>
                <iframe title="Map" className="gmap_canvas" src={mapSrc} allowFullScreen/>
            </Container>
        </>
    );
};

export default Map;