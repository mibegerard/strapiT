/**
 *  comment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({

  async create(ctx) {
    const { data } = ctx.request.body;

    if (!data.content || data.content.trim() === '') {
      return ctx.badRequest('Content is required');
    }

    if (!data.article) {
      return ctx.badRequest('Article ID is required');
    }

    const article = await strapi.entityService.findOne('api::article.article', data.article);
    if (!article) {
      return ctx.notFound('Article not found');
    }

    const response = await super.create(ctx);
    return response;
  },

  async find(ctx) {
    const { articleId } = ctx.query;

    if (articleId) {
      ctx.query.filters = {
        ...(typeof ctx.query.filters === 'object' && ctx.query.filters ? ctx.query.filters : {}),
        article: articleId,
      };
    }

    const response = await super.find(ctx);
    return response;
  },
}));