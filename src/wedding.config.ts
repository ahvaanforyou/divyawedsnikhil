/**
 * =======================================================================
 * 💍 WEDDING INVITATION — MASTER CLIENT CONFIGURATION FILE
 * =======================================================================
 * To customize this website for any client, EDIT THIS FILE!
 * 
 * 1. Replace photos in `public/client-images/` using the same names:
 *     - bride.jpg (Bride portrait)
 *     - groom.jpg (Groom portrait)
 *     - banner.jpg (Parallax quote banner)
 *     - gallery-1.jpg to gallery-4.jpg (Gallery moments)
 *     - music.mp3 (Background music)
 * 
 * 2. Edit all names, dates, parents, events, and venue details below.
 * =======================================================================
 */

export const weddingConfig = {
  // -------------------------------------------------------------
  // 1. COUPLE & PARENTS INFORMATION
  // -------------------------------------------------------------
  couple: {
    bride: 'Divya',
    groom: 'Nikhil',
    hashtag: '#DivyaWedsNikhil',

    brideRole: 'The bride',
    brideParentsNote: 'Daughter of Mr. & Mrs. Sharma',
    bridePhoto: '/client-images/bride.jpg',
    bridePhotoAlt: 'Divya, the bride',

    groomRole: 'The groom',
    groomParentsNote: 'Son of Mr. & Mrs. Verma',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Nikhil, the groom',
  },

  // -------------------------------------------------------------
  // 2. DATES & CEREMONY TIME
  // -------------------------------------------------------------
  date: {
    label: 'Sunday, 14 February 2027',
    short: '14 . 02 . 2027',
    muhurtham: 'Muhurtham at 9:45 AM',
  },

  // -------------------------------------------------------------
  // 3. INVITATION MESSAGE & FAMILY HOSTS
  // -------------------------------------------------------------
  invitation: {
    sanskritMantra: 'Om Sri Ganeshaya Namaha',
    invitationLine: 'With the blessings of our families, we invite you to share in the joy of our wedding.',
    familyLine: `Mr. & Mrs. Sharma • Mr. & Mrs. Verma
warmly invite you to celebrate
the union of two hearts`,
    doorsButtonText: 'Tap to open the doors',
    doorsSubText: 'Music will play softly',
  },

  // -------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS LOCATION
  // -------------------------------------------------------------
  venue: {
    name: 'Sri Kalyana Mandapam',
    city: 'Chennai, Tamil Nadu',
    cityName: 'Chennai', // Shows in "Join us in [City]"
    locationUnderMap: 'Chennai · Tamil Nadu · 14 . 02 . 2027', // Text displayed directly under the map frame
    description: 'Follow the golden path to Sri Kalyana Mandapam, where our families will be waiting to welcome you.',
    
    // Direct link when clicking "Open in maps"
    mapsSearchUrl: 'https://www.google.com/maps/search/Sri%20Kalyana%20Mandapam%20Chennai',
    
    // Interactive Google Maps iframe URL
    mapsEmbedUrl: 'https://www.google.com/maps?q=Sri%20Kalyana%20Mandapam%20Chennai&output=embed',
  },

  // -------------------------------------------------------------
  // 5. PARALLAX QUOTE BANNER
  // -------------------------------------------------------------
  banner: {
    image: '/client-images/banner.jpg',
    alt: 'The couple exchanging flowers',
    quote: 'Two families, one thread, and a morning we’ll remember for the rest of our lives.',
  },

  // -------------------------------------------------------------
  // 6. PHOTO GALLERY (4 MOMENTS)
  // -------------------------------------------------------------
  gallery: [
    {
      image: '/client-images/gallery-1.jpg',
      alt: 'The couple walking through a corridor',
    },
    {
      image: '/client-images/gallery-2.jpg',
      alt: 'The couple laughing together',
    },
    {
      image: '/client-images/gallery-3.jpg',
      alt: 'Hands with mehndi holding flowers',
    },
    {
      image: '/client-images/gallery-4.jpg',
      alt: 'The couple under a flower-decorated mandapam at dusk',
    },
  ],

  // -------------------------------------------------------------
  // 7. ORDER OF CELEBRATIONS / EVENTS
  // -------------------------------------------------------------
  events: [
    {
      name: 'Engagement & Sangeet',
      day: 'Saturday, 13 Feb',
      time: '5:00 PM',
      place: 'Mandapam Lawns',
      note: 'Henna, music and celebrations',
    },
    {
      name: 'Muhurtham',
      day: 'Sunday, 14 Feb',
      time: '9:45 AM',
      place: 'Sri Kalyana Mandapam',
      note: 'The wedding ceremony',
    },
    {
      name: 'Reception',
      day: 'Sunday, 14 Feb',
      time: '7:00 PM',
      place: 'Mandapam Banquet Hall',
      note: 'Dinner and celebrations',
    },
  ],

  // -------------------------------------------------------------
  // 8. BACKGROUND MUSIC
  // -------------------------------------------------------------
  music: {
    audioUrl: '/client-images/music.mp3',
  },

  // -------------------------------------------------------------
  // 9. BLESSINGS WALL CONFIGURATION
  // -------------------------------------------------------------
  blessings: {
    weddingTag: 'divya-nikhil',
    title: 'Bless the couple',
    eyebrow: 'Aashirvadam',
    prompt: 'Leave a few words for Divya & Nikhil. Every blessing is displayed here for all guests to cherish.',
  },

  // -------------------------------------------------------------
  // 10. RSVP & DATABASE (SUPABASE & GOOGLE SHEETS)
  // -------------------------------------------------------------
  rsvp: {
    enabled: true,
    supabaseUrl: 'https://ekmobqyfwzyoqkpwihun.supabase.co',
    supabaseAnonKey: 'sb_publishable_48RlgrD2RirZ85gyRJzsTA_kdNillw3',
    supabaseTable: 'blessings',
  },
};

// Backwards-compatible export for existing components
export const weddingData = {
  ...weddingConfig.couple,
  ...weddingConfig.date,
  dateLabel: weddingConfig.date.label,
  dateShort: weddingConfig.date.short,
  muhurtham: weddingConfig.date.muhurtham,
  venue: weddingConfig.venue.name,
  city: weddingConfig.venue.city,
  cityName: weddingConfig.venue.cityName,
  invitationLine: weddingConfig.invitation.invitationLine,
  familyLine: weddingConfig.invitation.familyLine,
  events: weddingConfig.events,
  banner: weddingConfig.banner,
  gallery: weddingConfig.gallery,
  blessings: weddingConfig.blessings,
};
