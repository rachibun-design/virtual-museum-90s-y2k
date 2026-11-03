/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Tv, 
  Smartphone, 
  Disc, 
  ShoppingCart, 
  Megaphone, 
  Share2, 
  Radio, 
  Globe, 
  Leaf, 
  Clock, 
  Search, 
  Printer, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  X, 
  FileText, 
  Layers, 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Sparkles,
  BookOpen,
  Filter,
  Monitor,
  Gamepad2,
  Calendar,
  User,
  Info,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

// Web Audio API Retro Sound Generator (No external dependencies)
class RetroSound {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // will initialize on first user gesture
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBeep(880, 0.05);
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 440, duration = 0.08, type: OscillatorType = 'square') {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  }

  playWindowOpen() {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.06);
    setTimeout(() => this.playBeep(659.25, 0.06), 60);
    setTimeout(() => this.playBeep(783.99, 0.09), 120);
  }

  playClick() {
    this.playBeep(987.77, 0.03, 'triangle');
  }
}

const retroSound = new RetroSound();

// Core Data Structures
interface LensItem {
  id: string;
  category: string;
  title: string;
  iconName: string;
  past: {
    period: string;
    headline: string;
    items: string[];
    description: string;
    artifacts: string[];
  };
  present: {
    period: string;
    headline: string;
    items: string[];
    description: string;
    artifacts: string[];
  };
  evolution: string;
  historicalContext: string;
  sociologicalImpact: string;
}

const CORE_LENSES: LensItem[] = [
  {
    id: 'social',
    category: 'Social',
    title: 'Socialization, Play & Peer Communication',
    iconName: 'Tv',
    past: {
      period: '1990s - 2000s',
      headline: 'Street Play, After-School TV & Neighborhood Tambay',
      items: [
        'Physical outdoor games: teks, jackstones, pogs, patintero, tumbang preso',
        'Communal after-school anime: Ghost Fighter (Yu Yu Hakusho), Sailor Moon, Ang TV',
        'Landline telephone babad & early SMS on indestructible Nokia brick phones (5110, 3210)',
        'Physical neighborhood hangouts (kanto tambayan, sari-sari store benches)'
      ],
      description: 'Filipino youth socialization was tactile, synchronized by afternoon TV block programming, and anchored to geographical neighborhood borders.',
      artifacts: ['Teks Cards', 'Pogs Collection', 'Nokia 3210', 'Family Computer']
    },
    present: {
      period: 'Present Day',
      headline: 'Digital Socialization, Mobile Gaming & Virtual Hangouts',
      items: [
        'Virtual gaming ecosystems: Roblox lobbies, Mobile Legends: Bang Bang squads',
        'Algorithmic short-form video: TikTok challenges, Instagram Reels, viral memes',
        'Hyper-connected messaging: Messenger group chats, Discord community servers',
        'Ubiquitous smartphones with 24/7 instant multimedia reach'
      ],
      description: 'Socialization shifted from physical street corners to algorithmic feeds and persistent virtual lobbies, allowing continuous multi-player interaction.',
      artifacts: ['Gaming Smartphone', 'Discord Guilds', 'TikTok FYP', 'TWS Earbuds']
    },
    evolution: "Neighborhood face-to-face play laid the foundation for today's active, tightly-knit digital social networks and virtual gaming communities.",
    historicalContext: 'The late 90s saw the rapid introduction of SMS technology in the Philippines (earning the country the title "SMS Capital of the World"), which bridges traditional physical barkadas with early mobile subcultures.',
    sociologicalImpact: 'The Filipino cultural value of "pakikisama" and "barkada" did not disappear with modernization; rather, it translocated effortlessly into digital chat servers and gaming clans.'
  },
  {
    id: 'economic',
    category: 'Economic',
    title: 'Media Consumption, Commerce & Spending Patterns',
    iconName: 'ShoppingCart',
    past: {
      period: '1990s - 2000s',
      headline: 'Physical Tangible Media & Mall Tiangge Retail',
      items: [
        'Physical cassette tapes & CDs (Eraserheads, Rivermaya albums)',
        'Neighborhood video rental stores (VHS & VCD rentals, Video City)',
        'Handheld gaming hardware: Game Boys, Tamagotchi virtual pets',
        'Weekend mall tiangges, Greenhills electronics bazaars, cassette swap meets'
      ],
      description: 'Consumption required physical media ownership, dedicated hardware units, cash transactions, and weekend pilgrimages to air-conditioned mega-malls.',
      artifacts: ['Eraserheads Cutterpillow Cassette', 'Video City Card', 'Tamagotchi', 'Greenhills VCD']
    },
    present: {
      period: 'Present Day',
      headline: 'Digital Subscriptions, E-Commerce & Cashless Micro-Transactions',
      items: [
        'Cloud media streaming: Spotify Premium, Netflix, YouTube Music',
        'E-commerce giants: Shopee, Lazada, TikTok Shop, same-day delivery',
        'Fintech ubiquity: GCash, Maya, QR Ph, digital wallets for street vendors',
        'Creator economy tipping: Livestream gifting, virtual diamonds, subscription tiers'
      ],
      description: 'Economic exchange transformed from physical disc ownership to ongoing access-based subscriptions, digitized fintech rails, and instant in-app transactions.',
      artifacts: ['GCash QR Code', 'Spotify Playlist', 'Shopee Orange Parcel', 'TikTok Diamond Gift']
    },
    evolution: "90s consumer habits for physical media and retail spaces directly shaped today’s digital market economy and cloud subscription models.",
    historicalContext: 'The Asian Financial Crisis of 1997 coincided with the retail mall boom in Metro Manila, training Filipino consumers in retail leisure culture that later migrated to online flash sales.',
    sociologicalImpact: 'Filipinos transitioned from tactile ownership of cultural artifacts to fractional, immediate access, while micro-spending ("tingi" culture) survived through mobile load and in-game microtransactions.'
  },
  {
    id: 'political',
    category: 'Political',
    title: 'Public Discourse, News Media & Civic Mobilization',
    iconName: 'Megaphone',
    past: {
      period: '1990s - 2000s',
      headline: 'Traditional Broadcast TV, Broadsheets & Mass Street Mobilization',
      items: [
        'Centralized broadcast channels: ABS-CBN Channel 2, GMA Channel 7 TV Patrol',
        'Printed morning broadsheets (Philippine Daily Inquirer, Philippine Star) & tabloids',
        'Televised presidential debates and Senate inquiries watched collectively',
        'Massive physical street rallies (e.g. EDSA Dos in January 2001 mobilized by SMS chain texts)'
      ],
      description: 'Information dissemination was top-down and curated by verified newsrooms. Citizen mobilization culminated in physical presence at public highway monuments.',
      artifacts: ['TV Patrol CRT broadcast', 'Morning Broadsheet', 'Nokia Chain SMS', 'Yellow Ribbon Pin']
    },
    present: {
      period: 'Present Day',
      headline: 'Real-Time Feeds, Influencer Commentaries & Viral Hashtag Activism',
      items: [
        'Real-time digital push notifications, Twitter/X breaking news threads',
        'TikTok political explainers, YouTube vloggers, partisan micro-influencers',
        'Viral political memes, satirical graphics, infographics for Instagram stories',
        'Hashtag campaigns, donation crowd-drives, distributed online boycott movements'
      ],
      description: 'Public discourse is decentralized, algorithmically accelerated, emotionally charged, and contested in comment sections and viral video formats.',
      artifacts: ['Viral X Thread', 'TikTok Political Explainer', 'GCash Donation Drive', 'Fact-Check Infographic']
    },
    evolution: "Traditional media consumption habits prepared citizens to easily adopt and participate in modern digital political discourse and online activism.",
    historicalContext: 'EDSA Dos in 2001 is recognized globally as the first major historical uprising coordinated through cellular text messaging, foreshadowing modern social media uprisings.',
    sociologicalImpact: 'While access to information multiplied tenfold, it introduced polarization and algorithmic echo chambers, transforming citizen debate from living room discussions into continuous online comment skirmishes.'
  },
  {
    id: 'cultural',
    category: 'Cultural',
    title: 'Music, Entertainment, Love Teams & Global Influx',
    iconName: 'Disc',
    past: {
      period: '1990s - 2000s',
      headline: 'Pinoy Rock Boom, TV Love Teams & Tagalog Dubbed Anime',
      items: [
        'Pinoy Alternative Rock explosion: Eraserheads, Rivermaya, Parokya ni Edgar',
        'Iconic cinematic teen love teams: Marvin Agustin & Jolina Magdangal, Rico Yan & Claudine Barretto',
        'Tagalog-dubbed Japanese anime broadcasts: Slam Dunk, Dragon Ball Z, Sailor Moon',
        'Early dial-up internet exploration: mIRC chatrooms, Pinoy exchange forums, Geocities'
      ],
      description: 'Filipino pop culture was defined by vibrant domestic music identity, nostalgic cinematic sweethearts, and creative localization of Japanese animations.',
      artifacts: ['Cassette Tape Walkman', 'Jolina Butterfly Hair Clips', 'Slam Dunk Poster', 'mIRC Script']
    },
    present: {
      period: 'Present Day',
      headline: 'Borderless Global Streaming, P-Pop Renaissance & Viral Audio Trends',
      items: [
        'Borderless streaming platforms: Spotify Top 50 PH, Netflix original series',
        'P-Pop and K-Pop crossover: SB19, BINI, collaborative global fandom spaces',
        'Viral TikTok audio sounds creating overnight Billboard Philippine hits',
        'High-speed optical fiber, personalized AI recommendation algorithms'
      ],
      description: 'Cultural consumption is non-linear and boundaryless. Local Filipino artists (P-Pop/OPM) leverage global production values and international digital fandoms.',
      artifacts: ['BINI Lightstick', 'Spotify Wrapped 2026', 'TWS Earphones', 'Netflix Queue']
    },
    evolution: "The 90s openness to localized foreign media paved the way for today's fully globalized, interconnected, and borderless digital pop culture landscape.",
    historicalContext: 'Local television networks mastered localized dubbing in the 90s, fostering an appetite for East Asian pop culture that seamlessly transitioned into the Korean Hallyu wave and the modern P-Pop boom.',
    sociologicalImpact: 'Filipino identity transformed from consumers of Western and Asian pop culture to active participants and innovators producing globally competitive music and viral audio trends.'
  },
  {
    id: 'environmental',
    category: 'Environmental',
    title: 'Material Footprint, Ecology & Spatial Living',
    iconName: 'Leaf',
    past: {
      period: '1990s - 2000s',
      headline: 'Physical Analog Waste & Open-Air Neighborhood Play',
      items: [
        'Physical non-biodegradable waste: discarded plastic cassette shells, CD jewel cases, printed magazines',
        'Heavy reliance on open-air neighborhood street play and natural ventilation',
        'Neighborhood walking errands to sari-sari stores, local bakeries, and rental kiosks',
        'Lower domestic electrical consumption per household (no multiple always-on smart devices)'
      ],
      description: 'Physical plastic waste was localized and tangible, while everyday children and youth lifestyles remained primarily outdoors with natural daylight.',
      artifacts: ['Plastic Cassette Case', 'Glossy Song Hits Magazine', 'Sari-Sari Store Bag', 'Street Chalk']
    },
    present: {
      period: 'Present Day',
      headline: 'Electronic Waste (E-Waste), Cloud Server Footprint & Screen Migration',
      items: [
        'Rapid electronic waste (e-waste): discarded smartphones, swollen lithium batteries, charging cables',
        'Invisible carbon footprint from 24/7 global cloud data servers and streaming infrastructure',
        'Shift toward indoor, air-conditioned urban living and sedentary multi-screen usage',
        'Packaging waste from daily e-commerce deliveries (plastic bubble wrap, couriers parcels)'
      ],
      description: 'Waste transitioned from tangible analog shells to hazardous toxic e-waste and invisible server emissions, with youth migrating indoors into climate-controlled bedrooms.',
      artifacts: ['Discarded Lithium Battery', 'Shopee Bubble Wrap', 'Charging Wire Clutter', 'Air-con Remote']
    },
    evolution: "The transition from outdoor play to indoor screen dependence highlights how modern technology has altered environmental interactions and waste footprints.",
    historicalContext: 'Rapid urbanization in Philippine metropolitan centers reduced vacant lots and outdoor playgrounds, accelerating indoor screen migration for safety and comfort.',
    sociologicalImpact: 'Urban Filipino youth experience nature primarily through digital screens or curated leisure trips, creating new ecological challenges surrounding battery disposal and energy consumption.'
  },
  {
    id: 'pacing',
    category: 'Pacing / Others',
    title: 'Temporal Rhythm, Information Velocity & Attention Economy',
    iconName: 'Clock',
    past: {
      period: '1990s - 2000s',
      headline: 'Pre-Digital Scheduled Pacing & Dial-up Anticipation',
      items: [
        'Fixed television schedules: prime time soap operas and weekly Sunday variety shows at set hours',
        'Dial-up internet waiting: noisy 56k modem handshake, waiting minutes for single image downloads',
        'Waiting for physical letters, beeper notifications, and scheduled phone calls',
        'Patience and delayed gratification built into consumer entertainment cycles'
      ],
      description: 'Life cadence was governed by fixed media timetables. Filipino households synchronized dinner and family routines to network television schedules.',
      artifacts: ['Dial-up 56k Modem', 'Sunday TV Guide', 'Pocket Pager', 'Prepaid Internet Card']
    },
    present: {
      period: 'Present Day',
      headline: '24/7 Non-Stop Connectivity & The "Prosumer" Economy',
      items: [
        'Continuous 24/7 streaming notifications and infinite content scroll',
        'Instant multi-channel gratification: on-demand delivery, same-hour streaming',
        'Shift from passive audience to active "prosumers" generating content, reels, and commentaries',
        'Fragmented attention spans balanced with rapid multitasking capabilities'
      ],
      description: 'Temporal boundaries between work, leisure, study, and socializing collapsed into an always-on, real-time interactive stream.',
      artifacts: ['Push Notifications Screen', 'Infinite Scroll UI', 'Ring Light Setup', 'Smart Watch']
    },
    evolution: "90s transitional pacing prepared society for today's fast-paced digital information age and instant communication standards.",
    historicalContext: 'The gradual transition from landlines to dial-up ISPs (like Mozcom and Infocom) in the late 90s served as an incubator for the rapid digital adoption seen today.',
    sociologicalImpact: 'Filipinos evolved from passive observers of media into active "prosumers" who demand immediate responsiveness, shaping modern service and communication norms.'
  }
];

// Aspect Matrix Data
interface AspectMatrixItem {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  past: {
    title: string;
    description: string;
    keyExamples: string[];
    hardware: string;
    socialRole: string;
  };
  present: {
    title: string;
    description: string;
    keyExamples: string[];
    hardware: string;
    socialRole: string;
  };
  mediatingTransformation: string;
  academicCitation: string;
}

const ASPECT_MATRIX: AspectMatrixItem[] = [
  {
    id: 'tech',
    name: 'Technology & Media Formats',
    icon: 'Cpu',
    subtitle: 'From Analog Tangibles to Algorithmic Cloud Streams',
    past: {
      title: 'Analog, Physical Carriers & Dial-up Latency',
      description: 'Information and entertainment were anchored in discrete physical hardware carriers. High tactile interaction (rewinding tape with ballpen, blowing into cartridge).',
      keyExamples: ['Cassette tapes (OPM bands)', 'CRT Box Televisions', '56k Dial-up ISP cards', 'Nokia 5110/3210 monochrome SMS', 'Floppy disks & VHS rental cassettes'],
      hardware: 'Heavy CRT monitors, magnetic tape decks, physical copper landlines',
      socialRole: 'Shared household devices fostering collective family viewing rituals'
    },
    present: {
      title: 'Always-On Cloud, 5G Fiber & Algorithmic Feeds',
      description: 'Information is continuous, non-material, and individualized. Algorithms dictate discovery through personalized interest graphs and machine learning feeds.',
      keyExamples: ['Spotify & Apple Music streams', 'High-speed Fiber & 5G', 'Smartphone ecosystem (iOS/Android)', 'Discord community hubs', 'Cloud storage & AI-curated reels'],
      hardware: 'Bezel-less OLED smartphones, ultra-thin laptops, TWS Bluetooth buds',
      socialRole: 'Personalized private glass screens creating autonomous micro-worlds'
    },
    mediatingTransformation: 'The transition is marked by a shift from bandwidth scarcity (cherishing limited physical albums and television slots) to infinite digital abundance (where human attention, rather than media availability, is the scarce currency).',
    academicCitation: 'Pertierra, R. (2002). Mobile phones, identity, and the Philippine public sphere.'
  },
  {
    id: 'performance',
    name: 'Performance & Entertainment',
    icon: 'Tv',
    subtitle: 'From Mass Spectacles to Decentralized Creator Streams',
    past: {
      title: 'Centralized Television Studios & Stadium Gigs',
      description: 'Performance was strictly one-to-many. Professional artists performed on live network broadcasts (ASAP, GMA Supershow) and college campus concerts.',
      keyExamples: ['Sunday afternoon variety programs', 'Eraserheads & Rivermaya stadium concerts', 'Noontime comedy shows (Eat Bulaga)', 'Teen romance movies in local cinemas'],
      hardware: 'Broadcast studio cameras, analog sound stages, cinema projectors',
      socialRole: 'Unified nationwide cultural reference points discussed at school the next morning'
    },
    present: {
      title: 'Decentralized Live Streams & Interactive Fandoms',
      description: 'Performance is many-to-many. Anyone with a smartphone can broadcast live, interact directly with fans, and monetize through digital micro-tips.',
      keyExamples: ['TikTok dance challenges & duet trends', 'P-Pop fandom streaming parties (SB19, BINI)', 'Twitch & Facebook Gaming live streams', 'Short-form comedic micro-skits'],
      hardware: 'Ring lights, lavalier wireless mics, smartphone camera rigs',
      socialRole: 'Interactive parasocial relationships with immediate feedback loops'
    },
    mediatingTransformation: 'Performance moved from a guarded, studio-controlled pedestal into everyday bedrooms. Audience members graduated from passive spectators to co-creators who remix audio stems and dictate viral dance choreography.',
    academicCitation: 'Santos, K. (2020). Ang liga ay buháy: Ang pagtatagpo ng teleserye at anime sa kulturang popular.'
  },
  {
    id: 'space',
    name: 'Space & Social Geography',
    icon: 'Globe',
    subtitle: 'From Neighborhood Streets to Virtual Metaverse Lobbies',
    past: {
      title: 'Physical Tambayan & Mall Bazaars',
      description: 'Filipino space was bounded by physical architecture: the street corner ("kanto"), the local sari-sari store bench, and the air-conditioned shopping mall corridor.',
      keyExamples: ['Kanto sari-sari store benches', 'Subdivision street basketball courts', 'SM Megamall & Harrison Plaza tiangges', 'School canteen and corridor tambayan'],
      hardware: 'Concrete benches, asphalt courts, physical storefronts',
      socialRole: 'Rooted in neighborhood intimacy and physical face-to-face trust networks'
    },
    present: {
      title: 'Virtual Hangouts & Metaverse Arenas',
      description: 'The "tambayan" has decoupled from geographical constraints. Filipino youth convene in custom Roblox servers, Discord voice lounges, and private group chats.',
      keyExamples: ['Roblox custom Pinoy roleplay games', 'Mobile Legends discord squad rooms', 'Shopee & TikTok live commerce lobbies', 'Zoom / Google Meet virtual barkada sessions'],
      hardware: 'Cloud gaming servers, cross-platform voice chat channels',
      socialRole: 'Border-free digital communities uniting regional and diaspora Filipinos'
    },
    mediatingTransformation: 'The Filipino cultural imperative of "tambay" (hanging out with peers without an agenda) was not erased by technology; it translocated seamlessly into virtual lobbies where gamers chill while listening to lo-fi OPM streams.',
    academicCitation: 'Acosta, R. A. (2005). The influences of television animation and family on the play behaviors of Filipino children.'
  }
];

// Synthesis Deductions Data
interface SynthesisDeduction {
  number: string;
  title: string;
  equation: string;
  coreInsight: string;
  implication: string;
}

const SYNTHESIS_DEDUCTIONS: SynthesisDeduction[] = [
  {
    number: '01',
    title: 'Dialectical Continuity of Pinoy "Barkada" & "Tambay" Culture',
    equation: '[1990s Kanto Street Tambayan] + [Mobile Cloud Connectivity] = [Modern Virtual Discord & ML Squads]',
    coreInsight: 'Technological disruption in the Philippines did not dismantle communal youth traditions. Instead, cultural practices like "barkada" (peer group solidarity) and "tambay" (leisurely hanging out) provided the emotional framework that made Filipinos the world’s most enthusiastic adopters of social media and mobile gaming.',
    implication: 'Digital spaces in the Philippines remain inherently collective rather than individualistic, mirroring the close-knit neighborhood dynamics of the analog era.'
  },
  {
    number: '02',
    title: 'The "Tingi" Economy Transmuted into Digital Micro-Transactions',
    equation: '[1990s Sari-Sari Store Sachet Sales] + [Fintech & In-App Purchases] = [GCash Cashless Tingi & Gaming Micro-Packs]',
    coreInsight: 'The historic Philippine retail practice of "tingi" (buying single cigarettes, shampoo sachets, or 10-peso phone loads) served as the behavioral blueprint for modern digital economies: prepaid streaming passes, single TikTok diamond gifts, and daily mobile data buckets.',
    implication: 'Consumers reject rigid high-barrier monthly commitments unless offered flexible, bite-sized transactional pricing tailored to flexible everyday budgets.'
  },
  {
    number: '03',
    title: 'From Passive Audience to Sovereign "Prosumers"',
    equation: '[1990s Network TV Broadcast Monopolies] + [Decentralized Creator Algorithms] = [Filipino User-Generated Culture Leaders]',
    coreInsight: 'In the 90s, audiences were passive recipients of primetime programming and print tabloids. Today, Filipino youth act as "prosumers"—simultaneously consuming and producing culture through memes, viral TikTok trends, satirical commentary, and digital music remixes.',
    implication: 'Institutions (educational, commercial, and political) can no longer rely on top-down broadcast directives; they must engage with active peer-to-peer discourse.'
  },
  {
    number: '04',
    title: 'Glocalization: From Tagalog Anime Dubs to Global P-Pop Expansion',
    equation: '[1990s Localized Foreign Imports] + [Global Streaming Platforms] = [Internationally Competitive P-Pop & OPM Renaissance]',
    coreInsight: 'The 1990s culture of localizing foreign media (such as Tagalog-dubbed Slam Dunk and Ghost Fighter) trained Filipinos to navigate diverse cultural influences. This hybridized cultural literacy now powers groups like SB19 and BINI to compete globally while celebrating Filipino heritage.',
    implication: 'Filipino popular culture has shifted from an importer of Western and East Asian entertainment to an active exporter of globalized digital pop phenomena.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'lenses' | 'matrix' | 'synthesis' | 'references'>('lenses');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [selectedLensModal, setSelectedLensModal] = useState<LensItem | null>(null);
  const [selectedAspect, setSelectedAspect] = useState<string>('all');
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [activeColorTheme, setActiveColorTheme] = useState<'classic' | 'teal' | 'y2k'>('classic');

  // Clock in taskbar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: 'lenses' | 'matrix' | 'synthesis' | 'references') => {
    retroSound.playClick();
    setActiveTab(tab);
  };

  const handleSoundToggle = () => {
    const newState = retroSound.toggle();
    setSoundEnabled(newState);
  };

  const handleOpenLensModal = (lens: LensItem) => {
    retroSound.playWindowOpen();
    setSelectedLensModal(lens);
  };

  const handleCloseLensModal = () => {
    retroSound.playClick();
    setSelectedLensModal(null);
  };

  const handlePrint = () => {
    retroSound.playClick();
    window.print();
  };

  const handleCopyCitation = (text: string, id: string) => {
    retroSound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  // Filtered lenses
  const filteredLenses = useMemo(() => {
    return CORE_LENSES.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        item.title.toLowerCase().includes(query) ||
        item.past.items.some(i => i.toLowerCase().includes(query)) ||
        item.present.items.some(i => i.toLowerCase().includes(query)) ||
        item.evolution.toLowerCase().includes(query) ||
        item.past.artifacts.some(a => a.toLowerCase().includes(query)) ||
        item.present.artifacts.some(a => a.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Color theme styling
  const themeHeaderClass = useMemo(() => {
    switch (activeColorTheme) {
      case 'teal':
        return 'bg-gradient-to-r from-teal-800 to-teal-600 text-white';
      case 'y2k':
        return 'bg-gradient-to-r from-fuchsia-900 to-pink-700 text-white';
      case 'classic':
      default:
        return 'bg-gradient-to-r from-[#000080] via-[#0000a0] to-[#1084d0] text-white';
    }
  }, [activeColorTheme]);

  return (
    <div className={`min-h-screen py-4 px-2 sm:px-4 md:px-6 flex flex-col justify-between transition-colors duration-150`}>
      {/* Top Main Desktop Window */}
      <div 
        className={`mx-auto w-full transition-all duration-200 retro-box overflow-hidden mb-6 ${
          isWindowMaximized ? 'max-w-full' : 'max-w-6xl'
        }`}
      >
        {/* Retro Window Titlebar */}
        <div className={`px-2 py-1.5 flex items-center justify-between select-none ${themeHeaderClass}`}>
          <div className="flex items-center gap-2 truncate">
            <Monitor className="w-4 h-4 text-yellow-300 shrink-0" />
            <span className="font-pixel text-base sm:text-lg tracking-wider font-bold truncate">
              MILESTONE 2: WHAT'S POPPIN', PINOY — Digital Museum Progress Update
            </span>
          </div>
          
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button 
              onClick={handleSoundToggle}
              title={soundEnabled ? "Mute Retro Sounds" : "Enable Retro Sounds"}
              className={`p-1 text-xs retro-btn flex items-center justify-center w-6 h-6 text-slate-800 ${soundEnabled ? 'retro-btn-active' : ''}`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-900" /> : <VolumeX className="w-3.5 h-3.5 text-slate-600" />}
            </button>
            <button 
              onClick={() => setIsWindowMaximized(!isWindowMaximized)}
              title={isWindowMaximized ? "Restore Window" : "Maximize Window"}
              className="p-1 text-xs retro-btn flex items-center justify-center w-6 h-6 text-slate-800"
            >
              {isWindowMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={() => alert("Station online! 'What's Poppin', Pinoy' Milestone 2 Workstation is running in active museum review mode.")}
              title="Close / System Info"
              className="p-1 text-xs retro-btn flex items-center justify-center w-6 h-6 text-slate-800 hover:bg-red-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Windows 98 Menu Bar */}
        <div className="bg-[#c0c0c0] border-b border-[#808080] px-3 py-1 flex flex-wrap items-center justify-between text-xs text-slate-800 gap-2 no-print">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">File:</span>
              <button onClick={handlePrint} className="hover:underline flex items-center gap-1 text-slate-700">
                <Printer className="w-3 h-3 text-slate-600" /> Print / Save PDF
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-semibold text-slate-900">Theme:</span>
              <button 
                onClick={() => { retroSound.playClick(); setActiveColorTheme('classic'); }} 
                className={`px-1.5 py-0.5 rounded ${activeColorTheme === 'classic' ? 'font-bold underline' : ''}`}
              >
                Navy 95
              </button>
              <button 
                onClick={() => { retroSound.playClick(); setActiveColorTheme('teal'); }} 
                className={`px-1.5 py-0.5 rounded ${activeColorTheme === 'teal' ? 'font-bold underline' : ''}`}
              >
                Manila Teal
              </button>
              <button 
                onClick={() => { retroSound.playClick(); setActiveColorTheme('y2k'); }} 
                className={`px-1.5 py-0.5 rounded ${activeColorTheme === 'y2k' ? 'font-bold underline' : ''}`}
              >
                Cyber Y2K
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <User className="w-3 h-3 text-blue-700" /> Rachel Ann Benzon
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-700 font-medium">
              Individual Project Presentation
            </span>
          </div>
        </div>

        {/* Academic Project Subtitle Banner */}
        <div className="bg-[#f0ece4] border-b-2 border-[#808080] p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-teal-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                ACADEMIC MILESTONE 2 • SOCIO-CULTURAL RESEARCH WORKSTATION
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                WHAT'S POPPIN', PINOY: 1990s vs. Present PH Popular Culture
              </h1>
              <p className="text-sm sm:text-base text-slate-700 mt-1 max-w-4xl leading-relaxed">
                The Influence of the Past to Current Patterns in Philippine Popular Culture (1990s–2000s vs. Present Day).
                An analytical historical comparison investigating continuity, media shifts, and sociological adaptations.
              </p>
            </div>

            <div className="shrink-0 flex md:flex-col items-start sm:items-end justify-between gap-2 border-t md:border-t-0 md:border-l border-slate-300 pt-2 md:pt-0 md:pl-4">
              <div className="retro-box px-3 py-1.5 bg-[#d4d0c8] text-center w-full sm:w-auto">
                <span className="block text-[10px] uppercase font-bold text-slate-600">Milestone Status</span>
                <span className="font-pixel text-lg font-bold text-emerald-800">100% COMPLETE</span>
              </div>
              <button 
                onClick={handlePrint}
                className="retro-btn px-3 py-1.5 text-xs font-bold text-slate-900 flex items-center gap-1.5 bg-[#c0c0c0]"
              >
                <Printer className="w-3.5 h-3.5 text-slate-700" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="bg-[#c0c0c0] px-3 pt-3 flex flex-wrap gap-1 border-b-2 border-[#ffffff] no-print">
          <button
            onClick={() => handleTabChange('lenses')}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-sm transition-all ${
              activeTab === 'lenses'
                ? 'retro-tab active bg-[#c0c0c0] text-slate-900 border-t-2 border-l-2 border-r-2'
                : 'bg-[#b0b0b0] text-slate-700 hover:bg-[#b8b8b8] border border-[#999]'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-800" />
            <span>TAB 1: 📊 Executive Summary & Core Lenses</span>
          </button>

          <button
            onClick={() => handleTabChange('matrix')}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-sm transition-all ${
              activeTab === 'matrix'
                ? 'retro-tab active bg-[#c0c0c0] text-slate-900 border-t-2 border-l-2 border-r-2'
                : 'bg-[#b0b0b0] text-slate-700 hover:bg-[#b8b8b8] border border-[#999]'
            }`}
          >
            <Tv className="w-4 h-4 text-purple-800" />
            <span>TAB 2: ⚔️ Side-by-Side Aspect Matrix</span>
          </button>

          <button
            onClick={() => handleTabChange('synthesis')}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-sm transition-all ${
              activeTab === 'synthesis'
                ? 'retro-tab active bg-[#c0c0c0] text-slate-900 border-t-2 border-l-2 border-r-2'
                : 'bg-[#b0b0b0] text-slate-700 hover:bg-[#b8b8b8] border border-[#999]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-800" />
            <span>TAB 3: 💡 Synthesis & Impact Deductions</span>
          </button>

          <button
            onClick={() => handleTabChange('references')}
            className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-t-sm transition-all ${
              activeTab === 'references'
                ? 'retro-tab active bg-[#c0c0c0] text-slate-900 border-t-2 border-l-2 border-r-2'
                : 'bg-[#b0b0b0] text-slate-700 hover:bg-[#b8b8b8] border border-[#999]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>TAB 4: 📚 Academic References & Self-Assessment</span>
          </button>
        </div>

        {/* Tab Body Canvas */}
        <div className="p-4 sm:p-6 bg-[#dcd8cf] min-h-[550px]">
          
          {/* ======================================================== */}
          {/* TAB 1: EXECUTIVE SUMMARY & CORE LENSES                   */}
          {/* ======================================================== */}
          {activeTab === 'lenses' && (
            <div className="space-y-6">
              {/* Executive Summary Intro Box */}
              <div className="retro-sunken p-4 sm:p-5 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <h2 className="text-sm uppercase tracking-wider font-bold text-slate-800">
                      Executive Summary • Milestone 2 Research Synthesis
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">CODE: BENZON-POP-M2</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  This interactive research archive examines how the vibrant, tactile popular culture of the 1990s and early 2000s in the Philippines
                  functions not as a distant relic, but as the generative DNA of present-day digital phenomena. By comparing six fundamental analytical
                  dimensions (<strong>Social, Economic, Political, Cultural, Environmental, and Pacing/Temporal</strong>), this project demonstrates that
                  while media vehicles evolved from physical magnetic tapes to algorithmic cloud platforms, traditional Filipino relational values 
                  (such as <em>pakikisama</em>, <em>tambay</em>, and <em>tingi</em>) adapted and flourished within virtual spaces.
                </p>
              </div>

              {/* Filter & Search Toolbar */}
              <div className="retro-box p-3 bg-[#c0c0c0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 no-print">
                {/* Category Pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs font-bold text-slate-800 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Filter Lens:
                  </span>
                  {['All', 'Social', 'Economic', 'Political', 'Cultural', 'Environmental', 'Pacing'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { retroSound.playClick(); setSelectedCategory(cat); }}
                      className={`retro-btn px-2.5 py-1 text-xs font-medium ${
                        selectedCategory === cat ? 'retro-btn-active font-bold text-blue-900 bg-[#e0ded8]' : 'text-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-1 relative min-w-[220px]">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords (e.g. teks, Roblox, GCash, Rivermaya)..."
                    className="retro-sunken pl-8 pr-3 py-1 text-xs w-full bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-slate-500 hover:text-slate-800 px-1 absolute right-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Lenses Comparative Cards Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredLenses.length === 0 ? (
                  <div className="retro-sunken p-8 text-center bg-white text-slate-600">
                    <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-bold">No lenses match your search criteria.</p>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the lens filter or clearing your search term.</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                      className="retro-btn px-3 py-1 text-xs mt-3 font-semibold"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredLenses.map((lens) => (
                    <div key={lens.id} className="retro-box overflow-hidden bg-[#c8c4bc]">
                      {/* Lens Card Header */}
                      <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-pixel text-yellow-300 text-sm tracking-wide">
                            [{lens.category.toUpperCase()} LENS]
                          </span>
                          <span className="text-xs font-bold text-slate-100 truncate">
                            {lens.title}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOpenLensModal(lens)}
                          className="retro-btn px-2 py-0.5 text-[11px] font-bold text-slate-900 bg-[#dfdfdf] flex items-center gap-1 no-print"
                        >
                          <Info className="w-3 h-3 text-blue-700" /> Deep-Dive Notes
                        </button>
                      </div>

                      {/* Side-by-Side Past vs Present Section */}
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1990s Box */}
                        <div className="retro-sunken p-3.5 bg-[#fbf9f5] flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-2">
                              <span className="font-pixel text-xs tracking-wider text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 border border-amber-300">
                                PAST (1990s - 2000s)
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">Analog Era</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 mb-2">
                              {lens.past.headline}
                            </h4>
                            <p className="text-xs text-slate-600 mb-3 italic">
                              {lens.past.description}
                            </p>
                            <ul className="space-y-1.5 text-xs text-slate-800">
                              {lens.past.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-amber-700 font-bold">›</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Artifacts strip */}
                          <div className="mt-4 pt-2 border-t border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                              Tangible 90s Artifacts:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {lens.past.artifacts.map((art, aIdx) => (
                                <span key={aIdx} className="text-[11px] px-1.5 py-0.5 bg-slate-200 text-slate-800 border border-slate-300">
                                  📼 {art}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Present Day Box */}
                        <div className="retro-sunken p-3.5 bg-[#f5f8fb] flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between border-b border-blue-200 pb-1.5 mb-2">
                              <span className="font-pixel text-xs tracking-wider text-blue-800 font-bold bg-blue-100 px-1.5 py-0.5 border border-blue-300">
                                PRESENT DAY
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">Digital Cloud Era</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 mb-2">
                              {lens.present.headline}
                            </h4>
                            <p className="text-xs text-slate-600 mb-3 italic">
                              {lens.present.description}
                            </p>
                            <ul className="space-y-1.5 text-xs text-slate-800">
                              {lens.present.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-blue-700 font-bold">›</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Present artifacts */}
                          <div className="mt-4 pt-2 border-t border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                              Present Digital Touchpoints:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {lens.present.artifacts.map((art, aIdx) => (
                                <span key={aIdx} className="text-[11px] px-1.5 py-0.5 bg-blue-100 text-blue-900 border border-blue-300">
                                  📱 {art}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Evolution / Sociological Impact Callout Banner */}
                      <div className="px-4 py-3 bg-[#e8e4dc] border-t border-[#808080]">
                        <div className="flex items-start gap-2.5">
                          <TrendingUp className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-bold uppercase text-emerald-900 tracking-wider block">
                              Evolutionary Bridge & Sociological Deduction:
                            </span>
                            <p className="text-xs sm:text-sm font-medium text-slate-900 mt-0.5">
                              {lens.evolution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SIDE-BY-SIDE ASPECT MATRIX                        */}
          {/* ======================================================== */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              {/* Matrix Introduction */}
              <div className="retro-sunken p-4 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-2">
                  <Monitor className="w-4 h-4 text-purple-700" />
                  <h3 className="text-sm uppercase tracking-wider font-bold text-slate-900">
                    Tripartite Aspect Matrix: Technology • Performance • Space
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  To understand the systemic shift in Philippine popular culture between the 1990s and present day, this matrix breaks down cultural practice into three constitutive aspects: 
                  <strong> Technology</strong> (the physical vs. cloud media carriers), 
                  <strong> Performance</strong> (the modes of staging and witnessing entertainment), and 
                  <strong> Space</strong> (the physical versus virtual realms where Filipinos gather).
                </p>
              </div>

              {/* Aspect Switcher Buttons */}
              <div className="retro-box p-2 bg-[#c0c0c0] flex items-center gap-2 flex-wrap no-print">
                <span className="text-xs font-bold text-slate-800 ml-1">Aspect Focus:</span>
                <button
                  onClick={() => { retroSound.playClick(); setSelectedAspect('all'); }}
                  className={`retro-btn px-3 py-1 text-xs font-semibold ${selectedAspect === 'all' ? 'retro-btn-active text-blue-900 font-bold' : ''}`}
                >
                  All 3 Aspects
                </button>
                <button
                  onClick={() => { retroSound.playClick(); setSelectedAspect('tech'); }}
                  className={`retro-btn px-3 py-1 text-xs font-semibold ${selectedAspect === 'tech' ? 'retro-btn-active text-blue-900 font-bold' : ''}`}
                >
                  1. Technology & Media Formats
                </button>
                <button
                  onClick={() => { retroSound.playClick(); setSelectedAspect('performance'); }}
                  className={`retro-btn px-3 py-1 text-xs font-semibold ${selectedAspect === 'performance' ? 'retro-btn-active text-blue-900 font-bold' : ''}`}
                >
                  2. Performance & Entertainment
                </button>
                <button
                  onClick={() => { retroSound.playClick(); setSelectedAspect('space'); }}
                  className={`retro-btn px-3 py-1 text-xs font-semibold ${selectedAspect === 'space' ? 'retro-btn-active text-blue-900 font-bold' : ''}`}
                >
                  3. Space & Geography
                </button>
              </div>

              {/* Aspect Comparative Cards */}
              <div className="space-y-6">
                {ASPECT_MATRIX.filter(item => selectedAspect === 'all' || item.id === selectedAspect).map(aspect => (
                  <div key={aspect.id} className="retro-box bg-[#c8c4bc] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-yellow-300 text-base">
                          [ASPECT: {aspect.name.toUpperCase()}]
                        </span>
                        <span className="text-xs text-slate-300 hidden sm:inline">
                          • {aspect.subtitle}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 border border-cyan-800">
                        REF: {aspect.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Side-by-side comparison */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 1990s Aspect Column */}
                      <div className="retro-sunken p-4 bg-[#fdfbf7] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200">
                            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                              📼 1990s Analog Paradigm
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">1990 - 2000</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1.5">{aspect.past.title}</h4>
                          <p className="text-xs text-slate-700 leading-relaxed mb-3">{aspect.past.description}</p>
                          
                          <div className="space-y-2 mb-3">
                            <span className="text-[11px] uppercase font-bold text-slate-600 block">Typical Cultural Instances:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {aspect.past.keyExamples.map((ex, exIdx) => (
                                <span key={exIdx} className="text-xs bg-amber-50 text-amber-950 border border-amber-200 px-2 py-0.5">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                          <p><strong>Primary Hardware:</strong> {aspect.past.hardware}</p>
                          <p><strong>Social Dimension:</strong> {aspect.past.socialRole}</p>
                        </div>
                      </div>

                      {/* Present Day Aspect Column */}
                      <div className="retro-sunken p-4 bg-[#f6f9fc] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-200">
                            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                              📱 Present Cloud Paradigm
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">2020s+</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-1.5">{aspect.present.title}</h4>
                          <p className="text-xs text-slate-700 leading-relaxed mb-3">{aspect.present.description}</p>
                          
                          <div className="space-y-2 mb-3">
                            <span className="text-[11px] uppercase font-bold text-slate-600 block">Typical Cultural Instances:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {aspect.present.keyExamples.map((ex, exIdx) => (
                                <span key={exIdx} className="text-xs bg-blue-50 text-blue-950 border border-blue-200 px-2 py-0.5">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                          <p><strong>Primary Hardware:</strong> {aspect.present.hardware}</p>
                          <p><strong>Social Dimension:</strong> {aspect.present.socialRole}</p>
                        </div>
                      </div>
                    </div>

                    {/* Mediating Transformation */}
                    <div className="bg-[#ded9ce] p-3.5 border-t border-[#808080]">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-900 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold uppercase text-purple-900 tracking-wider">
                            Mediating Sociological Transformation:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-900 mt-0.5 leading-relaxed font-medium">
                            {aspect.mediatingTransformation}
                          </p>
                          <span className="text-[11px] text-slate-600 mt-1 block italic">
                            Grounding Citation: {aspect.academicCitation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aspect Matrix Summary Table */}
              <div className="retro-box overflow-hidden bg-white">
                <div className="bg-slate-700 text-white px-3 py-1.5 font-bold text-xs">
                  Summary Comparison Matrix Table
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300 text-slate-800">
                        <th className="p-2.5 font-bold border-r border-slate-200">Dimension</th>
                        <th className="p-2.5 font-bold border-r border-slate-200 bg-amber-50/50">1990s Analog Era</th>
                        <th className="p-2.5 font-bold border-r border-slate-200 bg-blue-50/50">Present Day Digital Era</th>
                        <th className="p-2.5 font-bold">Key Transition Vector</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200">Technology</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">Cassettes, CRT TV, SMS 3210, Dial-up 56k</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">Cloud streaming, 5G Fiber, Smartphones, AI feeds</td>
                        <td className="p-2.5 text-slate-700">From tactile scarcity to algorithmic abundance</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200">Performance</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">Live Sunday TV, Stadium OPM concerts, Love teams</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">TikTok challenges, P-Pop fandoms, Creator live-streams</td>
                        <td className="p-2.5 text-slate-700">From 1-to-many broadcast to decentralized remix culture</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900 border-r border-slate-200">Space</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">Kanto tambayan, Sari-sari benches, Mall tiangges</td>
                        <td className="p-2.5 text-slate-700 border-r border-slate-200">Roblox worlds, Discord servers, Shopee live chat</td>
                        <td className="p-2.5 text-slate-700">Re-spatialization of "tambay" into virtual social lobbies</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: SYNTHESIS & IMPACT DEDUCTIONS                     */}
          {/* ======================================================== */}
          {activeTab === 'synthesis' && (
            <div className="space-y-6">
              {/* Banner */}
              <div className="retro-sunken p-4 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm uppercase tracking-wider font-bold text-slate-900">
                    Synthesis: How the 1990s Seeded Contemporary Filipino Pop Culture
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The primary thesis of this project is that <strong>modern Filipino digital behavior is not a Western or East Asian imposition</strong>,
                  but a culturally pre-conditioned evolution. The communicative rituals forged in the 1990s street corners and early cellular networks
                  directly established the mental models and communal habits that explain why the Philippines is consistently recognized globally 
                  as a powerhouse of social media engagement, digital fandoms, and viral content production.
                </p>
              </div>

              {/* Deductions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SYNTHESIS_DEDUCTIONS.map((ded) => (
                  <div key={ded.number} className="retro-box bg-[#c8c4bc] flex flex-col justify-between overflow-hidden">
                    <div>
                      {/* Card Titlebar */}
                      <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between">
                        <span className="font-pixel text-yellow-300 text-base">
                          DEDUCTION {ded.number}
                        </span>
                        <span className="text-[10px] font-mono text-slate-300 uppercase">
                          SOCIOLOGICAL THEOREM
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {ded.title}
                        </h4>

                        {/* Equation Box */}
                        <div className="retro-sunken p-2 bg-[#f4f7f6] border border-emerald-300 font-mono text-xs text-emerald-950 font-semibold text-center">
                          {ded.equation}
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                            Core Research Insight:
                          </span>
                          <p className="text-xs text-slate-800 leading-relaxed">
                            {ded.coreInsight}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#ded9cf] border-t border-[#808080] text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Sociological Implication:</span>
                      <p className="italic text-slate-800">{ded.implication}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Dialectical Timeline Diagram */}
              <div className="retro-box bg-white p-4">
                <div className="border-b border-slate-200 pb-2 mb-4">
                  <h4 className="text-xs uppercase font-bold text-slate-700 tracking-wider">
                    Dialectical Continuity Trajectory: 1990s Analog Foundations → 2020s Hyper-Digital Reality
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="retro-sunken p-3 bg-amber-50/60 border border-amber-200">
                    <span className="font-pixel text-xs text-amber-900 font-bold block">PHASE I: 1990s</span>
                    <span className="font-bold text-xs text-slate-900 block mt-1">Tactile & Localized</span>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Street games (teks, pogs), OPM cassette boom, TV scheduled appointments, and face-to-face barkada tambayan.
                    </p>
                  </div>

                  <div className="retro-sunken p-3 bg-teal-50/60 border border-teal-200">
                    <span className="font-pixel text-xs text-teal-900 font-bold block">PHASE II: 2000s</span>
                    <span className="font-bold text-xs text-slate-900 block mt-1">Transitional Mobile</span>
                    <p className="text-[11px] text-slate-600 mt-1">
                      SMS explosion ("Text Capital of the World"), Friendster/mIRC chatrooms, Video City VCD rentals, and early cyber-cafes.
                    </p>
                  </div>

                  <div className="retro-sunken p-3 bg-blue-50/60 border border-blue-200">
                    <span className="font-pixel text-xs text-blue-900 font-bold block">PHASE III: PRESENT</span>
                    <span className="font-bold text-xs text-slate-900 block mt-1">Ubiquitous Cloud & Remix</span>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Mobile Legends, TikTok creator economy, GCash micro-fintech, P-Pop global fandoms, and virtual world lobbies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: ACADEMIC REFERENCES & SELF-ASSESSMENT             */}
          {/* ======================================================== */}
          {activeTab === 'references' && (
            <div className="space-y-6">
              {/* References Section */}
              <div className="retro-box bg-[#c8c4bc] overflow-hidden">
                <div className="bg-slate-800 text-white px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-100">
                      Academic References & Theoretical Grounding
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300">APA 7th Edition</span>
                </div>

                <div className="p-4 space-y-4">
                  {/* Reference 1 */}
                  <div className="retro-sunken p-3.5 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-xs text-slate-900">
                        Acosta, R. A. (2005)
                      </span>
                      <button
                        onClick={() => handleCopyCitation(
                          "Acosta, R. A. (2005). The influences of television animation and family on the play behaviors of Filipino children. Plaridel Journal.",
                          "acosta"
                        )}
                        className="retro-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-slate-800 w-fit no-print"
                      >
                        <Copy className="w-3 h-3 text-slate-600" />
                        {copiedCitation === 'acosta' ? 'Copied APA Citation!' : 'Copy Citation'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-serif italic mb-2">
                      The influences of television animation and family on the play behaviors of Filipino children. <em>Plaridel Journal: A Philippine Journal of Communication, Media, and Society</em>.
                    </p>
                    <div className="bg-slate-50 p-2 border-l-2 border-emerald-600 text-[11px] text-slate-600">
                      <strong>Relevance to Milestone 2:</strong> Provides foundational empirical evidence on how 90s television anime (like Ghost Fighter, Sailor Moon, and Slam Dunk) directly stimulated collaborative physical play behaviors (teks, roleplay) in Filipino neighborhood backyards, bridging domestic media consumption and peer socialization.
                    </div>
                  </div>

                  {/* Reference 2 */}
                  <div className="retro-sunken p-3.5 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-xs text-slate-900">
                        Pertierra, R. (2002)
                      </span>
                      <button
                        onClick={() => handleCopyCitation(
                          "Pertierra, R. (2002). Mobile phones, identity, and the Philippine public sphere. Asian Studies Journal.",
                          "pertierra"
                        )}
                        className="retro-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-slate-800 w-fit no-print"
                      >
                        <Copy className="w-3 h-3 text-slate-600" />
                        {copiedCitation === 'pertierra' ? 'Copied APA Citation!' : 'Copy Citation'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-serif italic mb-2">
                      Mobile phones, identity, and the Philippine public sphere. <em>Asian Studies Journal</em>.
                    </p>
                    <div className="bg-slate-50 p-2 border-l-2 border-emerald-600 text-[11px] text-slate-600">
                      <strong>Relevance to Milestone 2:</strong> Crucial monograph documenting the Philippines' transition to cellular communication. Explains how early SMS on Nokia brick phones expanded the Filipino "public sphere", enabled political mobilization during EDSA Dos (2001), and paved the way for modern digital activism and chat culture.
                    </div>
                  </div>

                  {/* Reference 3 */}
                  <div className="retro-sunken p-3.5 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                      <span className="font-bold text-xs text-slate-900">
                        Santos, K. (2020)
                      </span>
                      <button
                        onClick={() => handleCopyCitation(
                          "Santos, K. (2020). Ang liga ay buháy: Ang pagtatagpo ng teleserye at anime sa kulturang popular. Plaridel Journal.",
                          "santos"
                        )}
                        className="retro-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-slate-800 w-fit no-print"
                      >
                        <Copy className="w-3 h-3 text-slate-600" />
                        {copiedCitation === 'santos' ? 'Copied APA Citation!' : 'Copy Citation'}
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-serif italic mb-2">
                      Ang liga ay buháy: Ang pagtatagpo ng teleserye at anime sa kulturang popular. <em>Plaridel Journal: A Philippine Journal of Communication, Media, and Society</em>.
                    </p>
                    <div className="bg-slate-50 p-2 border-l-2 border-emerald-600 text-[11px] text-slate-600">
                      <strong>Relevance to Milestone 2:</strong> Analyzes the intersection between local Philippine television serials (teleseryes) and Japanese anime localization. Demonstrates how 1990s cultural hybridity created the aesthetic sensibilities and narrative expectations that underpin modern P-Pop, web series, and anime conventions in the Philippines today.
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Self-Assessment & Milestone 2 Audit */}
              <div className="retro-box bg-[#c8c4bc] overflow-hidden">
                <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-100">
                      Milestone 2 Student Self-Assessment & Rubric Reflection
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300">STATUS: ON TRACK</span>
                </div>

                <div className="p-4 space-y-4">
                  {/* Student Details Card */}
                  <div className="retro-sunken p-3 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] font-bold block">Researcher / Presenter:</span>
                      <span className="font-bold text-slate-900">Rachel Ann Benzon</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] font-bold block">Course Presentation:</span>
                      <span className="font-bold text-slate-900">Philippine Popular Culture (Individual)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] font-bold block">Deliverable Milestone:</span>
                      <span className="font-bold text-emerald-800">Milestone 2 (Progress Update & Matrix)</span>
                    </div>
                  </div>

                  {/* Rubric Alignment Gauges */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Core Rubric Competency Fulfillment:
                    </h4>

                    {/* Progress Item 1 */}
                    <div className="retro-sunken p-3 bg-white space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800">1. Historical Breadth across 6 Core Lenses</span>
                        <span className="font-pixel text-sm font-bold text-emerald-700">100% COMPLETE</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 border border-slate-300">
                        <div className="bg-emerald-600 h-full w-full"></div>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        All required lenses (Social, Economic, Political, Cultural, Environmental, Pacing) comprehensively researched with 1990s vs. Present data points and explicit evolution statements.
                      </p>
                    </div>

                    {/* Progress Item 2 */}
                    <div className="retro-sunken p-3 bg-white space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800">2. Tripartite Aspect Matrix (Technology, Performance, Space)</span>
                        <span className="font-pixel text-sm font-bold text-emerald-700">100% COMPLETE</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 border border-slate-300">
                        <div className="bg-emerald-600 h-full w-full"></div>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Systemic side-by-side comparative matrix finalized, delineating hardware artifacts, mediating transformations, and spatial shifts.
                      </p>
                    </div>

                    {/* Progress Item 3 */}
                    <div className="retro-sunken p-3 bg-white space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-800">3. Theoretical Grounding & Scholarly Literature Integration</span>
                        <span className="font-pixel text-sm font-bold text-emerald-700">95% GROUNDED</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 border border-slate-300">
                        <div className="bg-emerald-600 h-full w-[95%]"></div>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Accurately linked to core seminal works (Acosta 2005, Pertierra 2002, Santos 2020) examining Philippine media, youth play, and cellular public spheres.
                      </p>
                    </div>
                  </div>

                  {/* Upcoming Milestone 3 Roadmap */}
                  <div className="retro-sunken p-3 bg-amber-50/50 border border-amber-300">
                    <span className="text-xs uppercase font-bold text-amber-900 block mb-1">
                      Roadmap to Final Milestone 3 (Interactive Digital Museum Deployment):
                    </span>
                    <ul className="text-xs text-slate-800 space-y-1 list-disc pl-4">
                      <li>Curate interactive high-resolution archival photo gallery (scanned 90s cassette inlays, Jolina butterfly clips, teks cards).</li>
                      <li>Incorporate audio snippet players for 90s dial-up modem handshakes and nostalgic Eraserheads guitar riffs.</li>
                      <li>Finalize student reflection paper synthesizing peer review feedback from Milestone 2.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Retro Window Bottom Status Bar */}
        <div className="bg-[#c0c0c0] border-t-2 border-[#808080] px-3 py-1 text-xs text-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              Workstation Status: ONLINE
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-600">
              Active View: {activeTab.toUpperCase()}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-600">
              Total Lenses: 6 Analyzed
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <span className="font-mono text-[11px]">Mem: 64MB OK</span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-[11px]">Milestone 2.0.4</span>
          </div>
        </div>
      </div>

      {/* Retro Bottom Taskbar (Windows 98 Style) */}
      <footer className="w-full max-w-6xl mx-auto retro-box bg-[#c0c0c0] p-1 flex items-center justify-between text-xs no-print">
        <div className="flex items-center gap-2">
          {/* Start Button */}
          <button 
            onClick={() => {
              retroSound.playClick();
              alert("WHAT'S POPPIN', PINOY: 1990s vs. Present PH Popular Culture\nResearcher: Rachel Ann Benzon\nMilestone 2 Complete\nAll data verified for academic presentation.");
            }}
            className="retro-btn px-2.5 py-1 font-bold text-slate-900 flex items-center gap-1.5"
          >
            <span className="font-pixel text-base font-extrabold text-blue-800">PINOY</span>
            <span className="font-bold text-xs">Start</span>
          </button>

          {/* Active Task Window Button */}
          <div className="retro-sunken-dark px-2.5 py-1 text-slate-900 font-medium text-xs flex items-center gap-1.5 truncate max-w-[220px] sm:max-w-xs">
            <Monitor className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="truncate">Milestone 2: What's Poppin', Pinoy</span>
          </div>
        </div>

        {/* System Tray */}
        <div className="retro-sunken px-2 py-0.5 flex items-center gap-3 text-[11px] font-mono text-slate-800 bg-[#dfdfdf]">
          <button 
            onClick={handleSoundToggle}
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            className="hover:text-blue-800"
          >
            {soundEnabled ? <Volume2 className="w-3 h-3 text-blue-700" /> : <VolumeX className="w-3 h-3 text-slate-500" />}
          </button>
          <span>{currentTime || '12:00:00 PM'}</span>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* DEEP-DIVE LENS MODAL INSPECTOR                           */}
      {/* ======================================================== */}
      {selectedLensModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-6 no-print">
          <div className="retro-box w-full max-w-2xl bg-[#c0c0c0] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            {/* Modal Titlebar */}
            <div className={`px-2 py-1.5 flex items-center justify-between select-none ${themeHeaderClass}`}>
              <div className="flex items-center gap-2 truncate">
                <Info className="w-4 h-4 text-yellow-300" />
                <span className="font-pixel text-base font-bold tracking-wide truncate">
                  DEEP-DIVE ARTIFACT INSPECTOR: {selectedLensModal.title}
                </span>
              </div>
              <button 
                onClick={handleCloseLensModal}
                className="retro-btn p-0.5 w-5 h-5 flex items-center justify-center text-slate-900 hover:bg-red-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto bg-[#dcd8cf]">
              <div className="retro-sunken p-3 bg-white">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  Lens Classification:
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedLensModal.category} Lens: {selectedLensModal.title}
                </h3>
              </div>

              {/* Historical Context */}
              <div className="retro-sunken p-3.5 bg-[#fbf9f5] border border-amber-300">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                  <Clock className="w-3.5 h-3.5" /> 1990s Historical Genesis & Media Environment:
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {selectedLensModal.historicalContext}
                </p>
              </div>

              {/* Sociological Impact */}
              <div className="retro-sunken p-3.5 bg-[#f5f8fb] border border-blue-300">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Contemporary Sociological Evolution:
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {selectedLensModal.sociologicalImpact}
                </p>
              </div>

              {/* Artifacts Catalog */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="retro-box p-2.5 bg-[#d4d0c8]">
                  <span className="text-[10px] font-bold uppercase text-amber-900 block mb-1">
                    Analog Era Artifacts (1990s):
                  </span>
                  <ul className="text-xs text-slate-800 space-y-1">
                    {selectedLensModal.past.artifacts.map((art, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-amber-800 font-bold">›</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="retro-box p-2.5 bg-[#d4d0c8]">
                  <span className="text-[10px] font-bold uppercase text-blue-900 block mb-1">
                    Digital Touchpoints (Present):
                  </span>
                  <ul className="text-xs text-slate-800 space-y-1">
                    {selectedLensModal.present.artifacts.map((art, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-blue-800 font-bold">›</span>
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#c0c0c0] border-t-2 border-[#808080] p-2.5 flex justify-end">
              <button
                onClick={handleCloseLensModal}
                className="retro-btn px-4 py-1 text-xs font-bold text-slate-900"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Only Header */}
      <div className="hidden print:block text-black p-4">
        <h1 className="text-2xl font-bold">WHAT'S POPPIN', PINOY: 1990s vs. Present PH Popular Culture</h1>
        <p className="text-sm">Milestone 2 Academic Progress Update • Author: Rachel Ann Benzon</p>
      </div>
    </div>
  );
}
