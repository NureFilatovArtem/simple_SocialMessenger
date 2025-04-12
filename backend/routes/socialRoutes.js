
const fs = require("fs");
const path = require("path");

const express = require("express");
const router = express.Router(); // ← саме цей, НЕ сторонній router!

const friendsPath = path.join(__dirname, "../models/friends.json");
const usersPath = path.join(__dirname, "../models/users.json");
const postsPath = path.join(__dirname, "../models/posts.json");
const messagesPath = path.join(__dirname, "../models/messages.json");


// GET all users
router.get("/users", (req, res) => {
  const data = fs.readFileSync(usersPath);
  res.json(JSON.parse(data));
});

// GET all posts
router.get("/posts", (req, res) => {
  const data = fs.readFileSync(postsPath);
  res.json(JSON.parse(data));
});

// GET posts by user ID
router.get("/posts/user/:userId", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath));
  const userPosts = posts.filter((post) => post.userId == req.params.userId);
  res.json(userPosts);
});

//CREATE POSTS 

router.post("/posts", (req, res) => {
    const posts = JSON.parse(fs.readFileSync(postsPath));
    const newPost = {
      id: posts.length + 1,
      userId: req.body.userId,
      content: req.body.content,
    };
  
    posts.unshift(newPost);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    res.status(201).json(newPost);
  });


  // DELETE /api/posts/:postId
  router.delete("/posts/:postId", (req, res) => {
    const postId = parseInt(req.params.postId);
    const posts = JSON.parse(fs.readFileSync(postsPath));
  
    const newPosts = posts.filter((post) => post.id !== postId);
  
    fs.writeFileSync(postsPath, JSON.stringify(newPosts, null, 2));
  
    res.json({ message: "Post deleted", postId });
  });


  const commentsPath = path.join(__dirname, "../models/comments.json");

  // GET comments by postId
  router.get("/comments/:postId", (req, res) => {
    const postId = parseInt(req.params.postId);
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    const filtered = comments.filter((c) => c.postId === postId);
    res.json(filtered);
  });
  
  // POST a new comment
  router.post("/comments/:postId", (req, res) => {
    const postId = parseInt(req.params.postId);
    const comments = JSON.parse(fs.readFileSync(commentsPath));
  
    const newComment = {
      id: comments.length + 1,
      postId,
      userId: req.body.userId,
      content: req.body.content
    };
  
    comments.push(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
    res.status(201).json(newComment);
  });

// GET friends of a user
router.get("/friends/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const data = JSON.parse(fs.readFileSync(friendsPath));
    const user = data.find((entry) => entry.userId === userId);
    res.json(user ? user.friends : []);
  });
  
  // POST — Add a friend
  router.post("/friends/:targetId", (req, res) => {
    const currentUserId = req.body.userId;
    const targetId = parseInt(req.params.targetId);
    const data = JSON.parse(fs.readFileSync(friendsPath));
  
    const ensureEntry = (uid) => {
      let entry = data.find((e) => e.userId === uid);
      if (!entry) {
        entry = { userId: uid, friends: [] };
        data.push(entry);
      }
      return entry;
    };
  
    const current = ensureEntry(currentUserId);
    const target = ensureEntry(targetId);
  
    if (!current.friends.includes(targetId)) current.friends.push(targetId);
    if (!target.friends.includes(currentUserId)) target.friends.push(currentUserId);
  
    fs.writeFileSync(friendsPath, JSON.stringify(data, null, 2));
    res.json({ message: "Friend added" });
  });

// delete a friend

  router.delete("/friends/:targetId", (req, res) => {
    const currentUserId = req.body.userId;
    const targetId = parseInt(req.params.targetId);
    const data = JSON.parse(fs.readFileSync(friendsPath));
  
    const removeFriend = (uid, fid) => {
      const entry = data.find((e) => e.userId === uid);
      if (entry) {
        entry.friends = entry.friends.filter((id) => id !== fid);
      }
    };
  
    removeFriend(currentUserId, targetId);
    removeFriend(targetId, currentUserId);
  
    fs.writeFileSync(friendsPath, JSON.stringify(data, null, 2));
    res.json({ message: "Friend removed" });
  });
  
// chat functionality

router.get("/messages/:user1/:user2", (req, res) => {
    const user1 = parseInt(req.params.user1);
    const user2 = parseInt(req.params.user2);
    const messages = JSON.parse(fs.readFileSync(messagesPath));
  
    const chat = messages.filter(
      (msg) =>
        (msg.from === user1 && msg.to === user2) ||
        (msg.from === user2 && msg.to === user1)
    );
  
    res.json(chat);
  });

  router.post("/messages", (req, res) => {
    const messages = JSON.parse(fs.readFileSync(messagesPath));
  
    const newMessage = {
      id: messages.length + 1,
      from: req.body.from,
      to: req.body.to,
      content: req.body.content,
      timestamp: new Date().toISOString()
    };
  
    messages.push(newMessage);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
    res.status(201).json(newMessage);
  });
  
  router.get("/messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../models/messages.json")));
    res.json(data);
  });


module.exports = router;
