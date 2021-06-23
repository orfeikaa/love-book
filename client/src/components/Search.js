import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {Carousel} from "./Carousel";
import {Catalog} from "./catalog";

export const Search =()=> {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [searchTerm, setSearchTerm] = useState("")
    const [books, setBooks] = useState([])
    const [searchResults, setSearchResults] = useState([]);

    const inputEl = useRef("");

    const getBooks = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setBooks(fetched)
                //console.log('Data', fetched)
        } catch (e){

        }
    }, [token, request ])


    function onInput(){
        var val = document.getElementById("search").value;
        var opts = document.getElementById('variant').childNodes;
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value === val) {
               document.location.href =`/books/${opts[i].id}`
                break;
            }
        }
    }

    const searchHandler = () => {
       // console.log(searchTerm)
        setSearchTerm(inputEl.current.value);
        if (searchTerm !== "") {
            const newList = books.filter((book) => {
                return Object.values(book)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchResults(newList);
            console.log(newList)
        } else {
            setSearchResults(books);
        }
    };

    const getSearchTerm = () => {

        setSearchTerm(inputEl.current.value);
        console.log(searchTerm)
    };

    useEffect( () =>{
        getBooks()
    }, [])

        return(
            <>
            <div className="d-flex col-6">
                <input className="form-control me-2"
                       ref={inputEl}
                       type="search"
                       id="search"
                       list ="variant"
                       name="search"
                       placeholder="Search"
                       aria-label="Search"
                       onChange={searchHandler}
                       onInput={onInput}
                />
                <datalist id="variant">
                    {!loading && searchTerm && searchResults.map((book, index) => {
                        return (
                            <option  value={book.title} id={book.id_book}>
                                {book.title}
                            </option>
                        );
                    })}
                </datalist>
                {/*<button className="btn btn-outline-dark" onClick={searchHandler}>Search</button>*/}
            </div>

                {/*<ul className="list-group search_item">*/}
                {/*{!loading && searchTerm && searchResults.map((book, index) => {*/}
                {/*    return (*/}
                {/*        <li className="list-group-item search_item" key={index}>*/}
                {/*            <Link className="link_search" to={`/books/${book.id_book}`}>{book.title}*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    );*/}
                {/*})}*/}
                {/*</ul>*/}
            </>
)



}
