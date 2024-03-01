const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../handler/profileHandler');

router.post('/:userId', async (req, res) => {
  try {
    const doc = await db.collection('userProfile').doc(userId).get();
    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userProfile = req.body;
  try {
    await db.collection('userProfile').doc(userId).set(userProfile, { merge: true });
    res.status(200).send('Profile updated successfully');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await db.collection('userProfile').doc(userId).delete();
    res.status(200).send('Profile deleted successfully');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
