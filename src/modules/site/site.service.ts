import { connectDatabase } from '../../database/manager';

export class SiteService {
  async getEditorialSite() {
    const knex = connectDatabase();

    const [profile, sections, skills, experience, recognition, talks, media] = await Promise.all([
      knex('site_profiles').whereNull('deleted_at').first(),
      knex('homepage_sections').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('skill_groups').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('experience_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('recognition_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('talk_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('media_assets').whereNull('deleted_at').orderBy('created_at', 'asc'),
    ]);

    return {
      profile,
      sections,
      skills,
      experience,
      recognition,
      talks,
      media,
    };
  }
}
