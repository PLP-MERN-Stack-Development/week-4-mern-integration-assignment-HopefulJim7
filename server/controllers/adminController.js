exports.getDashboardStats = async (req, res) => {
  // Placeholder for actual stats
  const stats = {
    users: await User.countDocuments(),
    posts: await Post.countDocuments(),
  };

  res.json({ stats });
};

exports.listUsers = async (req, res) => {
  const users = await User.find({}, 'username email role');
  res.json({ users });
};