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
    title: 'Marcos Rivera · Product & UX/UI Designer · B2B SaaS, AI and complex products',
    description:
      'Product and UX/UI Designer from Mexico. Research, design systems and shipped UI for B2B SaaS, AI and other complex products. Open to full-time remote roles.',
  },

  nav: [
    { key: 'work', label: 'Work', href: '/#work' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'resume', label: 'Resume', href: '/Marcos-Rivera-Product-Designer-Resume.pdf', external: true },
    { key: 'contact', label: 'Contact', href: '#contact' },
  ],

  home: {
    words: ['PRODUCT', 'DESIGNER'],
    headline: 'I design calm, precise tools for complex products, from B2B SaaS to AI.',
    sub: 'Product Designer · UX/UI Design · UX Research · Design Systems · Based in Mexico, working remote',
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
      /*
        Quick view (modal) content. Images only: add up to 3 per item as
        { src: '/work/axomy-1.webp', alt: '...' } (files in /public/work/).
        Until then the modal shows 3 placeholder slides. `link` shows "Visit site" when set.
      */
      items: [
        {
          title: 'Axomy CRM', text: 'Internal CRM, 0 → 1', tint: 'slate',
          body: 'A complete B2B CRM designed from 0 to 1 for Axomy’s internal client and project management.',
          facts: [['Role', 'Product Designer'], ['Year', '2025'], ['Tools', 'Figma']],
          link: null, images: [
            { src: '/work/other/axomy-permissions.webp', alt: 'Axomy CRM team and permissions page: a sidebar with brands and projects, and a table of members with role, brands, tags and last access' },
            { src: '/work/other/axomy-team.webp', alt: 'Close-up of the Axomy team table: each member with status, role badge, linked brands and tags' },
          ],
        },
        {
          title: 'Activated Decor', text: 'E-commerce redesign', tint: 'sand',
          body: 'The old store was completely out of date, so I designed a new one from zero and built it in Wix. According to the client, online sales went up after the launch.',
          facts: [['Role', 'Product Designer'], ['Year', '2025'], ['Tools', 'Figma · Wix']],
          link: null, images: [
            { src: '/work/other/activated-home.webp', alt: 'Activated Decor home page: a dark living room hero about TV lift technology with a Get a Free Quote button' },
            { src: '/work/other/activated-reviews.webp', alt: 'Reviews page with a gallery of real client projects, like a TV lift inside an RV bedroom' },
            { src: '/work/other/activated-partner.webp', alt: 'Become a Trade Partner page with the program benefits next to a contact form' },
          ],
        },
        {
          title: 'Landing pages', text: 'Framer, Figma, Wix', tint: 'slate',
          body: 'A set of landing pages, some for clients and some as practice. I handled the design on all of them.',
          facts: [['Role', 'Designer'], ['Type', 'Client and practice'], ['Tools', 'Framer · Figma · Wix']],
          link: null, images: [
            { src: '/work/other/nerdheart-hero.webp', alt: 'NerdHeart landing hero: Organiza tu mundo, potencia tus ideas, with a hand-drawn heart mascot pouring coffee' },
            { src: '/work/other/beautylab-hero.webp', alt: 'Beauty Lab landing hero: Descubre tu belleza natural, with two serum bottles and floating product and rating cards' },
            { src: '/work/other/nerdheart-pain.webp', alt: 'NerdHeart section of colorful tilted cards listing the pain points of a messy digital life' },
            { src: '/work/other/beautylab-shop.webp', alt: 'Beauty Lab shop: category filters above a grid of product cards with price, wishlist and cart buttons' },
          ],
        },
        {
          title: 'zealix.io', text: 'Marketing website', tint: 'brand',
          body: 'The Zealix marketing site, redesigned several times as the product grew. I designed every version in Figma and another team member built it; the live site is the latest one.',
          facts: [['Role', 'Product Designer'], ['Years', '2023 to now'], ['Tools', 'Figma']],
          link: 'https://zealix.io', images: [
            { src: '/work/other/zealix-home-dark.webp', srcLight: '/work/other/zealix-home-light.webp', alt: 'zealix.io home: Control your business. Get your time back, with demo and download buttons above a product preview' },
            { src: '/work/other/zealix-download-dark.webp', srcLight: '/work/other/zealix-download-light.webp', alt: 'zealix.io download page for the Windows app, with macOS coming soon' },
          ],
        },
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
    sub: 'Product and UX/UI Designer from Mexico. I turn messy operations into calm, precise tools.',
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
      tokens: {
        title: 'Figma to code, 1:1',
        caption: 'The variables I set up in Figma are the same names this site uses in CSS.',
        head: ['Figma variable', 'CSS on this site'],
        rows: [
          ['color/bg/base', '--bg-base'],
          ['color/text/primary', '--text-primary'],
          ['radius/card', '--r-card'],
          ['Theme · Light mode', '[data-theme="light"]'],
        ],
      },
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
        {
          n: '01', title: 'Lo-fi', tint: 'slate',
          text: 'Grayscale wireframes for every page and breakpoint.',
          body: 'Every page in grayscale for desktop, tablet and mobile, including the accessibility panel and the quick view. Layout and content were settled before any color.',
          facts: [['Step', '01 of 04'], ['Tool', 'Figma'], ['Output', 'Every page, 3 breakpoints']],
          link: null, images: [{ src: '/work/built/lofi-home.webp', alt: 'Grayscale wireframe of the home page on desktop' }, { src: '/work/built/lofi-mobile.webp', alt: 'Grayscale wireframes of the home, case study and about pages on mobile' }, { src: '/work/built/lofi-a11y.webp', alt: 'Wireframes of the accessibility panel as a desktop popover, tablet popover and mobile bottom sheet' }],
        },
        {
          n: '02', title: 'Tokens + modes', tint: 'brand',
          text: 'Every accessibility setting is a variable mode.',
          body: 'Theme, Material and Responsive collections in Figma. Each accessibility setting is a mode, so the same components switch theme, glass or contrast without being redrawn.',
          facts: [['Step', '02 of 04'], ['Tool', 'Figma variables'], ['Output', '4 collections, 9 modes']],
          link: null, images: [{ src: '/work/built/tokens-modes.webp', alt: 'The same hero in dark with glass, light, reduced transparency and high contrast' }, { src: '/work/built/tokens-variables.webp', alt: 'Figma Theme variables with Dark, Light and High Contrast modes mapped to neutral primitives' }, { src: '/work/built/tokens-a11y.webp', alt: 'The accessibility panel in dark and light themes' }],
        },
        {
          n: '03', title: 'Hi-fi', tint: 'purple',
          text: 'Glass, type and motion on top of the system.',
          body: 'Glass, the big background type and motion on top of the tokens, for every page and breakpoint, in dark and light.',
          facts: [['Step', '03 of 04'], ['Tool', 'Figma'], ['Output', 'Screens, components, states']],
          link: null, images: [{ src: '/work/built/hifi-home-dark.webp', alt: 'High fidelity home page in dark theme' }, { src: '/work/built/hifi-home-light.webp', alt: 'High fidelity home page in light theme' }, { src: '/work/built/hifi-mobile.webp', alt: 'High fidelity mobile screens: home, case study and about' }],
        },
        {
          n: '04', title: 'Code', tint: 'sand',
          text: 'Astro and GSAP, with tokens mapped 1:1 from Figma.',
          body: 'Built with Astro and GSAP, with the CSS tokens copied 1:1 from the Figma variables and deployed on Cloudflare. Lighthouse on mobile: 99, 100, 100, 100.',
          facts: [['Step', '04 of 04'], ['Tool', 'Astro · GSAP'], ['Output', 'This site']],
          link: null, images: [{ src: '/work/built/code-live.webp', alt: 'The live site on desktop and mobile' }, { src: '/work/built/code-tokens.webp', alt: 'CSS where every Figma variable mode is an attribute on the html element' }, { src: '/work/built/code-lighthouse.webp', alt: 'Lighthouse mobile scores: 99 performance, 100 accessibility, 100 best practices, 100 SEO' }],
        },
      ],
    },
  },

  contact: {
    headline: 'Looking for my next full-time Product Design or UX/UI role.',
    sub: 'Strongest in B2B SaaS and AI, open to any team building products people rely on. Remote, or ready to relocate.',
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

  quickView: {
    close: 'Close',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    goToImage: 'Show image',
    prevItem: 'Previous',
    nextItem: 'Next',
    visit: 'Visit site',
    image: 'Image',
    of: 'of',
    open: 'Quick view',
    pause: 'Pause images',
    play: 'Play images',
  },

  notFound: {
    word: '404',
    headline: 'This page isn’t part of the flow.',
    sub: 'The link may be old or mistyped.',
    cta: 'Back to home',
  },
} as const;

export type Tint = 'brand' | 'purple' | 'slate' | 'sand';
