import type { Knex } from 'knex';

export const DEFAULT_CONTENT_LOCALE = 'en';
export const SUPPORTED_CONTENT_LOCALES = ['en', 'zh', 'ar', 'es'] as const;

type TranslationRow = {
  entity_type: string;
  entity_id: string;
  field_key: string;
  value_text: string | null;
  value_json: unknown | null;
};

type TranslatableEntity = {
  id?: string;
  metadata?: Record<string, unknown> | null;
  [key: string]: unknown;
};

type TranslationTarget = {
  entityType: string;
  entity: TranslatableEntity | null | undefined;
};

export function normalizeContentLocale(locale: unknown) {
  const candidate = typeof locale === 'string' ? locale.toLowerCase().split('-')[0] : DEFAULT_CONTENT_LOCALE;
  return SUPPORTED_CONTENT_LOCALES.includes(candidate as (typeof SUPPORTED_CONTENT_LOCALES)[number])
    ? candidate
    : DEFAULT_CONTENT_LOCALE;
}

export async function loadContentTranslations(
  knex: Knex,
  locale: string,
  targets: TranslationTarget[],
) {
  const normalizedLocale = normalizeContentLocale(locale);
  if (normalizedLocale === DEFAULT_CONTENT_LOCALE) return [];

  const ids = targets
    .map((target) => target.entity?.id)
    .filter((id): id is string => Boolean(id));

  if (ids.length === 0) return [];

  return knex('content_translations')
    .select('entity_type', 'entity_id', 'field_key', 'value_text', 'value_json')
    .whereNull('deleted_at')
    .where({ locale: normalizedLocale })
    .whereIn('entity_id', ids);
}

export function applyContentTranslations<T extends TranslatableEntity>(
  entityType: string,
  entity: T,
  translations: TranslationRow[],
) {
  if (!entity.id) return entity;

  const translated = { ...entity };
  const matching = translations.filter(
    (translation) => translation.entity_type === entityType && translation.entity_id === entity.id,
  );

  for (const translation of matching) {
    const value = translation.value_json ?? translation.value_text;
    if (value === null || value === undefined) continue;
    setTranslatedField(translated, translation.field_key, value);
  }

  return translated;
}

function setTranslatedField(entity: TranslatableEntity, fieldKey: string, value: unknown) {
  const [root, ...path] = fieldKey.split('.');
  if (path.length === 0) {
    entity[root] = value;
    return;
  }

  if (!entity[root] || typeof entity[root] !== 'object' || Array.isArray(entity[root])) {
    entity[root] = {};
  } else {
    entity[root] = { ...(entity[root] as Record<string, unknown>) };
  }

  let cursor = entity[root] as Record<string, unknown>;
  for (const part of path.slice(0, -1)) {
    if (!cursor[part] || typeof cursor[part] !== 'object' || Array.isArray(cursor[part])) {
      cursor[part] = {};
    } else {
      cursor[part] = { ...(cursor[part] as Record<string, unknown>) };
    }
    cursor = cursor[part] as Record<string, unknown>;
  }

  cursor[path[path.length - 1]] = value;
}
