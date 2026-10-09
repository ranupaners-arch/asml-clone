export const media = 'https://media.asml.com/asmlnetherlaaea-asmlcom-prd-5369/media/project/asmlcom/asmlcom/asml/images/';

export const images = {
  home: media + 'home/asml-tv-image-1920-x-958-asml_high_na_still_oi_f0_01.jpg?mw=1600',
  homeMachine: media + 'home/asml_nxe_mbtm_wilton_us_1178.jpg?mw=1600',
  homeTechnology: media + 'home/asml-tv-image-1920-x-958-asml_high_na_4k_clean_h264_00_54_2.jpg?mw=1600',
  holistic: media + 'products/asml-youtube-thumbnailholistic-lithographyblue-30-v2.jpg?mw=1600',
  annual: media + 'investors/financial-results/annual-report/2025/ceo-letter/asml_comp_litho_screen_05.jpg?h=1080&iar=0&w=1920',
  company: media + 'company/47129-aerial-company-section.jpg?mw=1600',
  about: media + 'home/asml_exe5200b_full_system_0172.jpg?mw=1600',
  history: media + 'company/about-asml/history/silicon-repeater-history.jpg?mw=1600',
  eighties: media + 'company/about-asml/history/9376-pas-2500-80s.jpg?mw=1200',
  nineties: media + 'company/about-asml/history/9389-pas-5500-90s.jpg?mw=1200',
  aughts: media + 'company/about-asml/history/9328-euv-alpha-00s.jpg?mw=1200',
  tens: media + 'company/about-asml/history/37567-twinscan-nxe-10s.jpg?mw=1200',
  twenties: media + 'news/stories/2021/covid-19-asml-expertise/hololens-customer-support.jpg?mw=1200',
  careers: media + 'careers/working-at-asml/life-at-asml/asml_bpop_eu_header_saeedeh.jpg?mw=1600',
  technology: media + 'technology/cleanroom/47006-cleanroom-assembly.jpg?mw=1600',
  products: media + 'technology/cleanroom/46989-cleanroom-assembly.jpg?mw=1600',
  euv: media + 'products/euv-lithography-systems/exe5000.jpg?mw=1200',
  duv: media + 'products/duv-lithography-systems/twinscan-nxt2100i.png?h=1080&iar=0&w=1920',
  software: media + 'technology/software/lines-of-code.jpg?h=1080&iar=0&w=1920',
  netherlands: media + 'careers/working-at-asml/teasers/netherlands.jpg?mw=667',
  unitedStates: media + 'careers/working-at-asml/teasers/46719-office-2019.jpg?mw=667',
  taiwan: media + 'technology/cleanroom/47046-cleanroom-euv-wafer-stage-training-2019-taiwan.jpg?mw=667',
  southKorea: media + 'technology/cleanroom/47056-cleanroom-euv-wafer-stage-training-2019-korea.jpg?mw=667',
  china: media + 'careers/working-at-asml/teasers/asml_office_awb_6h4_april2019_rgb03682_4x3.jpg?mw=667',
  germany: media + 'careers/working-at-asml/germany/asml_-berlin_research_and_development_004-cropped-1.jpg?mw=667',
  japan: media + 'technology/cleanroom/47052-cleanroom.jpg?mw=667',
};

const leaf = (title, path) => ({title, path});
const branch = (title, path, children) => ({title, path, children});
export const navigation = [
  branch('Company', '/en/company', [
    branch('About ASML', '/en/company/about-asml', [
      leaf('Vision & mission','/en/company/about-asml/vision-and-mission'),
      leaf('Organization','/en/company/about-asml/organization'),
      leaf('History','/en/company/about-asml/history'),
      leaf('Locations','/en/company/about-asml/locations'),
    ]),
    leaf('Stories','/en/company/stories'),
    branch('Governance','/en/company/governance', [
      leaf('Board of Management','/en/company/governance/board-of-management'),
      leaf('Supervisory Board','/en/company/governance/supervisory-board'),
      leaf('Shareholders','/en/company/governance/shareholders'),
      leaf('Code of Conduct','/en/company/governance/code-of-conduct'),
      leaf('How we manage risk','/en/company/governance/risk'),
      leaf('Auditors','/en/company/governance/auditors'),
      leaf('Governance downloads','/en/company/governance/governance-downloads'),
    ]),
    leaf('Sustainability','/en/company/sustainability'),
    branch('Community engagement','/en/company/community-engagement', [
      leaf('Education','/en/company/community-engagement/education'),
      leaf('Culture','/en/company/community-engagement/culture'),
      leaf('Local outreach','/en/company/community-engagement/local-outreach'),
    ]),
  ]),
  branch('Careers','/en/careers', [
    leaf('Search jobs','/en/careers/find-your-job'),
    leaf('Interviewing at ASML','/en/careers/interview-tips'),
    branch('Working at ASML','/en/careers/working-at-asml', [
      leaf('The Netherlands','/en/careers/working-at-asml/netherlands'),
      leaf('United States','/en/careers/working-at-asml/united-states'),
      leaf('Taiwan','/en/careers/working-at-asml/taiwan'),
      leaf('South Korea','/en/careers/working-at-asml/south-korea'),
      leaf('China','/en/careers/working-at-asml/china'),
      leaf('Japan','/en/careers/working-at-asml/japan'),
      leaf('Germany','/en/careers/working-at-asml/germany'),
    ]),
    leaf('Technical fields','/en/careers/technical-fields'),
    leaf('Teams','/en/careers/teams'),
    branch('Students & graduates','/en/careers/students-new-graduates', [
      leaf('Early careers','/en/careers/students-new-graduates/early-career-programs'),
      leaf('The Netherlands','/en/careers/students-new-graduates/netherlands'),
      leaf('United States','/en/careers/students-new-graduates/us'),
      leaf('Taiwan','/en/careers/students-new-graduates/taiwan'),
      leaf('South Korea','/en/careers/students-new-graduates/south-korea'),
      leaf('China','/en/careers/students-new-graduates/china'),
    ]),
  ]),
  branch('Technology','/en/technology', [
    branch('All about chips','/en/technology/all-about-microchips', [
      leaf('The basics','/en/technology/all-about-microchips/microchip-basics'),
      leaf('How microchips are made','/en/technology/all-about-microchips/how-microchips-are-made'),
      leaf("Moore's Law",'/en/technology/all-about-microchips/moores-law'),
    ]),
    branch('Lithography principles','/en/technology/lithography-principles', [
      leaf('The Rayleigh criterion','/en/technology/lithography-principles/rayleigh-criterion'),
      leaf('Light & lasers','/en/technology/lithography-principles/light-and-lasers'),
      leaf('Lenses & mirrors','/en/technology/lithography-principles/lenses-and-mirrors'),
      leaf('Mechanics & mechatronics','/en/technology/lithography-principles/mechanics-and-mechatronics'),
      leaf('Measuring accuracy','/en/technology/lithography-principles/measuring-accuracy'),
      leaf('Pushing k1 further','/en/technology/lithography-principles/pushing-k1-further'),
    ]),
    branch('How we innovate','/en/technology/how-we-innovate', [leaf('Fellows','/en/technology/how-we-innovate/fellows')]),
    leaf('Software','/en/technology/software'),
  ]),
  branch('Products','/en/products', [
    leaf('EUV lithography','/en/products/euv-lithography-systems'),
    leaf('DUV lithography','/en/products/duv-lithography-systems'),
    leaf('Refurbished systems','/en/products/refurbished-systems'),
    leaf('Metrology & inspection','/en/products/metrology-and-inspection-systems'),
    leaf('Computational lithography','/en/products/computational-lithography'),
    leaf('Customer support','/en/products/customer-support'),
  ]),
];

export const external = [
  {title:'News',path:'https://investor.asml.com/news'},
  {title:'Investors',path:'https://investor.asml.com/'},
];

export function flatten(nodes=navigation, parents=[]) {
  return nodes.flatMap(node => [{...node, parents}, ...(node.children ? flatten(node.children,[...parents,node]) : [])]);
}
export const allPages=flatten();

export const countryCards = [
  ['The Netherlands','netherlands','ASML is headquartered in Veldhoven, at the heart of a thriving high-tech ecosystem.'],
  ['United States','unitedStates','Customer support sites, factories and research centers contribute across our portfolio.'],
  ['Taiwan','taiwan','Our teams work alongside chipmakers in one of the world’s leading semiconductor hubs.'],
  ['South Korea','southKorea','Our engineers support customers and collaborate across a growing network of locations.'],
  ['Chinese mainland','china','We serve customers with support sites, research centers and training.'],
  ['Germany','germany','Precision manufacturing, optics, software development and customer support come together.'],
  ['Japan','japan','Working closely with major semiconductor companies to advance technology.'],
];

export const pageInfo = {
  '/en/company': {heading:'Inside a semiconductor industry leader',subtitle:'Find out more about ASML and how we operate',image:'company',mode:'dark',intro:'We provide chipmakers with the hardware, software and services needed to produce microchip patterns on silicon.'},
  '/en/company/about-asml': {heading:'About ASML',subtitle:'Unlocking the potential of semiconductor technology',image:'about',mode:'dark',intro:'ASML is an innovation leader in the semiconductor industry. Our systems enable chipmakers to make increasingly powerful microchips.'},
  '/en/company/about-asml/history': {heading:'History',subtitle:'Over 40 years of ingenuity and perseverance',image:'history',mode:'dark',intro:'ASML’s story spans decades of innovation, collaboration and persistence.'},
  '/en/careers': {heading:'Careers',subtitle:'Be a part of the tech company that’s a part of everything',image:'careers',mode:'dark',intro:'Bring your ideas to a place where people from many fields work together on the technology behind tomorrow’s chips.'},
  '/en/technology': {heading:'Our technology',subtitle:'Lithography uses light to print tiny patterns on silicon, a fundamental step in making microchips.',image:'technology',mode:'dark',intro:'Explore the principles, precision engineering and software behind advanced lithography.'},
  '/en/products': {heading:'Our products',subtitle:'Our holistic lithography portfolio helps chipmakers keep scaling semiconductor technology.',image:'products',mode:'split',intro:'Our portfolio brings together lithography systems, software, metrology and services for chip production.'},
};

export const historyDecades = [
  {decade:'1980s',title:'Humble beginnings',image:'eighties',summary:'ASML began in 1984 as a venture between Philips and ASMI in Eindhoven. The PAS 2000 stepper marked its first product, and a new home in Veldhoven followed soon after.',detail:'The PAS 2500 introduced alignment technology that shaped later systems. A partnership with Carl Zeiss began in 1986. Despite international expansion, the young company faced a difficult market and needed renewed investment to continue.'},
  {decade:'1990s',title:'From helping hand to IPO',image:'nineties',summary:'The PAS 5500 became the breakthrough platform that helped ASML reach customers around the world.',detail:'In 1995, ASML became an independent public company listed in Amsterdam and New York. The proceeds supported expanded research and manufacturing facilities in Veldhoven.'},
  {decade:'2000s',title:'TWINSCAN and immersion',image:'aughts',summary:'Dual-stage TWINSCAN systems and immersion lithography advanced productivity and resolution.',detail:'ASML introduced TWINSCAN in 2001 and brought immersion systems to market soon after. Acquisitions and the first YieldStar system expanded the company’s approach beyond the exposure tool.'},
  {decade:'2010s',title:'The holistic era',image:'tens',summary:'EUV lithography moved from early prototypes toward production, changing the possibilities for chip manufacturing.',detail:'Cymer joined ASML in 2013 and HMI in 2016. Together with progress in DUV and metrology, these developments broadened the holistic lithography portfolio.'},
  {decade:'2020s',title:'New challenges, new milestones',image:'twenties',summary:'Teams adapted their work through global disruption while EUV entered high-volume manufacturing.',detail:'ASML shipped the first High NA EUV system in 2023 and introduced an advanced packaging product in 2025, continuing a history of collaboration and engineering progress.'},
];
