import React, {useContext} from 'react'
import {Link} from "react-router-dom";

export const Carousel =({ones, twos})=> {
    return(
        <div className="row justify-content-md-center">
            <section className="pt-4 pb-2 ">
                <div className="container carousel_body">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="mb-3">Горячие новинки приключений</h3>
                        </div>

                        <div className="col-12">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">


                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${ones[0].id_book}`}> <h2>{ones[0].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{ones[0].demo}</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${ones[1].id_book}`}> <h2>{ones[1].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{ones[1].demo}</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${ones[2].id_book}`}> <h2>{ones[2].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{ones[2].demo}</p>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${ones[3].id_book}`}> <h2>{ones[3].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{ones[3].demo}</p>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="pt-4 pb-2">
                <div className="container carousel_body">
                    <div className="row">
                        <div className="col-6 header">
                            <h3 className="mb-3">Фантастика</h3>
                        </div>



                        <div className="col-12">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row">



                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${twos[0].id_book}`}> <h2>{twos[0].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{twos[0].demo}</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${twos[1].id_book}`}> <h2>{twos[1].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{twos[1].demo}</p>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${twos[2].id_book}`}> <h2>{twos[2].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{twos[2].demo}</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <div className="card h-100 card_main" >

                                                    <Link className="Nav_link" to={`/books/${twos[3].id_book}`}> <h2>{twos[3].title}</h2></Link>


                                                    <div className="card-body">
                                                        <p>{twos[3].demo}</p>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<img className="dfjfgm" src="../images/heart.png"></img>*/}
                    </div>
                </div>
            </section>
        </div>
    )
}
