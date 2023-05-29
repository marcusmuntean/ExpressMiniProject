const express = require("express");
const router = express.Router();
const db = require("./firebase");

const {
  getDocs,
  collection,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} = require("firebase/firestore");

router.get("/info", async (req, res, next) => {
  const allDocData = [];
  const allDocId = [];
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "Posts"));
  docs.forEach((doc) => {
    allDocData.push(doc.data());
    allDocId.push(doc.id);
  });
  res.json({ result: allDocData, ids: allDocId });
});

router.post("/post", async (req, res, next) => {
  console.log(req.body);
  await addDoc(collection(db, "Posts"), req.body);
  res.send("Received");
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  await deleteDoc(doc(db, "Posts", id));
  res.send("Post deleted successfully");
});

router.put("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  await updateDoc(doc(db, "Posts", id), data);
  res.send("Post updated successfully");
});

module.exports = router;
