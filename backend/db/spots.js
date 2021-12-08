const { Spot } = require('./models');

async function addNewSpot(hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg) {
    const spot = await Spot.create({
        hostId,
        address,
        city,
        state,
        pricePerNight,
        bedrooms,
        beds,
        bathrooms,
        description,
        amenities,
        profileImg
    })
    return await Spot.findByPk(spot.id);
}

async function getAllSpots() {
    const spots = await Spot.findAll();
    return spots;
}

async function getOneSpot(id) {
    const spot = await Spot.findByPk(id);
    return spot;
}

async function updateSpot(id, hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities, profileImg) {
    console.log('id', id);
    const spot = await Spot.findByPk(id);
    console.log('spot', spot);
    const updatedSpot = await spot.update({
        hostId,
        address,
        city,
        state,
        pricePerNight,
        bedrooms,
        beds,
        bathrooms,
        description,
        amenities,
        profileImg
    })
    return updatedSpot;
}

async function deleteSpot(id) {
    return await Spot.findByPk(id).delete();
}

module.exports = {
    addNewSpot,
    getAllSpots,
    getOneSpot,
    updateSpot,
    deleteSpot
}
