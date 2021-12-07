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

module.exports = {
    addNewSpot
}
