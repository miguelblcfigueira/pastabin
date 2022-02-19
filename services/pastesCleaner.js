const { Op } = require('sequelize');
const { Paste } = require('../models');

const CLEANING_PASTES_JOBS_INTERVAL = 1 * 60 * 1000;

let pastesCleanerJob;
exports.registerPastesCleanerJob = () => {
  if (pastesCleanerJob) {
    return;
  }
  pastesCleanerJob = setInterval(async () => {
    console.log('Running cleaner job...');
    const now = Date.now();
    await Paste.destroy({
      where: {
        expiresAt: {
          [Op.lt]: now,
        },
      },
    });
  }, CLEANING_PASTES_JOBS_INTERVAL);
};

exports.unregisterPastesCleanerJob = () => {
  clearInterval(pastesCleanerJob);
};
