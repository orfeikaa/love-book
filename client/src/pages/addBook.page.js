import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";


export const AddBookPage = () =>{

    const history = useHistory()
    const message = useMessage()
    const {userId, token} = useContext(AuthContext)
    const {request, loading, error, clearError} = useHttp()
    const [genres, setGenres] = useState()
    const [pubs, setPubs] = useState()
    const [cats, setCats] = useState()
    const [authors, setAuthors] = useState()
    const [form, setForm] = useState({
        title: '', author: '', pub: '', gen:'', cat:'', price:'', demo:'', images:''
    })

    const getAuthor = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/authors/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setAuthors(fetched)
            //console.log('Data2', fetched)
        } catch (e){

        }
    }, [token, request ])

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

    const getCats = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/category/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setCats(fetched)
           // console.log('Data2', fetched)

        } catch (e){

        }
    }, [token, request ])

    const getGen = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/genres/`, 'GET', null, {
                Authorization : `Bearer ${token}`
            })
            setGenres(fetched)
            //console.log('Data', fetched)

        } catch (e){

        }
    }, [token,  request ])

    useEffect( () =>{

        getGen()
        getAuthor()
        getPub()
        getCats()
        message(error)
        clearError()
    }, [getGen, getAuthor, getPub, getCats,error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const addhandler = async () => {
        try {
            const data = await request('/api/books/', 'POST', {...form}, {
                Authorization : `Bearer ${token}`
            })
          //  console.log('Data', data)
            message(data.message)
            history.push("/profile");
        } catch (e) {}
    }

    return(
        <div className="container">
            <h5 className="text-center color_block">Добавление книги</h5>
            <div className="add_">

                    <div className="row">
                    <div className="col-7">

                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    id="title"
                                    name="title"
                                    onChange={changeHandler}
                                    value = {form.title}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Автор</label>
                            <div className="col-sm-10">
                                <select className="form-control form-control-sm"
                                         aria-label="multiple select example"
                                        id="author"
                                        name="author"
                                        onChange={changeHandler}
                                        value={form.author}
                                >
                                    {!loading && authors && authors.map((author, index) => {
                                        return(
                                        <option
                                            value={`${author.id_autor}`}
                                            key={index}
                                        >{author.fio}
                                        </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="pub" className="col-sm-2 col-form-label">Издательство</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control form-control-sm"
                                    aria-label="Default select example"
                                    id="pub"
                                    name="pub"
                                    onChange={changeHandler}
                                    value={form.pub}
                                >
                                    {!loading && pubs && pubs.map((pub, index) => {
                                        return(
                                            <option
                                                value={`${pub.id_pub}`}
                                                key={index}
                                            >{pub.title_pub}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3 row">
                                    <label htmlFor="gen" className="col-sm-4 col-form-label">Жанры</label>
                                    <div className="col-sm-8">
                                        <select
                                            className="form-control form-control-sm"
                                            aria-label="Default select example"
                                            id="gen"
                                            name="gen"
                                            onChange={changeHandler}
                                            value={form.gen}
                                        >
                                            {!loading && genres && genres.map((genre, index) => {
                                                return(
                                                    <option
                                                        value={`${genre.id_genres}`}
                                                        key={index}
                                                    >{genre.title_genres}
                                                    </option>

                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="cat" className="col-sm-4 col-form-label">Категория</label>
                                    <div className="col-sm-8">
                                        <select className="form-control form-control-sm"
                                                aria-label="Default select example"
                                                id="cat"
                                                name="cat"
                                                onChange={changeHandler}
                                                value={form.cat}
                                            // onChange={e=>setBook(e.target.value)}

                                        >
                                            {!loading && cats && cats.map((cat, index) => {
                                                return(
                                                    <option
                                                        value={`${cat.id_cat}`}
                                                        key={index}>{cat.title_cat}
                                                    </option>

                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="price" className="col-sm-4 col-form-label">Цена</label>
                                    <div className="col-sm-8">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            id="price"
                                            name="price"
                                            onChange={changeHandler}
                                            value = {form.price}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3 row">
                                    <label htmlFor="demo" className="col-sm-3 col-form-label">Аннотация</label>
                                    <div className="col-sm-9">
                                <textarea
                                    className="form-control form-control-sm"
                                    name="demo"
                                    id="demo"    rows="3"
                                    onChange={changeHandler}
                                    value={form.demo}
                                >

                                </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="mb-3 row">
                            <label htmlFor="images" className="col-sm-2 col-form-label">Обложка</label>
                            <div className="col-sm-10">
                                <input className="form-control form-control-sm"
                                       type="file"
                                       id="images"
                                       name="images"
                                       value={form.images}
                                />
                            </div>
                        </div>
                        <div>
                            <img src="/images/45.png"
                                 className="add_img"
                            />
                        </div>

                        <div className="add">
                            <button
                                className="btn btn-light m-1 add_but"
                                onClick={addhandler}
                                disabled={loading}
                            >
                                Добавить книгу
                            </button>
                            <span className="_err-message-span" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
