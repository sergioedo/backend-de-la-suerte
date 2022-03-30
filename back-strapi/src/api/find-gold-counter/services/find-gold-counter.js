'use strict';

/**
 * find-gold-counter service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::find-gold-counter.find-gold-counter');
