import { Knex } from 'knex';

const publishedAt = '2026-01-01T00:00:00.000Z';

const articles = [
  {
    slug: 'solid-systems-at-scale',
    title: 'Solid Systems at Scale',
    excerpt: 'Guest speaker - designing for reliability as companies grow.',
    body: 'Termii Engineering Retreat. Guest speaker - designing for reliability as companies grow.',
    year: 2026,
    month: 1,
    published_at: '2026-01-01T00:00:00.000Z',
    seo_title: 'Solid Systems at Scale',
    seo_description: 'Talk at Termii Engineering Retreat on reliability and scale.',
    metadata: {
      source: 'website',
      type: 'talk',
      dateLabel: 'Jan 2026',
      venue: 'Termii Engineering Retreat',
      mediaKey: 'images/termii-retreat.jpeg',
    },
  },
  {
    slug: 'engineering-management-vibe-ai-assisted-coding',
    title: 'Engineering Management in the Age of Vibe & AI-Assisted Coding',
    excerpt: 'Talk on leading engineering teams in the new AI workflow era.',
    body: 'Dev Hangout 1.0, Dev Mentorship Community. Talk on leading engineering teams in the new AI workflow era.',
    year: 2025,
    month: 11,
    published_at: '2025-11-29T00:00:00.000Z',
    seo_title: 'Engineering Management in the Age of Vibe & AI-Assisted Coding',
    seo_description: 'Talk on leadership and engineering management in the AI-assisted coding era.',
    metadata: {
      source: 'website',
      type: 'talk',
      dateLabel: 'Nov 29, 2025',
      venue: 'Dev Hangout 1.0 · Dev Mentorship Community',
      mediaKey: 'images/dev-hangout.jpeg',
    },
  },
  {
    slug: 'designing-an-intelligent-africa',
    title: 'Designing an Intelligent Africa',
    excerpt: 'On products, talents, and global impact.',
    body: 'Design Spin-off 2025, Sections. On products, talents, and global impact.',
    year: 2025,
    month: 11,
    published_at: '2025-11-22T00:00:00.000Z',
    seo_title: 'Designing an Intelligent Africa',
    seo_description: 'Talk at Design Spin-off 2025 on African products, talent, and impact.',
    metadata: {
      source: 'website',
      type: 'talk',
      dateLabel: 'Nov 22, 2025',
      venue: 'Design Spin-off 2025 · Sections',
      mediaKey: 'images/design-spinoff.jpeg',
    },
  },
  {
    slug: 'innovation-for-growth-careers-startups',
    title: 'Innovation for Growth: Advancing Careers and Startups',
    excerpt: 'Keynote on innovation, careers, and startup growth in Nigeria.',
    body: 'NorthStar 2.0, Landmark Towers, Lagos. Keynote on innovation, careers, and startup growth in Nigeria.',
    year: 2025,
    month: 11,
    published_at: '2025-11-01T00:00:00.000Z',
    seo_title: 'Innovation for Growth: Advancing Careers and Startups',
    seo_description: 'Keynote on innovation, careers, and startup growth in Nigeria.',
    metadata: {
      source: 'website',
      type: 'talk',
      dateLabel: 'Nov 2025',
      venue: 'NorthStar 2.0 · Landmark Towers, Lagos',
    },
  },
  {
    slug: 'cloud-tribe-african-voices',
    title: 'The Cloud Tribe: African Voices',
    excerpt: "Featured as a Group Engineering Manager at PiggyTech - discussed AI, cloud security, Africa's digital transformation.",
    body: "Huawei Cloud Sub-Saharan Africa feature. Featured as a Group Engineering Manager at PiggyTech - discussed AI, cloud security, Africa's digital transformation.",
    year: 2025,
    month: 11,
    published_at: '2025-11-01T00:00:00.000Z',
    seo_title: 'The Cloud Tribe: African Voices',
    seo_description: "Huawei Cloud feature on AI, cloud security, and Africa's digital transformation.",
    metadata: {
      source: 'website',
      type: 'press',
      dateLabel: 'Feature',
      venue: 'Huawei Cloud Sub-Saharan Africa',
      mediaKey: 'images/huawei-feature.png',
    },
  },
];

const memoirs = [
  {
    slug: 'on-engineering-and-influence',
    title: 'On Engineering & Influence',
    summary: 'Editorial profile chapter for the homepage.',
    body: [
      "Adio leads engineering at PiggyTech, the umbrella behind Nigeria's most-loved savings brand and a portfolio of fintech products.",
      'His role spans seven products across application and infrastructure, with principal solutions architecture as the connective tissue.',
      'He has spent the last decade moving between backend systems, mobile, and platform - first at Stanbic IBTC, then Ebidhaa, Patronize, Africa Fintech Limited (UK), and now PiggyTech.',
      'Outside of work, he advises early-stage startups as Engineering Partner at LiveLabs, speaks at engineering forums across Africa, and mentors emerging engineering leaders.',
    ].join('\n\n'),
    year: 2026,
    month: 1,
    occurred_on: '2026-01-01',
    location: 'Lagos, Nigeria',
    mood: 'editorial',
    metadata: {
      source: 'website',
      type: 'profile',
      chapter: 'Chapter 01',
      pullQuote: 'Engineering leadership is about scale - of systems, of teams, and of the decisions that quietly compound.',
      mediaKey: 'images/portrait.jpg',
    },
  },
  {
    slug: 'group-engineering-manager-piggytech',
    title: 'Group Engineering Manager',
    summary: 'Scaling 7+ products across application and infrastructure. Principal Solutions Architect.',
    body: 'Group Engineering Manager at PiggyTech. Scaling 7+ products across application and infrastructure. Principal Solutions Architect.',
    year: 2024,
    month: 1,
    occurred_on: '2024-01-01',
    metadata: { source: 'website', type: 'experience', years: '2024-', company: 'PiggyTech' },
  },
  {
    slug: 'engineering-partner-livelabs',
    title: 'Engineering Partner',
    summary: 'Advising portfolio startups on technical strategy and architecture.',
    body: 'Engineering Partner at LiveLabs. Advising portfolio startups on technical strategy and architecture.',
    year: 2024,
    month: 1,
    occurred_on: '2024-01-01',
    metadata: { source: 'website', type: 'experience', years: '2024', company: 'LiveLabs' },
  },
  {
    slug: 'engineering-lead-special-products-piggytech',
    title: 'Engineering Lead - Special Products',
    summary: 'System upgrades, engineering guidelines, backend boilerplate.',
    body: 'Engineering Lead - Special Products at PiggyTech. System upgrades, engineering guidelines, backend boilerplate.',
    year: 2024,
    month: 1,
    occurred_on: '2024-01-01',
    metadata: { source: 'website', type: 'experience', years: '2024', company: 'PiggyTech' },
  },
  {
    slug: 'engineering-lead-patronize',
    title: 'Engineering Lead',
    summary: 'Led multiple teams, optimized microservices architecture.',
    body: 'Engineering Lead at Patronize. Led multiple teams, optimized microservices architecture.',
    year: 2023,
    month: 1,
    occurred_on: '2023-01-01',
    metadata: { source: 'website', type: 'experience', years: '2023-24', company: 'Patronize' },
  },
  {
    slug: 'lead-backend-engineer-piggytech',
    title: 'Lead Backend Engineer',
    summary: 'Scalable APIs, mentorship, reliability and performance.',
    body: 'Lead Backend Engineer at PiggyTech. Scalable APIs, mentorship, reliability and performance.',
    year: 2022,
    month: 1,
    occurred_on: '2022-01-01',
    metadata: { source: 'website', type: 'experience', years: '2022-23', company: 'PiggyTech' },
  },
  {
    slug: 'integrations-lead-engineer-patronize',
    title: 'Integrations Lead Engineer II',
    summary: 'Developed Patronize POS - Java/Kotlin frontend, Node.js backend.',
    body: 'Integrations Lead Engineer II at Patronize. Developed Patronize POS - Java/Kotlin frontend, Node.js backend.',
    year: 2020,
    month: 1,
    occurred_on: '2020-01-01',
    metadata: { source: 'website', type: 'experience', years: '2020-21', company: 'Patronize' },
  },
  {
    slug: 'consulting-backend-engineer-africa-fintech',
    title: 'Consulting Backend Engineer',
    summary: 'Technical leadership and consulting on backend projects.',
    body: 'Consulting Backend Engineer at Africa Fintech Ltd. - UK. Technical leadership and consulting on backend projects.',
    year: 2021,
    month: 1,
    occurred_on: '2021-01-01',
    metadata: { source: 'website', type: 'experience', years: '2021', company: 'Africa Fintech Ltd. - UK' },
  },
  {
    slug: 'backend-engineer-product-lead-ebidhaa',
    title: 'Backend Engineer / Product Lead',
    summary: 'Built enterprise software for Enyo Oil, Blackbell, KudaBank.',
    body: 'Backend Engineer / Product Lead at Ebidhaa Services. Built enterprise software for Enyo Oil, Blackbell, KudaBank.',
    year: 2018,
    month: 1,
    occurred_on: '2018-01-01',
    metadata: { source: 'website', type: 'experience', years: '2018-21', company: 'Ebidhaa Services' },
  },
  {
    slug: 'operations-manager-princadaz',
    title: 'Operations Manager',
    summary: 'Daily operations and administration.',
    body: 'Operations Manager at Princadaz Nigeria Ltd. Daily operations and administration.',
    year: 2017,
    month: 1,
    occurred_on: '2017-01-01',
    metadata: { source: 'website', type: 'experience', years: '2017-19', company: 'Princadaz Nigeria Ltd.' },
  },
  {
    slug: 'engineer-intern-stanbic-ibtc',
    title: 'Engineer Intern',
    summary: 'Foundational engineering experience.',
    body: 'Engineer Intern at Stanbic IBTC. Foundational engineering experience.',
    year: 2015,
    month: 1,
    occurred_on: '2015-01-01',
    metadata: { source: 'website', type: 'experience', years: '2015', company: 'Stanbic IBTC' },
  },
  {
    slug: 'staff-of-the-year-2025',
    title: 'Staff of the Year',
    summary: 'Piggytech Global Limited.',
    body: 'Staff of the Year, Piggytech Global Limited.',
    year: 2025,
    month: 1,
    occurred_on: '2025-01-01',
    metadata: { source: 'website', type: 'award', org: 'Piggytech Global Limited', mediaKey: 'images/staff-of-the-year.jpeg' },
  },
  {
    slug: 'most-innovative-team-2025',
    title: 'Most Innovative Team',
    summary: 'Engineering, Piggytech.',
    body: 'Most Innovative Team, Engineering, Piggytech.',
    year: 2025,
    month: 1,
    occurred_on: '2025-01-01',
    metadata: { source: 'website', type: 'award', org: 'Engineering, Piggytech' },
  },
  {
    slug: 'cross-departmental-collaboration-award-2024',
    title: 'Cross-Departmental Collaboration Award',
    summary: 'Piggytech Global Limited.',
    body: 'Cross-Departmental Collaboration Award, Piggytech Global Limited.',
    year: 2024,
    month: 1,
    occurred_on: '2024-01-01',
    metadata: { source: 'website', type: 'award', org: 'Piggytech Global Limited', mediaKey: 'images/cross-dept-award.png' },
  },
  {
    slug: 'staff-of-the-year-patronize-2023',
    title: 'Staff of the Year - Patronize',
    summary: 'PiggyTech / Patronize.',
    body: 'Staff of the Year - Patronize, PiggyTech / Patronize.',
    year: 2023,
    month: 1,
    occurred_on: '2023-01-01',
    metadata: { source: 'website', type: 'award', org: 'PiggyTech / Patronize', mediaKey: 'images/patronize-staff-of-year.png' },
  },
  {
    slug: 'high-honor-award-2016',
    title: 'High Honor Award (x2)',
    summary: 'Cyprus International University.',
    body: 'High Honor Award (x2), Cyprus International University.',
    year: 2016,
    month: 1,
    occurred_on: '2016-01-01',
    metadata: { source: 'website', type: 'award', org: 'Cyprus International University' },
  },
];

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
  ['documents/Adio_Azeez_Adeniran_Resume.pdf', 'Adio_Azeez_Adeniran_Resume.pdf', 'application/pdf', 'Adio Azeez Adeniran resume PDF.', 'Resume document.'],
] as const;

export async function seed(knex: Knex): Promise<void> {
  await knex('articles')
    .insert(
      articles.map((article) => ({
        ...article,
        status: 'published',
        published_at: article.published_at ?? publishedAt,
      })),
    )
    .onConflict('slug')
    .merge([
      'title',
      'excerpt',
      'body',
      'year',
      'month',
      'published_at',
      'seo_title',
      'seo_description',
      'metadata',
      'status',
    ]);

  await knex('memoir_entries')
    .insert(
      memoirs.map((memoir) => ({
        ...memoir,
        status: 'published',
        published_at: publishedAt,
      })),
    )
    .onConflict('slug')
    .merge([
      'title',
      'summary',
      'body',
      'year',
      'month',
      'occurred_on',
      'location',
      'mood',
      'metadata',
      'status',
      'published_at',
    ]);

  const bucketName = process.env.BUCKET ?? process.env.S3_PUBLIC_BUCKET ?? 'resume-public';
  const bucket = await knex('media_buckets').where({ name: bucketName }).first('id');
  if (!bucket) return;

  await knex('media_assets')
    .insert(
      mediaAssets.map(([storageKey, fileName, mimeType, altText, caption]) => ({
        bucket_id: bucket.id,
        owner_type: 'standalone',
        storage_key: storageKey,
        mime_type: mimeType,
        file_name: fileName,
        alt_text: altText,
        caption,
        metadata: {
          source: 'website',
          localPath: `/public/${storageKey}`,
        },
      })),
    )
    .onConflict(['bucket_id', 'storage_key'])
    .merge(['mime_type', 'file_name', 'alt_text', 'caption', 'metadata']);
}
