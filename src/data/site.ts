/**
 * All site copy outside the case studies.
 * Source of truth: the "Portfolio copy deck · Home, About & global" doc.
 * Spanish (v2): copy this file to site.es.ts and translate the strings.
 */
export const site = {
  name: 'Marcos Rivera',
  email: 'MarcosDanielRG@outlook.com',
  linkedin: 'https://www.linkedin.com/in/marcos-rivera-ux',
  resume: '/Marcos-Rivera-Product-Designer-Resume.pdf',
  resumeUpdated: 'Updated Oct 2026',
  timezone: 'America/Mexico_City',
  status: 'Open to full-time roles',

  seo: {
    title: 'Marcos Rivera · Product Designer for B2B SaaS and Vertical AI',
    description:
      'Product Designer from Mexico. Research, design systems and shipped UI for B2B SaaS and AI products. Open to full-time remote roles.',
  },

  nav: [
    { key: 'work', label: 'Work', href: '/#work' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'resume', label: 'Resume', href: '/Marcos-Rivera-Product-Designer-Resume.pdf', external: true },
    { key: 'contact', label: 'Contact', href: '#contact' },
  ],

  home: {
    words: ['PRODUCT', 'DESIGNER'],
    headline: 'I design calm, precise tools for B2B SaaS and Vertical AI teams.',
    sub: 'Product Designer · UX Research · Design Systems · Based in Mexico, working remote',
    ctaWork: 'View work',
    scrollHint: 'Scroll to explore',
    work: {
      label: 'Selected work · 03',
      title: 'Three products, designed from zero.',
      lead: 'B2B tools for restaurants and travel teams. Research, systems and shipped UI, end to end.',
      cardLink: 'Read case study',
    },
    other: {
      label: 'Other work',
      title: 'Smaller projects and websites.',
      items: [
        { title: 'Axomy CRM', text: 'Internal CRM, 0 → 1', tint: 'slate' },
        { title: 'Activated Decor', text: 'E-commerce redesign', tint: 'sand' },
        { title: 'Landing pages', text: 'Framer, Figma, Wix', tint: 'slate' },
        { title: 'zealix.io', text: 'Marketing website', tint: 'brand' },
      ],
    },
    about: {
      label: 'About',
      statement:
        '2 years designing B2B products end to end, from research to QA. A technical background that makes handoff feel like collaboration.',
      stats: [
        { value: '4', label: 'Products designed 0 → 1' },
        { value: '3', label: 'Platforms shipped' },
        { value: 'C1', label: 'English' },
      ],
      link: 'More about me',
    },
  },

  about: {
    word: 'ABOUT',
    headline: 'Hi, I’m Marcos.',
    sub: 'Product Designer from Mexico. I turn messy operations into calm, precise tools.',
    chips: ['Monterrey / Puebla, MX', 'Remote or relocation', 'English C1'],
    story: {
      label: 'Story',
      title: 'How I got here.',
      paragraphs: [
        'I found design through a software engineering course that taught Figma and one idea that stuck with me: good products are shaped around the people who use them. One opportunity led to the next, and I moved fully into UX and product design.',
        'For two years at Zealix I designed two products from zero: the Operations and Admin layers of a multi-branch restaurant platform, across web, mobile and tablet. I led the research, built the design system and ran QA with engineering. In parallel I take on freelance projects through Axomy and direct clients.',
        'I’m open to teams of any size. What matters most to me is how a team works: real enthusiasm, clear communication and the shared effort it takes to design together.',
      ],
    },
    process: {
      label: 'How I work',
      title: 'From the floor to the handoff.',
      steps: [
        { n: '01', title: 'Research with real users', text: 'Interviews and on-site observation before any screen.' },
        { n: '02', title: 'Systems before screens', text: 'Tokens and components first, so every platform stays consistent.' },
        { n: '03', title: 'Prototype fast with AI', text: 'Claude, Codex and Stitch to explore flows and copy quickly.' },
        { n: '04', title: 'QA with engineering', text: 'Test what ships, track issues with the team’s tools, close the loop.' },
      ],
    },
    code: {
      label: 'Design + code',
      title: 'A designer who speaks engineering.',
      intro:
        'I have a working knowledge of HTML, CSS, JavaScript, React and Vue, plus a base in C and C++. I don’t ship production code, but I understand how what I design gets built.',
      cards: [
        { title: 'Designs that can be built', text: 'I think in components, states and edge cases, not just screens.' },
        { title: 'Smoother handoff', text: 'Specs and tokens that map 1:1 to code, so less gets lost in translation.' },
        { title: 'Prototypes in code', text: 'When a static mockup is not enough, I build it. This site is one.' },
      ],
      snippet: [
        '/* the accessibility panel, as it ships */',
        ':root[data-theme="dark"]      { --bg-base: #0A0A0B; }',
        ':root[data-material="solid"]  { --blur: 0px; }',
        ':root[data-text-size="xl"]    { font-size: 130%; }',
      ],
    },
    experience: {
      label: 'Experience',
      title: 'Where I’ve worked.',
      items: [
        {
          role: 'Product Designer · UX/UI · UX Research',
          company: 'Zealix',
          dates: 'Dec 2023 to Dec 2025',
          text: 'Designed the Operations and Admin layers from zero, built the design system, ran QA cycles.',
        },
        {
          role: 'Product Designer · Freelance, project-based',
          company: 'Axomy + direct clients',
          dates: '2023 to now',
          text: 'Axomy CRM, Viaxo, Activated Decor and landing pages.',
        },
      ],
    },
    toolkit: {
      label: 'Toolkit',
      title: 'Design, code, and AI.',
      groups: [
        { title: 'Design', items: ['Figma', 'Framer', 'Adobe Suite', 'Design systems'] },
        { title: 'Code', items: ['HTML / CSS', 'JavaScript', 'React', 'Vue', 'C', 'C++'] },
        { title: 'AI workflow', items: ['Claude', 'Codex', 'Stitch', 'Google AI'] },
      ],
    },
    built: {
      label: 'How I built this site',
      title: 'Lo-fi → design system → hi-fi → code.',
      text: 'This site is its own case study: grayscale wireframes first, then a token system where every accessibility setting is a variable mode, then hi-fi, then code.',
      steps: [
        { n: '01', title: 'Lo-fi', tint: 'slate' },
        { n: '02', title: 'Tokens + modes', tint: 'brand' },
        { n: '03', title: 'Hi-fi', tint: 'purple' },
        { n: '04', title: 'Code', tint: 'sand' },
      ],
    },
  },

  contact: {
    headline: 'Looking for my next full-time Product Design role.',
    sub: 'B2B SaaS and Vertical AI teams. Remote, or ready to relocate.',
    compactHeadline: 'Like this case? Let’s talk about your team.',
    email: 'Email me',
    meta: [
      { label: 'Location', value: 'Mexico' },
      { label: 'Local time', value: 'CST (UTC−6)', live: true },
      { label: 'Response', value: 'Within 48 hours' },
    ],
    word: 'CONTACT',
  },

  footer: {
    copy: '© 2026 Marcos Rivera',
    built: 'How I built this site',
    top: 'Back to top',
  },

  toast: {
    copied: 'Email copied',
    failed: 'Couldn’t copy. Email: MarcosDanielRG@outlook.com',
  },

  a11y: {
    title: 'Accessibility',
    trigger: 'Accessibility settings',
    close: 'Close accessibility settings',
    theme: { label: 'Theme', options: [['dark', 'Dark'], ['light', 'Light'], ['system', 'System']] },
    toggles: [
      { key: 'transparency', title: 'Reduce transparency', hint: 'Swaps glass for solid surfaces' },
      { key: 'motion', title: 'Reduce motion', hint: 'On if your system asks for it' },
      { key: 'contrast', title: 'Increase contrast', hint: 'Stronger text and borders' },
    ],
    textSize: { label: 'Text size', options: [['base', 'A', 'Default'], ['lg', 'A+', 'Large'], ['xl', 'A++', 'Extra large']] },
    saved: 'Saved on this device',
    reset: 'Reset',
    done: 'Done',
  },

  notFound: {
    word: '404',
    headline: 'This page isn’t part of the flow.',
    sub: 'The link may be old or mistyped.',
    cta: 'Back to home',
  },
} as const;

export type Tint = 'brand' | 'purple' | 'slate' | 'sand';
