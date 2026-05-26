import { Knex } from 'knex';

const asJson = (value: unknown) => JSON.stringify(value);

type Locale = 'zh' | 'ar' | 'es';

type TranslationSeedRow = {
  entity_type: string;
  entity_id: string;
  locale: Locale;
  field_key: string;
  value_text: string | null;
  value_json: string | null;
  source_hash: string;
  status: 'reviewed';
};

type LocalizedContent = {
  profile: {
    headline: string;
    bio: string;
    location: string;
  };
  sections: Record<
    string,
    {
      chapter?: string | null;
      title?: string;
      subtitle?: string | null;
      body?: string | null;
      metadata?: Record<string, unknown>;
    }
  >;
  skills: Array<{ label: string; items: string[] }>;
  experience: Array<{ role: string; summary: string }>;
  recognition: Array<{ title: string; organization: string; description: string }>;
  talks: Array<{ date_label: string; title: string; venue: string; summary: string }>;
};

const localizedContent: Record<Locale, LocalizedContent> = {
  zh: {
    profile: {
      headline: '工程领导者,在 PiggyTech 跨应用与基础设施层面规模化 7+ 款产品。',
      bio: '工程领导者,在金融科技、创业公司咨询与工程社区中规模化产品、团队与基础设施。',
      location: '尼日利亚拉各斯州拉各斯岛',
    },
    sections: {
      hero: {
        subtitle: '第 01 期 · 工程 · 拉各斯,2026',
        body: '工程领导者,在 PiggyTech 跨应用与基础设施层面规模化 7+ 款产品。首席解决方案架构师。LiveLabs 工程合伙人。',
        metadata: {
          location: '尼日利亚拉各斯州拉各斯岛',
          strengths: ['规模化', '架构设计', '团队领导', '辅导培养'],
        },
      },
      about: {
        chapter: '第一章',
        title: '关于工程与影响力。',
        body: [
          'Adio 在 PiggyTech 领导工程团队,这是尼日利亚最受喜爱的储蓄品牌及一系列金融科技产品的母公司。他的职责覆盖七款产品的应用与基础设施层面,以首席解决方案架构作为连接的纽带。',
          '过去十年里,他在后端系统、移动端与平台之间穿梭——先是 Stanbic IBTC,然后是 Ebidhaa、Patronize、Africa Fintech Limited(英国),如今在 PiggyTech。一路走来:塞浦路斯国际大学的高荣誉学位、两次年度员工奖,以及华为云的专题报道。',
          '工作之外,他作为 LiveLabs 工程合伙人为早期创业公司提供建议,在非洲各地的工程论坛上演讲,并辅导新兴的工程领导者。',
        ].join('\n\n'),
        metadata: {
          pullQuote: '工程领导力的本质是规模——系统的规模、团队的规模,以及那些默默累积的决策。',
          stats: [
            { value: 10, suffix: '+', label: '工程年限', sub: '自 2015 年从事工程' },
            { value: 7, suffix: '+', label: '已规模化产品', sub: '应用与基础设施' },
            { value: 6, suffix: '', label: '获得奖项', sub: '行业与学术' },
            { value: 5, suffix: '+', label: '演讲与报道', sub: '遍及非洲及更远' },
          ],
        },
      },
      skills: { chapter: '第二章', title: '领域与工具。' },
      experience: { chapter: '第三章', title: '我曾走过的路。' },
      recognition: { chapter: '第四章', title: '荣誉。' },
      talks: { chapter: '第五章', title: '演讲与报道。' },
      contact: { chapter: '尾声', title: '一起 共创。' },
    },
    skills: [
      { label: '编程语言', items: ['TypeScript', 'JavaScript', 'Java', 'Golang', 'Kotlin'] },
      { label: '架构', items: ['Microservices', 'API Design', 'gRPC', 'Systems Design', 'Database Design'] },
      { label: '云与 DevOps', items: ['GCP', 'Firebase', 'AWS', 'Heroku', 'CI/CD'] },
      { label: '移动与框架', items: ['React Native', 'Native Android', 'Node.js', 'Restana'] },
      { label: '团队领导', items: ['敏捷', '团队领导', '跨职能协作', '人才发展'] },
    ],
    experience: [
      { role: '集团工程经理', summary: '在应用与基础设施层面规模化 7+ 款产品。首席解决方案架构师。' },
      { role: '工程合伙人', summary: '为投资组合中的初创公司提供技术战略与架构建议。' },
      { role: '工程负责人 - 特殊产品', summary: '系统升级、工程规范、后端样板。' },
      { role: '工程负责人', summary: '领导多个团队,优化微服务架构。' },
      { role: '首席后端工程师', summary: '可扩展的 API、辅导、可靠性与性能。' },
      { role: '集成首席工程师 II', summary: '开发 Patronize POS - Java/Kotlin 前端,Node.js 后端。' },
      { role: '后端工程顾问', summary: '为后端项目提供技术领导与咨询。' },
      { role: '后端工程师 / 产品负责人', summary: '为 Enyo Oil、Blackbell、KudaBank 构建企业软件。' },
      { role: '运营经理', summary: '日常运营与管理。' },
      { role: '工程实习生', summary: '基础工程经验。' },
    ],
    recognition: [
      { title: '年度员工', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: '最具创新团队', organization: '工程部门,Piggytech', description: '工程部门,Piggytech' },
      { title: '跨部门协作奖', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: '年度员工 - Patronize', organization: 'PiggyTech / Patronize', description: 'PiggyTech / Patronize' },
      { title: '高荣誉奖(×2)', organization: '塞浦路斯国际大学', description: '塞浦路斯国际大学' },
    ],
    talks: [
      { date_label: '2026 年 1 月', title: '规模化的可靠系统', venue: 'Termii 工程务虚会', summary: '特邀演讲者——设计随公司成长而稳健的系统。' },
      { date_label: '2025 年 11 月 29 日', title: '氛围编程与 AI 辅助编程时代的工程管理', venue: 'Dev Hangout 1.0 · Dev Mentorship Community', summary: '探讨在新的 AI 工作流时代领导工程团队。' },
      { date_label: '2025 年 11 月 22 日', title: '设计智能非洲', venue: 'Design Spin-off 2025 · Sections', summary: '关于产品、人才与全球影响力。' },
      { date_label: '2025 年 11 月', title: '增长创新:推动职业与初创发展', venue: 'NorthStar 2.0 · 拉各斯 Landmark Towers', summary: '围绕尼日利亚的创新、职业与初创成长的主旨演讲。' },
      { date_label: '专题', title: '云之部落:非洲之声', venue: '华为云撒哈拉以南非洲', summary: '作为 PiggyTech 集团工程经理出镜——探讨 AI、云安全与非洲的数字化转型。' },
    ],
  },
  ar: {
    profile: {
      headline: 'قائد هندسي يقود توسيع أكثر من 7 منتجات عبر طبقتي التطبيق والبنية التحتية في PiggyTech.',
      bio: 'قائد هندسي يوسّع المنتجات والفرق والبنية التحتية عبر التكنولوجيا المالية واستشارات الشركات الناشئة والمجتمعات الهندسية.',
      location: 'جزيرة لاغوس، ولاية لاغوس، نيجيريا',
    },
    sections: {
      hero: {
        subtitle: 'العدد رقم 01 · الهندسة · لاغوس، 2026',
        body: 'قائد هندسي يقود توسيع أكثر من 7 منتجات عبر طبقتي التطبيق والبنية التحتية في PiggyTech. كبير مهندسي الحلول. شريك هندسي في LiveLabs.',
        metadata: {
          location: 'جزيرة لاغوس، ولاية لاغوس، نيجيريا',
          strengths: ['التوسيع', 'هندسة الأنظمة', 'القيادة', 'التوجيه'],
        },
      },
      about: {
        chapter: 'الفصل الأول',
        title: 'في الهندسة والأثر.',
        body: [
          'يقود Adio الهندسة في PiggyTech، الشركة الأم وراء أحب علامة ادخار في نيجيريا ومجموعة من منتجات التكنولوجيا المالية. يمتد دوره على سبعة منتجات عبر التطبيق والبنية التحتية، حيث تشكّل هندسة الحلول الرئيسية النسيج الرابط.',
          'قضى العقد الماضي متنقلًا بين أنظمة الخوادم والمحمول والمنصات - بدءًا من Stanbic IBTC، ثم Ebidhaa وPatronize وAfrica Fintech Limited (المملكة المتحدة)، والآن في PiggyTech. وعلى الطريق: شهادات بمرتبة الشرف العالية من جامعة قبرص الدولية، وجائزتي موظف العام، ومقابلة على Huawei Cloud.',
          'خارج العمل، يقدم المشورة للشركات الناشئة كشريك هندسي في LiveLabs، ويتحدث في منتديات الهندسة عبر إفريقيا، ويوجّه قادة الهندسة الصاعدين.',
        ].join('\n\n'),
        metadata: {
          pullQuote: 'القيادة الهندسية تدور حول الحجم - حجم الأنظمة، وحجم الفرق، وحجم القرارات التي تتراكم بهدوء.',
          stats: [
            { value: 10, suffix: '+', label: 'سنوات في الهندسة', sub: 'أهندس منذ 2015' },
            { value: 7, suffix: '+', label: 'منتجات تم توسيعها', sub: 'تطبيق وبنية تحتية' },
            { value: 6, suffix: '', label: 'تقديرات نلتُها', sub: 'صناعية وأكاديمية' },
            { value: 5, suffix: '+', label: 'محاضرات ومقابلات', sub: 'عبر إفريقيا وما بعدها' },
          ],
        },
      },
      skills: { chapter: 'الفصل الثاني', title: 'المجال والأدوات.' },
      experience: { chapter: 'الفصل الثالث', title: 'أين عملتُ.' },
      recognition: { chapter: 'الفصل الرابع', title: 'التقديرات.' },
      talks: { chapter: 'الفصل الخامس', title: 'محاضرات وحضور إعلامي.' },
      contact: { chapter: 'الخاتمة', title: 'هيا نصنع شيئًا.' },
    },
    skills: [
      { label: 'اللغات', items: ['TypeScript', 'JavaScript', 'Java', 'Golang', 'Kotlin'] },
      { label: 'الهندسة', items: ['Microservices', 'API Design', 'gRPC', 'Systems Design', 'Database Design'] },
      { label: 'السحابة و DevOps', items: ['GCP', 'Firebase', 'AWS', 'Heroku', 'CI/CD'] },
      { label: 'المحمول والإطارات', items: ['React Native', 'Native Android', 'Node.js', 'Restana'] },
      { label: 'القيادة', items: ['Agile', 'قيادة الفرق', 'التعاون متعدد الفرق', 'تطوير المواهب'] },
    ],
    experience: [
      { role: 'مدير الهندسة للمجموعة', summary: 'توسيع أكثر من 7 منتجات عبر التطبيق والبنية التحتية. كبير مهندسي الحلول.' },
      { role: 'شريك هندسي', summary: 'تقديم المشورة للشركات الناشئة في المحفظة حول الاستراتيجية التقنية والهندسة.' },
      { role: 'قائد هندسي - المنتجات الخاصة', summary: 'ترقيات الأنظمة، الإرشادات الهندسية، قوالب الخوادم.' },
      { role: 'قائد هندسي', summary: 'قيادة فرق متعددة، وتحسين بنية الخدمات المصغّرة.' },
      { role: 'مهندس خوادم رئيسي', summary: 'واجهات برمجية قابلة للتوسع، توجيه، موثوقية وأداء.' },
      { role: 'قائد هندسي للتكاملات II', summary: 'تطوير Patronize POS - واجهة Java/Kotlin وخادم Node.js.' },
      { role: 'مستشار هندسة خوادم', summary: 'قيادة تقنية واستشارات لمشاريع الخوادم.' },
      { role: 'مهندس خوادم / قائد منتج', summary: 'بناء برمجيات مؤسسية لشركات Enyo Oil وBlackbell وKudaBank.' },
      { role: 'مدير العمليات', summary: 'العمليات اليومية والإدارة.' },
      { role: 'متدرب هندسي', summary: 'خبرة هندسية تأسيسية.' },
    ],
    recognition: [
      { title: 'موظف العام', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: 'أكثر الفرق إبداعًا', organization: 'الهندسة، Piggytech', description: 'الهندسة، Piggytech' },
      { title: 'جائزة التعاون بين الأقسام', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: 'موظف العام - Patronize', organization: 'PiggyTech / Patronize', description: 'PiggyTech / Patronize' },
      { title: 'جائزة الامتياز (×2)', organization: 'جامعة قبرص الدولية', description: 'جامعة قبرص الدولية' },
    ],
    talks: [
      { date_label: 'يناير 2026', title: 'أنظمة متينة على نطاق واسع', venue: 'ملتقى Termii الهندسي', summary: 'متحدث ضيف - تصميم الموثوقية مع نمو الشركات.' },
      { date_label: '29 نوفمبر 2025', title: 'إدارة الهندسة في عصر البرمجة الحرّة والمساعدة بالذكاء الاصطناعي', venue: 'Dev Hangout 1.0 · Dev Mentorship Community', summary: 'محاضرة حول قيادة فرق الهندسة في عصر سير عمل الذكاء الاصطناعي الجديد.' },
      { date_label: '22 نوفمبر 2025', title: 'تصميم إفريقيا ذكية', venue: 'Design Spin-off 2025 · Sections', summary: 'عن المنتجات والمواهب والأثر العالمي.' },
      { date_label: 'نوفمبر 2025', title: 'الابتكار من أجل النمو: تطوير المسارات المهنية والشركات الناشئة', venue: 'NorthStar 2.0 · أبراج Landmark، لاغوس', summary: 'كلمة رئيسية حول الابتكار والمسارات المهنية ونمو الشركات الناشئة في نيجيريا.' },
      { date_label: 'تغطية', title: 'قبيلة السحاب: أصوات إفريقية', venue: 'Huawei Cloud إفريقيا جنوب الصحراء', summary: 'تمت تغطيته بصفته مدير هندسة المجموعة في PiggyTech - نقاش حول الذكاء الاصطناعي وأمان السحابة والتحول الرقمي في إفريقيا.' },
    ],
  },
  es: {
    profile: {
      headline: 'Líder de ingeniería escalando 7+ productos a través de aplicación e infraestructura en PiggyTech.',
      bio: 'Líder de ingeniería que escala productos, equipos e infraestructura en fintech, asesoría a startups y comunidades de ingeniería.',
      location: 'Lagos Island, Estado de Lagos, Nigeria',
    },
    sections: {
      hero: {
        subtitle: 'Número 01 · Ingeniería · Lagos, 2026',
        body: 'Líder de ingeniería escalando 7+ productos a través de aplicación e infraestructura en PiggyTech. Arquitecto Principal de Soluciones. Engineering Partner en LiveLabs.',
        metadata: {
          location: 'Lagos Island, Estado de Lagos, Nigeria',
          strengths: ['Escalando', 'Arquitectando', 'Liderando', 'Mentorizando'],
        },
      },
      about: {
        chapter: 'Capítulo 01',
        title: 'Sobre ingeniería e influencia.',
        body: [
          'Adio lidera la ingeniería en PiggyTech, la matriz detrás de la marca de ahorro más querida de Nigeria y una cartera de productos fintech. Su rol abarca siete productos entre aplicación e infraestructura, con la arquitectura principal de soluciones como tejido conector.',
          'Ha pasado la última década moviéndose entre sistemas backend, móvil y plataforma - primero en Stanbic IBTC, luego en Ebidhaa, Patronize, Africa Fintech Limited (Reino Unido) y ahora PiggyTech. En el camino: títulos con alta distinción de Cyprus International University, dos premios al empleado del año y una aparición en Huawei Cloud.',
          'Fuera del trabajo, asesora a startups en etapa temprana como Engineering Partner en LiveLabs, habla en foros de ingeniería por toda África y mentoriza a líderes de ingeniería emergentes.',
        ].join('\n\n'),
        metadata: {
          pullQuote: 'El liderazgo en ingeniería se trata de escala - de sistemas, de equipos y de las decisiones que silenciosamente se acumulan.',
          stats: [
            { value: 10, suffix: '+', label: 'Años construyendo', sub: 'Ingeniería desde 2015' },
            { value: 7, suffix: '+', label: 'Productos escalados', sub: 'Aplicación e infraestructura' },
            { value: 6, suffix: '', label: 'Reconocimientos', sub: 'Industria y academia' },
            { value: 5, suffix: '+', label: 'Charlas y apariciones', sub: 'En África y más allá' },
          ],
        },
      },
      skills: { chapter: 'Capítulo 02', title: 'Campo y herramientas.' },
      experience: { chapter: 'Capítulo 03', title: 'Dónde he estado.' },
      recognition: { chapter: 'Capítulo 04', title: 'Reconocimientos.' },
      talks: { chapter: 'Capítulo 05', title: 'Charlas y prensa.' },
      contact: { chapter: 'Coda', title: 'Hagamos algo.' },
    },
    skills: [
      { label: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'Java', 'Golang', 'Kotlin'] },
      { label: 'Arquitectura', items: ['Microservices', 'API Design', 'gRPC', 'Systems Design', 'Database Design'] },
      { label: 'Nube y DevOps', items: ['GCP', 'Firebase', 'AWS', 'Heroku', 'CI/CD'] },
      { label: 'Móvil y Frameworks', items: ['React Native', 'Native Android', 'Node.js', 'Restana'] },
      { label: 'Liderazgo', items: ['Agile', 'Liderazgo de equipos', 'Colaboración interfuncional', 'Desarrollo de talento'] },
    ],
    experience: [
      { role: 'Group Engineering Manager', summary: 'Escalando 7+ productos entre aplicación e infraestructura. Arquitecto Principal de Soluciones.' },
      { role: 'Engineering Partner', summary: 'Asesorando a startups de la cartera en estrategia técnica y arquitectura.' },
      { role: 'Engineering Lead - Productos Especiales', summary: 'Actualizaciones de sistemas, lineamientos de ingeniería, boilerplate de backend.' },
      { role: 'Engineering Lead', summary: 'Lideró múltiples equipos, optimizó la arquitectura de microservicios.' },
      { role: 'Lead Backend Engineer', summary: 'APIs escalables, mentoría, fiabilidad y rendimiento.' },
      { role: 'Integrations Lead Engineer II', summary: 'Desarrolló Patronize POS - frontend Java/Kotlin, backend Node.js.' },
      { role: 'Consulting Backend Engineer', summary: 'Liderazgo técnico y consultoría en proyectos de backend.' },
      { role: 'Backend Engineer / Product Lead', summary: 'Construyó software empresarial para Enyo Oil, Blackbell y KudaBank.' },
      { role: 'Operations Manager', summary: 'Operaciones diarias y administración.' },
      { role: 'Pasante de Ingeniería', summary: 'Experiencia fundacional en ingeniería.' },
    ],
    recognition: [
      { title: 'Empleado del Año', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: 'Equipo Más Innovador', organization: 'Ingeniería, Piggytech', description: 'Ingeniería, Piggytech' },
      { title: 'Premio a la Colaboración entre Departamentos', organization: 'Piggytech Global Limited', description: 'Piggytech Global Limited' },
      { title: 'Empleado del Año - Patronize', organization: 'PiggyTech / Patronize', description: 'PiggyTech / Patronize' },
      { title: 'Premio High Honor (×2)', organization: 'Cyprus International University', description: 'Cyprus International University' },
    ],
    talks: [
      { date_label: 'Enero 2026', title: 'Sistemas sólidos a escala', venue: 'Termii Engineering Retreat', summary: 'Orador invitado - diseñar para la fiabilidad mientras las empresas crecen.' },
      { date_label: '29 Nov 2025', title: 'Gestión de ingeniería en la era del vibe coding y la programación asistida por IA', venue: 'Dev Hangout 1.0 · Dev Mentorship Community', summary: 'Charla sobre liderar equipos de ingeniería en la nueva era del flujo de trabajo con IA.' },
      { date_label: '22 Nov 2025', title: 'Diseñando una África inteligente', venue: 'Design Spin-off 2025 · Sections', summary: 'Sobre productos, talento e impacto global.' },
      { date_label: 'Nov 2025', title: 'Innovación para el crecimiento: carreras y startups', venue: 'NorthStar 2.0 · Landmark Towers, Lagos', summary: 'Conferencia magistral sobre innovación, carreras y crecimiento de startups en Nigeria.' },
      { date_label: 'Feature', title: 'The Cloud Tribe: Voces africanas', venue: 'Huawei Cloud África Subsahariana', summary: 'Presentado como Group Engineering Manager de PiggyTech - habló sobre IA, seguridad en la nube y la transformación digital de África.' },
    ],
  },
};

function textRow(entityType: string, entityId: string, locale: Locale, fieldKey: string, value: string | null | undefined) {
  if (value === undefined || value === null) return null;
  return {
    entity_type: entityType,
    entity_id: entityId,
    locale,
    field_key: fieldKey,
    value_text: value,
    value_json: null,
    source_hash: 'website-seed-v1',
    status: 'reviewed',
  } satisfies TranslationSeedRow;
}

function jsonRow(entityType: string, entityId: string, locale: Locale, fieldKey: string, value: unknown) {
  if (value === undefined || value === null) return null;
  return {
    entity_type: entityType,
    entity_id: entityId,
    locale,
    field_key: fieldKey,
    value_text: null,
    value_json: asJson(value),
    source_hash: 'website-seed-v1',
    status: 'reviewed',
  } satisfies TranslationSeedRow;
}

export async function seed(knex: Knex): Promise<void> {
  const [profile, sections, skills, experience, recognition, talks] = await Promise.all([
    knex('site_profiles').where({ slug: 'adio-azeez-adeniran' }).first('id'),
    knex('homepage_sections').select('id', 'key'),
    knex('skill_groups').select('id').orderBy('sort_order', 'asc'),
    knex('experience_entries').select('id').orderBy('sort_order', 'asc'),
    knex('recognition_entries').select('id').orderBy('sort_order', 'asc'),
    knex('talk_entries').select('id').orderBy('sort_order', 'asc'),
  ]);

  if (!profile) return;

  const sectionByKey = new Map(sections.map((section) => [section.key, section.id]));
  const rows = Object.entries(localizedContent).flatMap(([localeKey, content]) => {
    const locale = localeKey as Locale;
    const output: Array<TranslationSeedRow | null> = [
      textRow('site_profile', profile.id, locale, 'headline', content.profile.headline),
      textRow('site_profile', profile.id, locale, 'bio', content.profile.bio),
      textRow('site_profile', profile.id, locale, 'location', content.profile.location),
    ];

    for (const [key, section] of Object.entries(content.sections)) {
      const entityId = sectionByKey.get(key);
      if (!entityId) continue;
      output.push(
        textRow('homepage_section', entityId, locale, 'chapter', section.chapter),
        textRow('homepage_section', entityId, locale, 'title', section.title),
        textRow('homepage_section', entityId, locale, 'subtitle', section.subtitle),
        textRow('homepage_section', entityId, locale, 'body', section.body),
      );
      for (const [metadataKey, value] of Object.entries(section.metadata ?? {})) {
        output.push(jsonRow('homepage_section', entityId, locale, `metadata.${metadataKey}`, value));
      }
    }

    content.skills.forEach((skill, index) => {
      const entityId = skills[index]?.id;
      if (!entityId) return;
      output.push(
        textRow('skill_group', entityId, locale, 'label', skill.label),
        jsonRow('skill_group', entityId, locale, 'items', skill.items),
      );
    });

    content.experience.forEach((entry, index) => {
      const entityId = experience[index]?.id;
      if (!entityId) return;
      output.push(
        textRow('experience_entry', entityId, locale, 'role', entry.role),
        textRow('experience_entry', entityId, locale, 'summary', entry.summary),
      );
    });

    content.recognition.forEach((entry, index) => {
      const entityId = recognition[index]?.id;
      if (!entityId) return;
      output.push(
        textRow('recognition_entry', entityId, locale, 'title', entry.title),
        textRow('recognition_entry', entityId, locale, 'organization', entry.organization),
        textRow('recognition_entry', entityId, locale, 'description', entry.description),
      );
    });

    content.talks.forEach((entry, index) => {
      const entityId = talks[index]?.id;
      if (!entityId) return;
      output.push(
        textRow('talk_entry', entityId, locale, 'date_label', entry.date_label),
        textRow('talk_entry', entityId, locale, 'title', entry.title),
        textRow('talk_entry', entityId, locale, 'venue', entry.venue),
        textRow('talk_entry', entityId, locale, 'summary', entry.summary),
      );
    });

    return output.filter((row): row is TranslationSeedRow => Boolean(row));
  });

  await knex('content_translations')
    .insert(rows)
    .onConflict(['entity_type', 'entity_id', 'locale', 'field_key'])
    .merge(['value_text', 'value_json', 'source_hash', 'status']);
}
