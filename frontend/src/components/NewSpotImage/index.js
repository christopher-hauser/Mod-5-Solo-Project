import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as imageActions from "../../store/images";
import Spot from "../SpotPage";

import './style.css'

function NewSpotImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const spotId = useSelector(state => state.spots.currentSpot.id);

    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        const added = await dispatch(imageActions.addNewImage({ userId, spotId, image }))
        if (added) {
            history.push(`/spots/${spotId}`)
        }
    }

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) setImage(file);
    }

    return (
        <form onSubmit={handleSubmit} id='add-image-form'>
            <input
                id='add-image-input'
                type='file'
                onChange={updateFile}
                required
            />
            <div id='flex-container'>
                <label for='add-image-input' className="add-image-input">
                    Choose File
                </label>
                <p id='file-name'>{image?.name}</p>
                <button id='upload-image-submit' type='submit'>Upload</button>
            </div>
        </form>
    )
}

export default NewSpotImage;
