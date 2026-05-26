import { connectDatabase } from '../../database/manager';
import {
  applyContentTranslations,
  loadContentTranslations,
  normalizeContentLocale,
} from '../../shared/utils/content-translation.util';

const entityTargets = (entityType: string, rows: Array<Record<string, unknown>>) =>
  rows.map((entity) => ({ entityType, entity }));

export class SiteService {
  async getEditorialSite(locale?: string) {
    const knex = connectDatabase();
    const normalizedLocale = normalizeContentLocale(locale);

    const [profile, sections, skills, experience, recognition, talks, media] = await Promise.all([
      knex('site_profiles').whereNull('deleted_at').first(),
      knex('homepage_sections').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('skill_groups').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('experience_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('recognition_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('talk_entries').whereNull('deleted_at').where({ is_active: true }).orderBy('sort_order', 'asc'),
      knex('media_assets').whereNull('deleted_at').orderBy('created_at', 'asc'),
    ]);

    const targets = [
      { entityType: 'site_profile', entity: profile },
      ...entityTargets('homepage_section', sections),
      ...entityTargets('skill_group', skills),
      ...entityTargets('experience_entry', experience),
      ...entityTargets('recognition_entry', recognition),
      ...entityTargets('talk_entry', talks),
      ...entityTargets('media_asset', media),
    ];
    const translations = await loadContentTranslations(knex, normalizedLocale, targets);

    return {
      locale: normalizedLocale,
      fallback_locale: 'en',
      profile: profile ? applyContentTranslations('site_profile', profile, translations) : null,
      sections: sections.map((section) => applyContentTranslations('homepage_section', section, translations)),
      skills: skills.map((skill) => applyContentTranslations('skill_group', skill, translations)),
      experience: experience.map((entry) => applyContentTranslations('experience_entry', entry, translations)),
      recognition: recognition.map((entry) => applyContentTranslations('recognition_entry', entry, translations)),
      talks: talks.map((entry) => applyContentTranslations('talk_entry', entry, translations)),
      media: media.map((asset) => applyContentTranslations('media_asset', asset, translations)),
    };
  }
}
