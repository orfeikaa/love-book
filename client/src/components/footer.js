import React, {useContext} from 'react'

export const FootBar =()=> {
    return(
        <nav className="navbar fixed-bottom justify-content-center">
            <div className="container justify-content-center">
                <div className="row col-12 justify-content-center">
                    <h3 className="text-center">Свяжитесь с нами</h3>
                </div>
                <div className="row ">

                     <div className="v_inst col mx-3">
                    </div>

                    <div className="v_vk col mx-3">
                    </div>


                            <div className="v_you col mx-3">
                            </div>


                    <div className="v_tg col mx-3">
                    </div>
                </div>
                <div className="row col-12 justify-content-center">
                    <h5 className="text-center"> ©2021- lovebook - Ваш любимый магазин книг</h5>
                </div>
            </div>
        </nav>
    )
}
