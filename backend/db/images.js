const { Image } = require('./models');

async function addNewPhoto(userId, spotId, image) {
    const photo = await Image.create({
        userId,
        spotId,
        image
    })
    return await Image.findByPk(photo.id);
}


async function getAllSpotPhotos(spotId) {
    const photos = await Image.findAll({
        where: {
            spotId: spotId
        }
    })

    return photos;
}


async function deletePhoto(id) {
    const photo = await Image.findByPk(id);
    return await photo.destroy();
}


module.exports = {
    addNewPhoto,
    getAllSpotPhotos,
    deletePhoto
}
