'use strict';

/**
 * emoji service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::emoji.emoji');
