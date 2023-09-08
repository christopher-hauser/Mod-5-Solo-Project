const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const csrfToken = req.csrfToken();
        return res.json(csrfToken);
    })
)

module.exports = router;
