require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebaseAdminSDK.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const server = express();
server.use(express.json());

const profileRoutes = require('./routes/profileRoutes');
server.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
