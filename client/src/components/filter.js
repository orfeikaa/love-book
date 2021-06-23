import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import {Tab, Tabs} from "react-bootstrap";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";

export const Filter = (props) => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const history = useHistory()
  //  const [genres, setGenres] = useState()
   const [cats, setCats] = useState()
    const [authors, setAuthors] = useState()
    const [pubs, setPubs] = useState()
    const [checked, setChecked] = useState([])


    // const getAuthor = useCallback(async ()=>{
    //     try{
    //         const fetched = await request(`/api/authors/`, 'GET', null, {
    //             Authorization : `Bearer ${token}`
    //         })
    //         setAuthors(fetched)
    //
    //     } catch (e){
    //
    //     }
    // }, [ ])

    const getCats = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setCats(fetched)
            // console.log('Data2', fetched)

        } catch (e){

        }
    }, [])

    const getPub = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/publishers/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setPubs(fetched)
            //console.log('Data', fetched)

        } catch (e){

        }
    }, [token, request ])
    //
    // const getGen = useCallback(async ()=>{
    //     try{
    //         const fetched = await request(`/api/genres/`, 'GET', null, {
    //             Authorization : `Bearer ${token}`
    //         })
    //         setGenres(fetched)
    //         //console.log('Data', fetched)
    //
    //     } catch (e){
    //
    //     }
    // }, [])

    const handleToggle = (item) => {
        const currentIndex = checked.indexOf(item);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(item)
        }else {
            newChecked.slice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    useEffect( () =>{
       // getGen()
        //    getAuthor()
       getCats()
       // getPub()
    }, [])





    return(
        <div className="filter_box">
        <Tabs defaultActiveKey="contact" id="tab">
            {/*<Tab eventKey="home" title="Издательства">*/}
            {/*    {!loading && pubs  && pubs.map((pub, index) => {*/}
            {/*        return(*/}
            {/*            <div className="form-check">*/}
            {/*                <input className="form-check-input"*/}
            {/*                       type="checkbox"*/}
            {/*                       value={`${pub.id_pub}`}*/}
            {/*                       id="flexCheckDefault"*/}
            {/*                       key={index}*/}
            {/*                       checked={checked.indexOf(pub.id_pub) === -1? false: true}*/}
            {/*                       onChange={()=>handleToggle(pub.id_pub)}*/}
            {/*                />*/}
            {/*                <label className="form-check-label" htmlFor="flexCheckDefault">*/}
            {/*                    {pub.title_pub}*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="profile" title="Жанры">*/}
                {/*{!loading && genres && genres.map((genre, index) => {*/}
                {/*    return(*/}
                {/*        <div className="form-check">*/}
                {/*            <input className="form-check-input"*/}
                {/*                   type="checkbox"*/}
                {/*                   value={`${genre.id_genres}`}*/}
                {/*                   id="flexCheckDefault"*/}
                {/*                   key={index}/>*/}
                {/*            <label className="form-check-label" htmlFor="flexCheckDefault">*/}
                {/*                {genre.title_genres}*/}
                {/*            </label>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
            {/*</Tab>*/}
            <Tab eventKey="contact"  title="Категории">
                {!loading && cats && cats.map((cat, index) => {
                    return(
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   value={`${cat.id_cat}`}
                                   id="flexCheckDefault"
                                   key={index}
                                   checked={checked.indexOf(cat.id_cat) === -1? false : true}
                                   onChange={()=>handleToggle(cat.id_cat)}
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {cat.title_cat}
                            </label>
                        </div>
                    );
                })}
            </Tab>

        </Tabs>
        </div>
    )
}
