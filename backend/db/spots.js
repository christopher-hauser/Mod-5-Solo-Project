const { Spot } = require('./models');

async function addNewSpot(hostId, address, city, state, pricePerNight, bedrooms, beds, bathrooms, description, amenities) {
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
        amenities
    })
    return await Spot.findByPk(spot.id);
}

module.exports = {
    addNewSpot
}
