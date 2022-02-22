'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [{
      userId: 1,
      spotId: 1,
      image: "https://sdg-migration-id.s3.amazonaws.com/Interior-design-NKBA-kitchen-trendsImage_1-1.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      spotId: 1,
      image: "https://www.thespruce.com/thmb/rmDEwUoAgwucuusBRvFoE4JBc0o=/4000x2250/smart/filters:no_upscale()/master-bedroom-in-new-luxury-home-with-chandelier-and-large-bank-of-windows-with-view-of-trees-1222623844-212940f4f89e4b69b6ce56fd968e9351.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      spotId: 1,
      image: "https://www.thespruce.com/thmb/hLQnbMaAaKKUIynSaM19RK8Qy_0=/2048x1365/filters:fill(auto,1)/modern-living-room-design-ideas-4126797-hero-a2fd3412abc640bc8108ee6c16bf71ce.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 2,
      image: "https://www.mymove.com/wp-content/uploads/2019/10/Small-bedroom-hero_Demkat_Shutterstock.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 2,
      image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/6/21/2/DOTY2019_Breeze-GIannasio_Guest-Retreat_007.jpg.rend.hgtvcom.966.644.suffix/1561144345646.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 3,
      image: "https://azbigmedia.com/wp-content/uploads/2019/01/tile.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 3,
      image: "https://st.hzcdn.com/simgs/pictures/living-rooms/top-homes-in-arizona-by-fratantoni-design-fratantoni-design-architecture-and-interior-design-img~c8c194700b03442c_9-3492-1-c1ea1e9.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 3,
      image: "https://images.squarespace-cdn.com/content/v1/5c4bcfffaa49a11b1eaa7622/1592435194306-ETJOW8EB7NX2JMXPKD5V/theolliescottsdale-shorte-term-rental-scottsdale-arizona-bedroom-master-3.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 4,
      image: "https://studio-mcgee.com/app/uploads/2019/08/studiomcgee_SMRanchHouse_094.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 4,
      image: "https://st.hzcdn.com/simgs/pictures/living-rooms/western-homestead-ranch-living-room-lynne-barton-bier-home-on-the-range-interiors-img~5221ab540e950e5c_14-6960-1-a5b056b.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 4,
      image: "https://st.hzcdn.com/simgs/pictures/kitchens/western-homestead-ranch-kitchen-lynne-barton-bier-home-on-the-range-interiors-img~20817c980e951263_4-7875-1-0f0d2d1.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 5,
      image: "https://st.hzcdn.com/simages/23862253_0_4-0000-home-design.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 6,
      image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2016/9/8/1/HTILU109H_221050_782818.1323198.jpg.rend.hgtvcom.966.725.suffix/1473382197416.jpeg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 6,
      image: "https://assets.epicurious.com/photos/5b3bbbd7eb4478184f827919/5:4/w_2084,h_1667,c_limit/4371+W+Old+Hickory+Blvd-print-110-146-039+Alpha+Final-4200x2804-300dpi.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      spotId: 7,
      image: "https://www.thespruce.com/thmb/CbCVYyHZPdm948Sm5I_gVx3Vkrk=/1080x606/filters:no_upscale():max_bytes(150000):strip_icc()/nelsontreehouse_61234597_824768181211870_8550137160998732658_n-4f3830a3764240b09ea758c53d95a18b.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      spotId: 7,
      image: "https://latteluxurynews.com/wp-content/uploads/2020/01/Ngala-treehouse-entrance-kitchen-750x430.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      spotId: 7,
      image: "https://skamaniacoves.com/wp-content/uploads/2019/02/th3.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 8,
      image: "https://static.onecms.io/wp-content/uploads/sites/28/2020/01/hawaii-airbnb-treehouse-hot-tub-VTREE0120.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 8,
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F01%2F29%2Fairbnb-treehouse-kailua-kona-hawaii-HAWAIIWISH0121.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      spotId: 8,
      image: "https://st.hzcdn.com/simgs/pictures/kitchens/punta-sayulita-treehouse-de-reus-architects-img~db710aba0750cdc7_4-4174-1-b7cd424.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
