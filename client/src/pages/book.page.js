import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {BookCard} from '../components/BookCard.js';


export const BookPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [cat, setCat] = useState()
    const [pub, setPub] = useState()
    const [book, setBook] = useState()
    const [authors, setAuthors] = useState()
    const book_id = useParams().id_book
    //console.log(book_id)
    const getBook = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
           setBook(fetched)
            console.log('Data', fetched)
            console.log(book)
        } catch (e){

        }
    }, [token, book_id, request ])

    const getAuthor = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/authors/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setAuthors(fetched)
            console.log('Data2', fetched)
            console.log(authors)
        } catch (e){

        }
    }, [token, book_id, request ])

    const getPub = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/publishers/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setPub(fetched)
            console.log('Data', fetched)
            console.log(pub)
        } catch (e){

        }
    }, [token, book_id, request ])

    const getCat = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/${book_id}`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setCat(fetched)
            console.log('Data', fetched)
            console.log(cat)
        } catch (e){

        }
    }, [token, book_id, request ])

    useEffect( () =>{
        getBook()
        getAuthor()
        getPub()
        getCat()
    }, [getBook, getAuthor, getPub, getCat])


    return(
        <div className="container">
            {!loading && pub && cat && authors && book && <BookCard book={book} authors={authors} pub={pub} cat={ cat} />}
        </div>
    )
}
