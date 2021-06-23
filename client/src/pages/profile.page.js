import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";


export const ProfilePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState()

    const getBooks = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/profile/myBooks`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setBooks(fetched)
            // console.log('Data', fetched)
            //console.log(books)
        } catch (e){

        }
    }, [token, request ])

    useEffect( () =>{
        getBooks()
    }, [getBooks])

    return(
        <div className="container">

            {/*//<div className="row justify-content-center">*/}
            <h5 className="text-center color_block">Профиль</h5>
            {/*</div>*/}
            <div className="prof">
                <div className="row">
                    <div className="line col-md-4">


                        <div>

                            <img className="prof_img" src="/images/profile.jpg"/>
                            <h5 className="card-title">@orfeikaa</h5>
                        </div>


                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-7 text">
                                    <h6>Мои интересы:</h6>
                                    <button className='btn btn-light m-1'> Психология</button>
                                    <button className='btn btn-light m-1'> Путешествия</button>
                                    <button className='btn btn-light m-1'> Мотивация</button>
                                    <button className='btn btn-light m-1'> Фриланс</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="text">
                                   <h6> <Link className="link" to="/profile/myBooks">Мои книги</Link>: {!loading && books && books.length }</h6>
                                    <button className='btn btn-light m-1 add_but'><Link className="link" to="/book/add">Добавить книгу</Link> </button>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
