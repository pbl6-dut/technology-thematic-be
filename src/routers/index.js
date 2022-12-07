import express from 'express';
import logger from 'configs/winston.config';

import { usersRepository } from 'repositories';
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
router.use('/demo-sentry', (req, res) => {
  usersRepository.create({
    email: '24h@yopmail.com',
    password: 'Nhatlong2001@@',
    fullName: 'NhatLong',
  });
  res.send('demo-sentry');

  logger.info('demo-sentry');
});

router.use('/demo-elk', (req, res) => {
  res.send('demo-elk-ok');
  logger.info('demo-elk-ok');
});

export default router;
