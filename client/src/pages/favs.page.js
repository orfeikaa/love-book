import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";

export const FavsPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()


    const getBook = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/favorites/myBooks`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setBooks(fetched)
            console.log('Data9', fetched)
            // console.log(ones)
        } catch (e){

        }
    }, [token, request ])


    useEffect( () =>{
        getBook()

    }, [getBook])
    return(
        <div className="container">
            <h5 className="text-center color_block">Отложенное</h5>
            <div className="row">
                <div className="col-12">
                    <div className="row row-cols-1 row-cols-md-3 g-4">

                        {!loading && books && books.map((book, index) => {
                            return(
                                <div className="col-md-4 mb-3">
                                    <div className="card catalog" key={index}>
                                        <Link className="Nav_link" to={`/books/${book.id_book}`}> <h2>{book.title}</h2></Link>
                                        <div className="card-body">
                                            <p>{book.demo}</p>
                                            <div className="row">
                                                <div className="col-6">
                                                    <Link className="" to="#">
                                                        <button className='btn but_price2'>{book.price} p.</button>
                                                    </Link>
                                                </div>
                                                <div className="col-6">
                                                    <Link className="" to={`/toOrder/${book.id_book}`}>
                                                        <button className='btn card_button btn-light m-1'>В корзину</button>
                                                    </Link>
                                                    {/*<button className='btn btn-light card_button col-6'>В корзину</button>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
