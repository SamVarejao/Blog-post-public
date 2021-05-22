const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("./models/User");
const Post = require("./models/Post");
//GET AUTHOR AVATAR-----------------------------------------
router.get("/authAvatar/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      return res.status(200).send(user.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
});

//REGISTER-----------------------------------------------------------------
router.post("/register", (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  let message = [];

  //Check for conditions-------------------------------------
  if (!name || !email || !password || !password2) {
    message.push(" All fields must be filled");
  }
  if (password != password2) {
    message.push(" Passwords must match");
  }
  if (password2.length <= 6) {
    message.push(" Password must be longer");
  }
  if (message.length > 0) {
    return res.status(400).send([message]);
  } else {
    // If contidions check out-------------------------------
    User.findOne({ email: email }) // {mongoUserschema: email(req.body.email)}
      .then((user) => {
        if (user) {
          message.push(" Email already in use");

          return res.status(400).send([message]);
        } else {
          const newUser = new User({
            name,
            password,
            email,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
              newUser.password = hash;
              newUser
                .save()
                .then(() => console.log("Register successful"))
                .catch((errors) => {
                  console.error(errors);
                });
            });
          });
        }

        return res.status(201).send("Welcome !");
      })
      .catch((errors) => {
        console.error(errors);
        return res.status(400).send();
      });
  }
});

//LOGIN-----------------------------------------------------------------
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send(["Cannot log in", info]);
    }
    req.login(user, (err) => {
      console.log(req.user.name);
      return res.send("Login successful");
    });
  })(req, res, next);
});

//LOGOUT-----------------------------------------------------------------
router.get("/logout", (req, res) => {
  req.logout();

  console.log("Logout successful");

  return res.status(200).send();
});

//GET USER DATA-----------------------------------------------------------------
router.get("/user", (req, res) => {
  let email = req.user.email;
  let nameIndex = email.indexOf("@");
  let tag = email.slice(0, nameIndex);
  let user = {
    name: req.user.name,
    nameTag: tag,
    id: req.user._id,
    avatar: req.user.avatar,
  };

  return res.send({ user: user });
});

// SAFEGUARD -------------------------------------------
router.get("/safeguard", (req, res) => {
  if (req.user != undefined) {
    return res.send({ login: true });
  } else {
    return res.send({ login: false });
  }
});

//CHANGE AVATAR-----------------------------------------------------------------
router.post("/avatar", (req, res) => {
  const newAvatar = req.body.newAvatar;
  const user = req.user._id;

  User.findOneAndUpdate({ _id: user }, { $set: { avatar: newAvatar } })
    .then(() => {
      return res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET POSTS-----------------------------------------------------------------
router.get("/posts", (req, res) => {
  let filter = {};

  if (req.query.search != undefined) {
    filter = { $text: { $search: req.query.search } }; //{ $text : { $search : req.query.search}} { title: req.query.search }
  }

  Post.find(filter)
    .then((posts) => {
      return res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET SPECIFIC POST-----------------------------------------------------------------
router.get("/posts/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((posts) => {
      //this will check if the user has already liked the post to set the "like" button´s initial value
      const pointFound = req.user.pointList.find((id) => id === req.params.id);
      if (pointFound != undefined) {
        return res.status(200).send({ posts, hasPoint: true });
      } else {
        return res.status(200).send({ posts, hasPoint: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET USER SPECIFIC POSTS-----------------------------------------------------------------
router.get("/myposts", (req, res) => {
  const currentUser = req.user._id;

  Post.find({ authorID: currentUser })
    .then((posts) => {
      return res.status(200).send(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

//CREATE POST-----------------------------------------------------------------
router.post("/posts", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.user.name;
  const authorID = req.user._id;
  const rawDate = new Date();
  const date = rawDate.toDateString();

  const newPost = new Post({
    content,
    author,
    authorID,
    title,
    date,
  });
  newPost
    .save()
    .then(() => {
      return res.status(201).send("Post Created");
    })
    .catch((errors) => {
      console.error(errors);
      return res.status(400).send();
    });
});

//DELETE POST-----------------------------------------------------------------
router.delete("/posts/:id", (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id, authorID: req.user._id }).exec();
  console.log("Post deleted");
  return res.status(200).send();
});

//ADD POINTS TO POST----------------------------------------------------------
router.post("/posts/:id", (req, res) => {
  const currentUser = req.user._id;

  User.findOne({ _id: currentUser, pointList: req.params.id }).then((query) => {
    // will try to find if logged user has already liked
    if (query) {
      //the post by searching pointList which contains the id of liked posts
      // if it does then it will assume the user is trying to remove his like

      const downPoint = req.body.data - 1;

      User.findByIdAndUpdate(currentUser, {
        // removes the current post id from the user´s pointList
        $pull: { pointList: req.params.id },
      }).exec();

      Post.findByIdAndUpdate(req.params.id, { points: downPoint }).exec();
      return res.status(200).send({ points: downPoint }); // returns new value for Vue to update the DOM
    } else {
      const upPoint = req.body.data + 1;
      User.findByIdAndUpdate(currentUser, {
        $push: { pointList: req.params.id },
      }).exec();

      Post.findByIdAndUpdate(req.params.id, { points: upPoint }).exec();
      return res.status(200).send({ points: upPoint });
    }
  });
});
module.exports = router;
