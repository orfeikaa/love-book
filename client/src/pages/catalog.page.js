import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/Auth.Context";
import {Link, useHistory} from "react-router-dom";
import {Carousel} from "../components/Carousel";
import {Catalog} from "../components/catalog";
import {useMessage} from "../hooks/message.hook";
import {Tabs} from 'react-bootstrap';
import {Tab} from "react-bootstrap";
import {Filter} from "../components/filter";
import {TabFilter} from "../components/tabFilter";

export const CatalogPage = () =>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [books, setBooks] = useState([])
    const history = useHistory()
    const [Filters, setFilters] = useState({
        cats: [],
        price:[]
        }
    )
    const [searchResults, setSearchResults] = useState([]);

    const getBooks = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            });
            setBooks(fetched)
            setSearchResults(fetched)
           // console.log('Data', fetched)
           // console.log(books)
        } catch (e){

        }
    }, [token, request ])



    const showFilteredResult = (filt)=>{
       console.log(filt)
        const filteredArray =[];
        books.filter(obj =>{
            //console.log("obj")
          //  console.log(obj)
             filt['cats'].forEach(element =>
             {
               //  console.log(element)
                if(obj.cat_fk===element)
                {
                   // console.log(obj)
                    filteredArray.push(obj);
                }
            })
        });
        setSearchResults(filteredArray);
        //setBooks(filteredArray)
    }




    const handleFilters = (filters, category) => {
        //console.log(filters)
        const  newFilters = {...Filters}
        newFilters[category] = filters
        showFilteredResult(newFilters)
        setFilters(newFilters)
    }


    useEffect( () =>{
        getBooks()
    }, [getBooks])



    return(
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4" >
                        {!loading && books  ? (
                            <Catalog books={searchResults}/>
                        ) : !loading && books && searchResults ? (
                            <Catalog books={searchResults}/>
                            ):(
                                <h3></h3>
                        )
                        }

                        {/*{!loading && books &&  <Catalog books={books}/>}*/}
                    </div>
                </div>
                <div className="col-3">
                    {/*<Tabs>*/}
                    {/*    <Tab title="Категoрии">*/}
                    {/*        <TabFilter handleFilters = {filters => handleFilters(filters, 'cats')}/>*/}
                    {/*    </Tab>*/}
                    {/*    /!*<*!/*/}
                    {/*    /!*<TabFilter/>*!/*/}
                    {/*</Tabs>*/}
                    <Filter
                        handleFilters = {filters =>
                            handleFilters(filters, 'cats')
                           }
                    />
                </div>
            </div>
        </div>
    )
}
