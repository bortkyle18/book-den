const { User } = require("../models")


const follow = async ({params}, res) => {
  try {
    // find user and update following array to include new user
    const followQuery = await User.findOneAndUpdate(
      params.userId,
      { $push: { following: params.followId } },
      { new: true })
      .select('-__v -password')
      .populate('library')
      .populate('wishlist')
      .populate('favorites')
      .populate('following', '-__v -password -_id -email -userPic -library -wishlist')
      .sort()
    res.status(200).json({ result: "success", payload: followQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to follow user' });
  }
}

const unFollow = async ({params}, res) => {
  try {
    // find user and update folowing array to unfollow user
    const unFollowQuery = await User.findOneAndUpdate(
      params.userId,
      { $pull: { following: params.followId } },
      { new: true })
      .select('-__v -password')
      .populate('library')
      .populate('wishlist')
      .populate('favorites')
      .populate('following', '-__v -password -_id -email -userPic -library -wishlist')
      .sort()
    res.status(200).json({ result: "success", payload: unFollowQuery });
  } catch(err) {
    res.status(400).json({ message: 'Unable to unfollow user' });
  }
}


module.exports = { 
  follow,
  unFollow
}