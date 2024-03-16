import Car from '../models/CarSchema';
import User from '../models/UserSchema';
import Comment from '../models/CommentSchema';

class CommentController {
  static async postComment(req, res) {
    try {
      const user = await User.findById(req.userId);

      if (!user || user.role !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { carId } = req.body;

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).json({ error: 'No car found' });
      }

      req.body.userId = user.id;
      const comment = new Comment(req.body);
      await comment.save();

      const rate = await Comment.aggregate([
        {
          $match: { carId: car._id },
        },
        { $group: { _id: '$carId', averageRate: { $avg: '$rate' } } },
      ]);

      car.averageRate = rate[0].averageRate;

      await car.save();
      const { _id, ...rest } = comment._doc;
      res.status(201).json({ id: _id, ...rest });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  static async getComments(req, res) {
    try {
      const { carId, page } = req.params;

      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'No car was found' });
      }
      const comments = await Comment.aggregate([
        {
          $match: { carId: car._id },
        },
        {
          $skip: (page || 0) * 20,
        },
        {
          $limit: 20,
        },
      ]);
      const newComments = comments.map((comment) => {
        const { _id, ...rest } = comment;
        return { id: _id, ...rest };
      });
      return res.json(newComments);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const user = await User.findById(req.userId);

      if (!user || user.role !== 'user') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const comment = await Comment.findOne({
        _id: commentId,
        userId: user._id,
      });

      if (!comment) {
        return res.status(404).json({ error: 'Not found' });
      }
      await Comment.findByIdAndDelete(comment._id);

      const rate = await Comment.aggregate([
        {
          $match: { carId: comment.carId },
        },
        { $group: { _id: '$carId', averageRate: { $avg: '$rate' } } },
      ]);

      const { averageRate } = rate[0];
      await Car.findByIdAndUpdate(comment.carId, { averageRate });

      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}

export default CommentController;
