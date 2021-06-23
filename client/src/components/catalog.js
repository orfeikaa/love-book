import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {useHttp} from "../hooks/http.hook";

export const Catalog =({books})=> {
   return(
       <>
               { books && books.map((book, index) => {
                   return(
                       <div className="col-md-4 mb-3">
                           <div className="card h-100 catalog" key={index}>
                               <Link className="Nav_link" to={`/books/${book.id_book}`}> <h2>{book.title}</h2></Link>
                               <div className="card-body">
                                   <p>{book.demo}</p>
                                   <button className='btn but_price2'>{book.price} p.</button>
                               </div>
                           </div>
                       </div>
                   );
               })}
       </>
   )
}
