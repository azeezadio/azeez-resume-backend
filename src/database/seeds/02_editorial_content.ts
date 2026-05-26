import { Knex } from 'knex';
import { readFileSync } from 'fs';
import path from 'path';

const asJson = (value: unknown) => JSON.stringify(value);
const articleBody = (fileName: string) =>
  readFileSync(path.join(__dirname, 'content', fileName), 'utf8').trim();
const encodeStorageKey = (value: string) => value.split('/').map(encodeURIComponent).join('/');

const publicUrlFor = (bucketName: string, storageKey: string) => {
  const endpoint = process.env.ENDPOINT ?? process.env.S3_ENDPOINT;
  if (!endpoint) return null;

  const normalizedEndpoint = endpoint.replace(/\/$/, '');
  const forcePathStyle = (process.env.S3_FORCE_PATH_STYLE ?? 'false') === 'true';
  if (forcePathStyle) {
    return `${normalizedEndpoint}/${bucketName}/${encodeStorageKey(storageKey)}`;
  }

  const url = new URL(normalizedEndpoint);
  return `${url.protocol}//${bucketName}.${url.host}/${encodeStorageKey(storageKey)}`;
};

const mediaAssets = [
  ['images/portrait.jpg', 'portrait.jpg', 'image/jpeg', 'Adio Azeez Adeniran, photographed in Lagos, 2026.', 'Homepage portrait.'],
  ['images/portrait 2.jpg', 'portrait 2.jpg', 'image/jpeg', 'Adio Azeez Adeniran portrait alternate.', 'Alternate homepage portrait.'],
  ['images/termii-retreat.jpeg', 'termii-retreat.jpeg', 'image/jpeg', 'Termii Engineering Retreat.', 'Talk media.'],
  ['images/staff-of-the-year.jpeg', 'staff-of-the-year.jpeg', 'image/jpeg', 'Staff of the Year award.', 'Recognition media.'],
  ['images/dev-hangout.jpeg', 'dev-hangout.jpeg', 'image/jpeg', 'Dev Hangout event artwork.', 'Talk media.'],
  ['images/huawei-feature.png', 'huawei-feature.png', 'image/png', 'Huawei Cloud feature.', 'Press media.'],
  ['images/patronize-staff-of-year.png', 'patronize-staff-of-year.png', 'image/png', 'Patronize Staff of the Year award.', 'Recognition media.'],
  ['images/cross-dept-award.png', 'cross-dept-award.png', 'image/png', 'Cross-departmental collaboration award.', 'Recognition media.'],
  ['images/design-spinoff.jpeg', 'design-spinoff.jpeg', 'image/jpeg', 'Design Spin-off 2025.', 'Talk media.'],
  ['images/motion-sickness.jpg', 'motion-sickness.jpg', 'image/jpeg', 'Panoramic iridescent technology scene with satellites, neural diagrams, Lagos map details, and chrome human figures.', 'Motion Sickness panoramic cover artwork.'],
  ['documents/Adio_Azeez_Adeniran_Resume.pdf', 'Adio_Azeez_Adeniran_Resume.pdf', 'application/pdf', 'Adio Azeez Adeniran resume PDF.', 'Resume document.'],
] as const;

const sections = [
  {
    key: 'hero',
    chapter: null,
    title: 'Adio Azeez Adeniran.',
    subtitle: 'Issue No. 01 · Engineering · Lagos, 2026',
    body: 'Engineering leader scaling 7+ products across application and infrastructure at PiggyTech. Principal Solutions Architect. Engineering Partner at LiveLabs.',
    sort_order: 10,
    metadata: {
      location: 'Lagos Island, Lagos State, Nigeria',
      strengths: ['Scaling', 'Architecting', 'Leading', 'Mentoring'],
    },
  },
  {
    key: 'about',
    chapter: 'Chapter 01',
    title: 'On Engineering & Influence.',
    subtitle: null,
    body: [
      "Adio leads engineering at PiggyTech, the umbrella behind Nigeria's most-loved savings brand and a portfolio of fintech products.",
      'His role spans seven products across application and infrastructure, with principal solutions architecture as the connective tissue.',
      'He has spent the last decade moving between backend systems, mobile, and platform - first at Stanbic IBTC, then Ebidhaa, Patronize, Africa Fintech Limited (UK), and now PiggyTech.',
      'Outside of work, he advises early-stage startups as Engineering Partner at LiveLabs, speaks at engineering forums across Africa, and mentors emerging engineering leaders.',
    ].join('\n\n'),
    sort_order: 20,
    metadata: {
      pullQuote: 'Engineering leadership is about scale - of systems, of teams, and of the decisions that quietly compound.',
      stats: [
        { value: 10, suffix: '+', label: 'Years building', sub: 'Engineering since 2015' },
        { value: 7, suffix: '+', label: 'Products scaled', sub: 'Application & infrastructure' },
        { value: 6, suffix: '', label: 'Awards earned', sub: 'Industry & academic' },
        { value: 5, suffix: '+', label: 'Talks & features', sub: 'Across Africa & beyond' },
      ],
    },
  },
  { key: 'skills', chapter: 'Chapter 02', title: 'Field & Tools.', subtitle: null, body: null, sort_order: 30, metadata: {} },
  { key: 'experience', chapter: 'Chapter 03', title: "Where I've Been.", subtitle: null, body: null, sort_order: 40, metadata: {} },
  { key: 'recognition', chapter: 'Chapter 04', title: 'Recognition.', subtitle: null, body: null, sort_order: 50, metadata: {} },
  { key: 'talks', chapter: 'Chapter 05', title: 'Talks & Press.', subtitle: null, body: null, sort_order: 60, metadata: {} },
  { key: 'contact', chapter: 'Coda', title: "Let's make something.", subtitle: null, body: null, sort_order: 70, metadata: {} },
];

const skills = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Golang', 'Kotlin'], sort_order: 10 },
  { label: 'Architecture', items: ['Microservices', 'API Design', 'gRPC', 'Systems Design', 'Database Design'], sort_order: 20 },
  { label: 'Cloud & DevOps', items: ['GCP', 'Firebase', 'AWS', 'Heroku', 'CI/CD'], sort_order: 30 },
  { label: 'Mobile & Frame', items: ['React Native', 'Native Android', 'Node.js', 'Restana'], sort_order: 40 },
  { label: 'Leadership', items: ['Agile', 'Team Leadership', 'Cross-functional', 'Talent Development'], sort_order: 50 },
];

const experiences = [
  ['2024-', 'Group Engineering Manager', 'PiggyTech', 'Scaling 7+ products across application and infrastructure. Principal Solutions Architect.', 2024, null],
  ['2024', 'Engineering Partner', 'LiveLabs', 'Advising portfolio startups on technical strategy and architecture.', 2024, 2024],
  ['2024', 'Engineering Lead - Special Products', 'PiggyTech', 'System upgrades, engineering guidelines, backend boilerplate.', 2024, 2024],
  ['2023-24', 'Engineering Lead', 'Patronize', 'Led multiple teams, optimized microservices architecture.', 2023, 2024],
  ['2022-23', 'Lead Backend Engineer', 'PiggyTech', 'Scalable APIs, mentorship, reliability and performance.', 2022, 2023],
  ['2020-21', 'Integrations Lead Engineer II', 'Patronize', 'Developed Patronize POS - Java/Kotlin frontend, Node.js backend.', 2020, 2021],
  ['2021', 'Consulting Backend Engineer', 'Africa Fintech Ltd. - UK', 'Technical leadership and consulting on backend projects.', 2021, 2021],
  ['2018-21', 'Backend Engineer / Product Lead', 'Ebidhaa Services', 'Built enterprise software for Enyo Oil, Blackbell, KudaBank.', 2018, 2021],
  ['2017-19', 'Operations Manager', 'Princadaz Nigeria Ltd.', 'Daily operations and administration.', 2017, 2019],
  ['2015', 'Engineer Intern', 'Stanbic IBTC', 'Foundational engineering experience.', 2015, 2015],
] as const;

const recognitions = [
  [2025, 'Staff of the Year', 'Piggytech Global Limited', 'staff-of-the-year.jpeg'],
  [2025, 'Most Innovative Team', 'Engineering, Piggytech', null],
  [2024, 'Cross-Departmental Collaboration Award', 'Piggytech Global Limited', 'cross-dept-award.png'],
  [2023, 'Staff of the Year - Patronize', 'PiggyTech / Patronize', 'patronize-staff-of-year.png'],
  [2016, 'High Honor Award (x2)', 'Cyprus International University', null],
] as const;

const talks = [
  ['Jan 2026', '2026-01-01', 'Solid Systems at Scale', 'Termii Engineering Retreat', 'Guest speaker - designing for reliability as companies grow.', 'termii-retreat.jpeg'],
  ['Nov 29, 2025', '2025-11-29', 'Engineering Management in the Age of Vibe & AI-Assisted Coding', 'Dev Hangout 1.0 · Dev Mentorship Community', 'Talk on leading engineering teams in the new AI workflow era.', 'dev-hangout.jpeg'],
  ['Nov 22, 2025', '2025-11-22', 'Designing an Intelligent Africa', 'Design Spin-off 2025 · Sections', 'On products, talents, and global impact.', 'design-spinoff.jpeg'],
  ['Nov 2025', '2025-11-01', 'Innovation for Growth: Advancing Careers and Startups', 'NorthStar 2.0 · Landmark Towers, Lagos', 'Keynote on innovation, careers, and startup growth in Nigeria.', null],
  ['Feature', '2025-11-01', 'The Cloud Tribe: African Voices', 'Huawei Cloud Sub-Saharan Africa', "Featured as a Group Engineering Manager at PiggyTech - discussed AI, cloud security, Africa's digital transformation.", 'huawei-feature.png'],
] as const;

const articles = [
  {
    slug: 'motion-sickness',
    title: 'Motion Sickness',
    excerpt:
      'A dizzy dispatch on robots, orbital data centres, AI CEOs, China, war, Nigerian fintech, parents on WhatsApp, and what remains human when everything accelerates.',
    body: articleBody('motion-sickness.md'),
    fileName: 'motion-sickness.jpg',
    year: 2026,
    month: 5,
    published_at: '2026-05-26T01:00:00.000Z',
    metadata: {
      source: 'website',
      category: 'AI & Society',
      tags: ['AI', 'Robotics', 'Infrastructure', 'Nigeria', 'Technology'],
      readingTimeMinutes: 18,
    },
  },
] as const;

async function mediaIdByFileName(knex: Knex, fileName: string) {
  const media = await knex('media_assets').where({ file_name: fileName }).first('id');
  return media?.id ?? null;
}

export async function seed(knex: Knex): Promise<void> {
  await knex('articles').whereRaw("metadata ->> 'source' = 'website'").delete();
  await knex('memoir_entries').whereRaw("metadata ->> 'source' = 'website'").delete();

  const bucketName = process.env.BUCKET ?? process.env.S3_PUBLIC_BUCKET ?? 'resume-public';
  const bucket = await knex('media_buckets').where({ name: bucketName }).first('id');
  if (bucket) {
    await knex('media_assets')
      .insert(
        mediaAssets.map(([storageKey, fileName, mimeType, altText, caption]) => ({
          bucket_id: bucket.id,
          owner_type: 'standalone',
          storage_key: storageKey,
          public_url: publicUrlFor(bucketName, storageKey),
          mime_type: mimeType,
          file_name: fileName,
          alt_text: altText,
          caption,
          metadata: asJson({
            source: 'website',
            localPath: `/public/${storageKey}`,
          }),
        })),
      )
      .onConflict(['bucket_id', 'storage_key'])
      .merge(['public_url', 'mime_type', 'file_name', 'alt_text', 'caption', 'metadata']);
  }

  const portraitMediaId = await mediaIdByFileName(knex, 'portrait.jpg');
  const resumeMediaId = await mediaIdByFileName(knex, 'Adio_Azeez_Adeniran_Resume.pdf');

  await knex('site_profiles')
    .insert({
      slug: 'adio-azeez-adeniran',
      full_name: 'Adio Azeez Adeniran',
      display_name: 'Adio Azeez Adeniran',
      headline: 'Engineering leader scaling 7+ products across application and infrastructure at PiggyTech.',
      bio: "Engineering leader scaling products, teams, and infrastructure across fintech, startup advisory, and engineering communities.",
      location: 'Lagos Island, Lagos State, Nigeria',
      email: 'adioadeniran@yahoo.co.uk',
      linkedin_url: 'https://www.linkedin.com/in/adio-azeez-adeniran/',
      github_url: 'https://github.com/azeezadio',
      portrait_media_id: portraitMediaId,
      resume_media_id: resumeMediaId,
      metadata: asJson({ source: 'website' }),
    })
    .onConflict('slug')
    .merge([
      'full_name',
      'display_name',
      'headline',
      'bio',
      'location',
      'email',
      'linkedin_url',
      'github_url',
      'portrait_media_id',
      'resume_media_id',
      'metadata',
    ]);

  await knex('homepage_sections')
    .insert(sections.map((section) => ({ ...section, metadata: asJson(section.metadata) })))
    .onConflict('key')
    .merge(['chapter', 'title', 'subtitle', 'body', 'sort_order', 'is_active', 'metadata']);

  await knex('skill_groups').del();
  await knex('skill_groups').insert(
    skills.map((skill) => ({
      ...skill,
      items: asJson(skill.items),
      metadata: asJson({ source: 'website' }),
    })),
  );

  await knex('experience_entries').del();
  await knex('experience_entries').insert(
    experiences.map(([years, role, company, summary, startYear, endYear], index) => ({
      years,
      role,
      company,
      summary,
      start_year: startYear,
      end_year: endYear,
      sort_order: (index + 1) * 10,
      metadata: asJson({ source: 'website' }),
    })),
  );

  await knex('recognition_entries').del();
  await knex('recognition_entries').insert(
    await Promise.all(
      recognitions.map(async ([year, title, organization, fileName], index) => ({
        year,
        title,
        organization,
        description: organization,
        media_id: fileName ? await mediaIdByFileName(knex, fileName) : null,
        sort_order: (index + 1) * 10,
        metadata: asJson({ source: 'website' }),
      })),
    ),
  );

  await knex('talk_entries').del();
  await knex('talk_entries').insert(
    await Promise.all(
      talks.map(async ([dateLabel, occurredOn, title, venue, summary, fileName], index) => ({
        date_label: dateLabel,
        occurred_on: occurredOn,
        title,
        venue,
        summary,
        media_id: fileName ? await mediaIdByFileName(knex, fileName) : null,
        sort_order: (index + 1) * 10,
        metadata: asJson({ source: 'website' }),
      })),
    ),
  );

  await knex('articles')
    .insert(
      await Promise.all(
        articles.map(async (article) => ({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          body: article.body,
          cover_media_id: await mediaIdByFileName(knex, article.fileName),
          status: 'published',
          year: article.year,
          month: article.month,
          published_at: article.published_at,
          seo_title: article.title,
          seo_description: article.excerpt,
          metadata: asJson(article.metadata),
        })),
      ),
    )
    .onConflict('slug')
    .merge([
      'title',
      'excerpt',
      'body',
      'cover_media_id',
      'status',
      'year',
      'month',
      'published_at',
      'seo_title',
      'seo_description',
      'metadata',
    ]);
}
