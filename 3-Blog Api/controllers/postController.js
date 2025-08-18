import Post from '../models/Post.js';

//Create  a  Post
export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    // Create the post linked to the user
    const post = await Post.create({
      title,
      content,
      user: req.userId
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get All Post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Get Single post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not Found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Update a post (only by owner)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post Not Found!!' });
    if (post.user.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    post.title = req.body.title;
    post.content = req.body.content || post.content;

    const updatePost = await post.save();
    res.json(updatePost);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Delete a post (only by the owner)
export const deletepost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post Not Found!!' });
    if (post.user.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    await post.deleteOne();

    res.json({ message: "post deleted successfully!!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
