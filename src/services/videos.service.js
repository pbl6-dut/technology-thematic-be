import { VideosRepository } from 'repositories';
import { InstructorResponse } from 'commons/responses/auth';
import { json } from 'utils';
import { Sequelize } from 'sequelize';
import { errors } from 'constants';
import logger from 'configs/winston.config';
import BaseService from './base.service';

class VideosService extends BaseService {
  constructor(repo) {
    super(repo);
  }

  /**
   * Get infor of instructor was uploaded video
   * @param {uuid} videoId is id of video, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {object} is object of instructor
   */
  async getInstructorUploadVideo(videoId) {
    try {
      const data = await this.repo.findOneByCondition({ id: videoId }, false, {
        association: 'user',
      });

      const { user } = json(data);

      return new InstructorResponse(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Count total view of video
   * @param {uuid} videoId is id of video, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {number} is number view of video
   */
  async countViewOfVideo(videoId) {
    try {
      const data = await this.repo.findOneByCondition(
        { id: videoId },
        false,
        {
          association: 'videoViews',
          attributes: [],
        },
        [
          [
            Sequelize.fn('SUM', Sequelize.col('videoViews.countView')),
            'totalView',
          ],
        ],
        ['Video.id']
      );

      const { totalView } = json(data);
      return totalView;
    } catch (error) {
      logger.error(`${errors.ERR_WHILE_COUNT_VIEW_OF_VIDEO} - ${error}`);

      throw new Error(error);
    }
  }

  /**
   * Count total comment of video
   * @param {uuid} videoId is id of video, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {number} is number comment of video
   */
  async countCommentOfVideo(videoId) {
    try {
      const data = await this.repo.count({ id: videoId }, !false, {
        association: 'videoComments',
      });

      return data;
    } catch (error) {
      logger.error(`${errors.ERR_WHILE_COUNT_COMMENT_OF_VIDEO} - ${error}`);

      throw new Error(error);
    }
  }

  /**
   * Count total like of video
   * @param {uuid} videoId is id of video, e.g, "92599851-3c92-4d37-b194-977a6d5223fe"
   * @returns {number} is number like of video
   */
  async countLikeOfVideo(videoId) {
    try {
      const data = await this.repo.count({ id: videoId }, !false, {
        association: 'emotionReacts',
        where: {
          isLike: true,
        },
      });

      return data;
    } catch (error) {
      logger.error(`${errors.ERR_WHILE_COUNT_LIKE_OF_VIDEO} - ${error}`);

      throw new Error(error);
    }
  }
}

export default new VideosService(VideosRepository);
