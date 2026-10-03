const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
//following functionality
async function followUserController(req, res) {
  //req.user contains the valid of decoded
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  //is the followee exist
  const ifFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });
  if (!ifFolloweeExist) {
    return res.status(404).json({
      message: "User you are trying to follow doesn't exist.",
    });
  }
  //user cannot follow itself
  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself.",
    });
  }

  //cannot follow multiple time
  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following this user ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  //extract the follower and followee username
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    //find mongo model and returns the field
    follower: followerUsername,
    followee: followeeUsername,
  });
  //if not following
  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  //now delete it
  await followModel.findOneAndDelete(isUserFollowing._id);

  return res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
}

async function updateFollowStatus(req, res) {
  //extract
  const { requestId, status } = req.params;

  //validate the status
  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }
  //now find the follow request
  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request is not found",
    });
  }

  //validate the followee
  if (followRequest.followee !== req.user.username) {
    return res.status(403).json({
      msg: "You are not allowed to update this request",
    });
  }

  followRequest.status = status;
  await followRequest.save();

  return res.status(200).json({
    message: `Follow request ${status}`,
  });
}
module.exports = {
  followUserController,
  unfollowUserController,
  updateFollowStatus,
};
