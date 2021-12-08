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

module.exports = {
    addNewSpot,
    getAllSpots,
    getOneSpot
}
