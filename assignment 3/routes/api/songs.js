let express = require("express");
let router = express.Router();
let Song = require("../../models/Song");
router.get("/api/songs/:id", async (req, res) => {
  let song = await Song.findById(req.params.id);
  return res.send(song);
});
router.put("/api/songs/:id", async (req, res) => {
  let song = await Song.findById(req.params.id);
  song.title = req.body.title;
  song.type = req.body.type;
  song.genre = req.body.genre;
  await song.save();
  return res.send(song);
});
router.delete("/api/songs/:id", async (req, res) => {
  let song = await Song.findByIdAndDelete(req.params.id);
  return res.send(song);
});

router.post("/api/songs", async (req, res) => {
  let data = req.body;
  let record = new Song(data);
  await record.save();
  return res.send(record);
});
router.get("/api/songs", async function (req, res) {
  let songs = await Song.find();
  return res.json(songs);
});

module.exports = router;