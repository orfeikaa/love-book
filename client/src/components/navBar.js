import React, {useContext} from 'react'
import {Link, Route, useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {Logout} from "./Logout";
import {Search} from "./Search";

export const NavBar =()=>{

    return(
        <div className="fixed-top">
            <nav className="navbar">
                <a className="navbar-brand"  href="#">
                    <div className="v42_250">
                        <div className="v42_251">

                        </div>
                    </div>
                    <Link className="Nav_link text_align" to="/">LOVEBOOK</Link>
                </a>
                <Search/>
                {/*<form className="d-flex col-6">*/}
                {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                {/*    <button className="btn btn-outline-dark" type="submit">Search</button>*/}
                {/*</form>*/}
                <a className="navbar-brand"  href="#">
                    <Link className="Nav_link" to="/favs"><div className="v_favs">
                    </div></Link>
                </a>
                <a className="navbar-brand"  href="#">

                    <Link className="Nav_link" to="/shop"><div className="v_shop">
                    </div></Link>
                </a>
                <a className="navbar-brand"  href="#">

                    <Link className="Nav_link" to="/me"><div className="v_me">
                    </div></Link>
                </a>
                <Logout/>
            </nav>
            <div className="container-fluid">
                <nav className="nav nav-fill" id="light">
                    <a className="nav-item bar"> <Link className="Nav_link" to="/">ГЛАВНАЯ</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/catalog">КАТАЛОГ</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/statistic">СТАТИСТИКА</Link></a>
                    <a className="nav-item bar"><Link className="Nav_link" to="/about">О НАС</Link></a>
                </nav>
            </div>
        </div>

    )

}
