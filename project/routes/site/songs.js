const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Song = require("../../models/Song");
const auth = require("../../middlewares/isAuthenticated");
const admin = require("../../middlewares/isAdmin.js");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/api", function(req,res){    
  res.render("api");
});

router.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { singer: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get("/addsongs",admin, function(req,res){
  res.render("./songs/new");
});

router.get("/", async (req, res) => {
  try {
    
    const latestSongs = await Song.find()
      .sort({ releaseDate: -1 }) 
      .limit(16); 
      res.render('landingpage', { latestSongs: latestSongs }); 
  } catch (error) {
    console.error("Error fetching latest songs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addsongs", async (req, res) => {

    try {
        let { title, singer, album, genre, releaseDate, lyrics, cover, ytlink } = req.body;
        title = title.trim();
        singer = singer.trim();
        album = album.trim();
        genre = genre.trim();
        releaseDate = releaseDate.trim();
        lyrics = lyrics.trim();
        cover = cover.trim();
        ytlink = ytlink.trim();
        let song = await Song.create({ title, singer, album, genre, releaseDate, lyrics, cover, ytlink });
        
      return res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while adding the song.");
    }
});

router.get("/songs/:id/lyrics", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.render("lyrics", { song: song });
  } catch (error) {
    console.error("Error fetching song lyrics:", error);
    res.status(500).send("Internal Server Error");
  }
});



router.get("/contact-us", auth, function(req,res){
  res.render("contactus.ejs");
});

router.get("/songs/:id/delete",admin,async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  return res.redirect("/songs");
});

router.get("/songs/:id/edit", admin, async (req, res) => {
  let song = await Song.findById(req.params.id);
  return res.render("./songs/edit", { song });
});

router.post("/songs/:id/edit", async (req, res) => {
  try {
    const { title, singer, album, genre, releaseDate, lyrics, cover, ytlink } = req.body;
    await Song.findByIdAndUpdate(req.params.id, {
      title,
      singer,
      album,
      genre,
      releaseDate,
      lyrics,
      cover,
      ytlink,
    });
    res.redirect(`/songs/${req.params.id}/lyrics`);
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/songs", async (req, res) => {
  try {
    const { genre, page = 1 } = req.query;
    const pageSize = 12;

    let genreName = {};
    if (genre) {
      genreName.genre = genre;
    }

    const songs = await Song.find(genreName)
      .sort({ title: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Song.countDocuments(genreName);
    const totalPages = Math.ceil(total / pageSize);

    const genres = await Song.distinct('genre');

    res.render("allsongs", {
      songs,
      total,
      page: Number(page),
      pageSize,
      totalPages,
      genres,
      selectedGenre: genre || ''
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;