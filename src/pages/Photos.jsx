import React, {useContext} from "react"
import {Context} from '../components/userContext'
import Image from "../components/Image"
import setImageSize from '../utils/index'

function Photos() {
    const {photos} = useContext(Context)

    const images = photos.map((photo, i)=>(
        <Image key={photo.id} photo={photo} className={setImageSize(i)}/>
    ))
    return (
        <main className="photos">
            {images}
        </main>
    )
}

export default Photos