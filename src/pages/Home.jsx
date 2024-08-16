import React from 'react';
import { NavLink } from "react-router-dom";
import { PROFILE_ROUTE } from '../utils/routes-consts';

const Home = () => {
    return(
        <>
        <p>Home</p>
        <NavLink to={PROFILE_ROUTE}>дальше</NavLink>
        </>
    )
}

export default Home;