import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as imageActions from "../../store/images";
import Spot from "../SpotPage";

function NewSpotImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const spotId = useSelector(state => state.spots.currentSpot.id);

    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(userId, spotId, image);
        const added = await dispatch(imageActions.addNewImage({userId, spotId, image}))
        // if (added) {
        //     history.push('')
        // }
    }

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    }

    return (
        <form onSubmit={handleSubmit} id='add-image-form'>
            <input
            type='file'
            onChange={updateFile}
            required
            />
            <button type='submit'>Upload</button>
        </form>
    )
}

export default NewSpotImage;
