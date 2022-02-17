const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { addNewPhoto, getAllSpotPhotos, deletePhoto} = require('../../db/images')

const router = express.Router();

router.post(
    '/',
    singleMulterUpload("image"),
    requireAuth,
    asyncHandler(async (req, res) => {
        const { userId, spotId } = req.body;
        const image = await singlePublicFileUpload(req.file);
        const newImage = await addNewPhoto(userId, spotId, image);

        return res.json({ newImage })
    })
)

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const spotId = req.params.id;
        const spotPhotos = await getAllSpotPhotos(spotId);
        return res.json(spotPhotos);
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        await deletePhoto(id);
        return res.json({message: 'Photo successfully deleted.'})
    })
)

module.exports = router;
