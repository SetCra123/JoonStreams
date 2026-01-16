const router = require('express').Router();
const videoRoutes = require('./videoRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

router.use('/videos', videoRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);




module.exports = router; 