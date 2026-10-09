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
    bride: 'Devi Divya Deepa',
    groom: 'Nikhil',
    hashtag: '#NikhilWedsDivya',

    brideRole: 'The bride',
    brideParentsNote: 'Daughter of Sri Kandregula Ramana & Smt Lalitha Kumari',
    bridePhoto: '/client-images/bride.jpg',
    bridePhotoAlt: 'Devi Divya Deepa, the bride',

    groomRole: 'The groom',
    groomParentsNote: 'Son of Sri Allaka Mohan Rao & Smt Rajeshwari',
    groomPhoto: '/client-images/groom.jpg',
    groomPhotoAlt: 'Nikhil, the groom',
  },

  // -------------------------------------------------------------
  // 2. DATES & CEREMONY TIME
  // -------------------------------------------------------------
  date: {
    label: 'Wednesday, 18 November 2026',
    short: '18 . 11 . 2026',
    muhurtham: 'Muhurtham at 11:31 PM',
    feast: 'Lunch / Feast at 7:00 PM',
  },

  // -------------------------------------------------------------
  // 3. INVITATION MESSAGE & FAMILY HOSTS
  // -------------------------------------------------------------
  invitation: {
    sanskritMantra: 'Om Sri Ganeshaya Namaha',
    invitationLine: 'With the blessings of our families, we invite you to share in the joy of our wedding.',
    familyLine: `Sri Allaka Mohan Rao & Smt Rajeshwari
•
Sri Kandregula Ramana & Smt Lalitha Kumari
warmly invite you to celebrate the union of two hearts`,
    doorsButtonText: 'Open Invitation',
    doorsSubText: 'Music will play softly',
  },

  // -------------------------------------------------------------
  // 4. MAIN VENUE & GOOGLE MAPS LOCATION
  // -------------------------------------------------------------
  venue: {
    name: 'Lakeberry Farm House',
    city: 'Hyderabad, Telangana',
    cityName: 'Hyderabad', // Shows in "Join us in [City]"
    address: 'Lakeberry farm house, Manchirevula, Gandhipet, Hyderabad, Telangana - 500075',
    locationUnderMap: 'Lakeberry Farm House · Hyderabad · 18 . 11 . 2026',
    description: 'Follow the golden path to Lakeberry Farm House, Manchirevula, Gandhipet, where our families will be waiting to welcome you.',
    
    // Direct link when clicking "Open in maps"
    mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Lakeberry+farm+house,+Manchirevula,+Gandhipet,+Hyderabad,+Telangana+500075',
    
    // Interactive Google Maps iframe URL
    mapsEmbedUrl: 'https://maps.google.com/maps?q=Lakeberry+farm+house,+Manchirevula,+Gandhipet,+Hyderabad,+Telangana+500075&output=embed',
  },

  // -------------------------------------------------------------
  // 5. PARALLAX QUOTE BANNER
  // -------------------------------------------------------------
  banner: {
    image: '/client-images/banner.jpg',
    alt: 'Beachside floral mandapam at sunset',
    quote: 'Two families, one sacred thread, and a beginning we’ll cherish for the rest of our lives.',
  },

  // -------------------------------------------------------------
  // 6. ORDER OF CELEBRATIONS / EVENTS (6 EVENTS)
  // -------------------------------------------------------------
  events: [
    {
      id: 'mehendi',
      name: 'Mehendi',
      tagline: 'An Evening of Henna & Music',
      day: 'Sunday, 15 Nov 2026',
      time: '7:00 PM',
      place: 'Jagsons Pride',
      address: 'Jagsons Pride, Suraram, Hyderabad, Telangana - 500055',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagsons+Pride,+Suraram,+Hyderabad,+Telangana+500055',
      embedUrl: 'https://maps.google.com/maps?q=Jagsons+Pride+Suraram+Hyderabad+Telangana+500055&output=embed',
      note: 'Intricate henna swirls, festive melodies, music and vibrant celebrations.',
      dressCode: 'Traditional / Festive Indian Attire',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      tagline: 'Dance, Beats & Joyous Celebrations',
      day: 'Monday, 16 Nov 2026',
      time: '7:00 PM',
      place: 'Jagsons Pride',
      address: 'Jagsons Pride, Suraram, Hyderabad, Telangana - 500055',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagsons+Pride,+Suraram,+Hyderabad,+Telangana+500055',
      embedUrl: 'https://maps.google.com/maps?q=Jagsons+Pride+Suraram+Hyderabad+Telangana+500055&output=embed',
      note: 'An evening of non-stop dance, soulful beats, and celebration with family & friends.',
      dressCode: 'Glamorous Evening Wear / Indo-Western',
    },
    {
      id: 'haldi',
      name: 'Haldi',
      tagline: 'Turmeric Glow & Auspicious Rites',
      day: 'Wednesday, 18 Nov 2026',
      time: '10:00 AM',
      place: 'Lakeberry Farm House',
      address: 'Lakeberry farm house, Manchirevula, Gandhipet, Hyderabad, Telangana - 500075',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lakeberry+farm+house,+Manchirevula,+Gandhipet,+Hyderabad,+Telangana+500075',
      embedUrl: 'https://maps.google.com/maps?q=Lakeberry+farm+house+Manchirevula+Gandhipet+Hyderabad+Telangana+500075&output=embed',
      note: 'Turmeric blessings, laughter, auspicious rituals and vibrant golden joy.',
      dressCode: 'Shades of Yellow & Sunshine Traditional',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      tagline: 'Sacred Union & Auspicious Muhurtham',
      day: 'Wednesday, 18 Nov 2026',
      time: 'Muhurtham at 11:31 PM · Feast at 7:00 PM',
      place: 'Lakeberry Farm House',
      address: 'Lakeberry farm house, Manchirevula, Gandhipet, Hyderabad, Telangana - 500075',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lakeberry+farm+house,+Manchirevula,+Gandhipet,+Hyderabad,+Telangana+500075',
      embedUrl: 'https://maps.google.com/maps?q=Lakeberry+farm+house+Manchirevula+Gandhipet+Hyderabad+Telangana+500075&output=embed',
      note: 'The sacred kanyadanam, jeelakarra bellam, and holy mangalsutra muhurtham uniting two souls.',
      dressCode: 'Traditional Silk Sarees & Dhotis / Royal Ethnic',
    },
    {
      id: 'reception-hyd',
      name: 'Reception (Hyderabad)',
      tagline: 'Celebration Dinner & Blessings',
      day: 'Saturday, 21 Nov 2026',
      time: '7:00 PM',
      place: 'Jagsons Pride',
      address: 'Jagsons Pride, Suraram, Hyderabad, Telangana - 500055',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagsons+Pride,+Suraram,+Hyderabad,+Telangana+500055',
      embedUrl: 'https://maps.google.com/maps?q=Jagsons+Pride+Suraram+Hyderabad+Telangana+500055&output=embed',
      note: 'Dinner, heartfelt greetings, and celebrations with our near and dear ones.',
      dressCode: 'Formal / Royal Festive Attire',
    },
    {
      id: 'reception-vizag',
      name: 'Reception (Visakhapatnam)',
      tagline: 'Grand Reception & Feast',
      day: 'Sunday, 29 Nov 2026',
      time: '7:00 PM',
      place: 'Vuda Colony, Kurmannapalem',
      address: 'No. 46/1, Survey 7, Vuda Colony, Kurmannapalem, Gajuwaka, Andhra Pradesh - 530049',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=46/1+Survey+7+Vuda+Colony+Kurmannapalem+Gajuwaka+Andhra+Pradesh+530049',
      embedUrl: 'https://maps.google.com/maps?q=46/1+Survey+7+Vuda+Colony+Kurmannapalem+Gajuwaka+Andhra+Pradesh+530049&output=embed',
      note: 'A grand celebration dinner welcoming family, friends, and well-wishers.',
      dressCode: 'Festive Elegance & Traditional Attire',
    },
  ],

  // -------------------------------------------------------------
  // 7. BACKGROUND MUSIC
  // -------------------------------------------------------------
  music: {
    audioUrl: '/client-images/music.mp3',
  },

  // -------------------------------------------------------------
  // 8. BLESSINGS WALL CONFIGURATION
  // -------------------------------------------------------------
  blessings: {
    weddingTag: 'divya-nikhil',
    title: 'Bless the couple',
    eyebrow: 'Aashirvadam',
    prompt: 'Leave a few words for Nikhil & Devi Divya Deepa. Every blessing is displayed here for all guests to cherish.',
  },

  // -------------------------------------------------------------
  // 9. RSVP & DATABASE (SUPABASE)
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
  feast: weddingConfig.date.feast,
  venue: weddingConfig.venue.name,
  city: weddingConfig.venue.city,
  cityName: weddingConfig.venue.cityName,
  address: weddingConfig.venue.address,
  invitationLine: weddingConfig.invitation.invitationLine,
  familyLine: weddingConfig.invitation.familyLine,
  events: weddingConfig.events,
  banner: weddingConfig.banner,
  blessings: weddingConfig.blessings,
};
