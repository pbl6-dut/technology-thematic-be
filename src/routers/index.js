import express from 'express';
import logger from 'configs/winston.config';

import users from './users.routes';
import auth from './auth.routes';
import categoryTopics from './categoryTopics.routes';
import courses from './courses.routes';
import sections from './section.routes';
import upload from './upload.routes';
import video from './videos.routes';
import hashtags from './hashtags.routes';

const router = express.Router();

router.use('/', auth);
router.use('/users', users);
router.use('/category-topics', categoryTopics);
router.use('/courses', courses);
router.use('/sections', sections);
router.use('/upload', upload);
router.use('/videos', video);
router.use('/hashtags', hashtags);
router.use('/demo', (req, res) => {
  res.send('ngon');
  logger.info('ngon luon');
});

export default router;
