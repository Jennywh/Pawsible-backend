require("dotenv").config();
const admin = require("firebase-admin");
const db = admin.firestore();

async function addPawsToUserProfile(uid, pawsToAdd) {
  try {
    const userRef = db.collection("userProfiles").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.error("User does not exist.");
      throw new Error("User not found");
    }

    const currentPaws = doc.data().paws || process.env.INITIAL_PAWS;
    await userRef.update({
      paws: currentPaws + pawsToAdd,
    });

    console.log(`Added ${pawsToAdd} paws to uid: ${uid}`);
  } catch (error) {
    console.error("Error adding paws to user profile:", error);
    throw error;
  }
}

async function removePawsFromUserProfile(uid, pawsToRemove) {
  try {
    const userRef = db.collection("userProfiles").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.error("User does not exist.");
      throw new Error("User not found");
    }

    const currentPaws = doc.data().paws || process.env.INITIAL_PAWS;
    if (currentPaws < pawsToRemove) {
      console.error(
        "Attempted to remove more paws than the user has. Operation not permitted."
      );
      throw new Error("Insufficient paws. Cannot have a negative balance.");
    }
    await userRef.update({
      paws: currentPaws - pawsToRemove,
    });

    console.log(`Added ${pawsToAdd} paws to uid: ${uid}`);
  } catch (error) {
    console.error("Error removing paws from user profile:", error);
    throw error;
  }
}

async function createOrUpdateUserProfile(uid, updates) {
  try {
    const userRef = db.collection("userProfiles").doc(uid);
    const doc = await userRef.get();

    // Check if the updates include the 'paws' field
    if (updates.hasOwnProperty("paws")) {
      console.error("Unauthorized field update attempted: paws");
      throw new Error(
        "Updating 'paws' with updateUserProfile function is not allowed."
      );
    }

    if (!doc.exists) {
      await userRef.set(profileUpdates);
      console.log(`User profile created for uid: ${uid}`);
    } else {
      await userRef.update(profileUpdates);
      console.log(`User profile updated for uid: ${uid}`);
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

module.exports = {
  addPawsToUserProfile,
  removePawsFromUserProfile,
  createOrUpdateUserProfile,
};
