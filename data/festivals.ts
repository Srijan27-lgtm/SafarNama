export interface Festival {
  id: string;
  name: string;
  cityCode: string;
  state: string;
  month: string;
  description: string;
  lat: number;
  lng: number;
}

export const festivals: Festival[] = [
  // North
  { id: "hemis", name: "Hemis Festival", cityCode: "Leh", state: "Ladakh", month: "June/July", description: "Masked Cham dances at Hemis Monastery honoring Guru Padmasambhava.", lat: 34.1526, lng: 77.5771 },
  { id: "tulip-fest", name: "Tulip Festival", cityCode: "SNR", state: "Jammu & Kashmir", month: "April", description: "Asia's largest tulip garden in bloom on the Zabarwan foothills.", lat: 34.0837, lng: 74.7973 },
  { id: "shimla-summer", name: "Shimla Summer Festival", cityCode: "SHM", state: "Himachal Pradesh", month: "May/June", description: "Music, folk dance, and flower shows along the Ridge.", lat: 31.1048, lng: 77.1734 },
  { id: "manali-winter", name: "Manali Winter Carnival", cityCode: "MNL", state: "Himachal Pradesh", month: "January", description: "Ski races, bonfire nights, and folk performances in the snow.", lat: 32.2432, lng: 77.1892 },
  { id: "baisakhi", name: "Baisakhi", cityCode: "ASR", state: "Punjab", month: "April", description: "Harvest festival and Sikh new year, centered at the Golden Temple.", lat: 31.6340, lng: 74.8723 },
  { id: "rose-fest", name: "Chandigarh Rose Festival", cityCode: "CDG", state: "Chandigarh", month: "February", description: "Thousands of rose varieties on display at Zakir Hussain Rose Garden.", lat: 30.7333, lng: 76.7794 },
  { id: "intl-yoga", name: "International Yoga Festival", cityCode: "RKSH", state: "Uttarakhand", month: "March", description: "Week-long yoga and meditation gathering on the banks of the Ganges.", lat: 30.0869, lng: 78.2676 },
  { id: "sheetla-mata", name: "Sheetla Mata Fair", cityCode: "GGM", state: "Haryana", month: "March/April", description: "Large temple fair drawing pilgrims from across the NCR.", lat: 28.4595, lng: 77.0266 },
  { id: "taj-mahotsav", name: "Taj Mahotsav", cityCode: "AGRA", state: "Uttar Pradesh", month: "February", description: "Ten-day crafts, cuisine, and culture fair near the Taj Mahal.", lat: 27.1767, lng: 78.0081 },
  { id: "dev-deepawali", name: "Dev Deepawali", cityCode: "BSB", state: "Uttar Pradesh", month: "November", description: "Millions of earthen lamps lit along the ghats of the Ganges.", lat: 25.3176, lng: 82.9739 },

  // East
  { id: "chhath-puja", name: "Chhath Puja", cityCode: "PNBE", state: "Bihar", month: "October/November", description: "Riverside offerings to the sun god, a defining Bihari festival.", lat: 25.5941, lng: 85.1376 },
  { id: "sarhul", name: "Sarhul Festival", cityCode: "RNC", state: "Jharkhand", month: "March/April", description: "Tribal spring festival honoring the sal tree and nature spirits.", lat: 23.3441, lng: 85.3096 },
  { id: "tusu-parab", name: "Tusu Parab", cityCode: "JSR", state: "Jharkhand", month: "January", description: "Harvest festival celebrated with folk songs and river processions.", lat: 22.8046, lng: 86.2029 },
  { id: "durga-puja", name: "Durga Puja", cityCode: "KOL", state: "West Bengal", month: "September/October", description: "Kolkata's defining festival — elaborate pandals across the city.", lat: 22.5726, lng: 88.3639 },
  { id: "teesta-tea", name: "Teesta Tea & Tourism Festival", cityCode: "DRJ", state: "West Bengal", month: "November/December", description: "Celebration of Darjeeling's tea culture with tastings and local crafts.", lat: 27.0410, lng: 88.2663 },
  { id: "raja-parba", name: "Raja Parba", cityCode: "BBS", state: "Odisha", month: "June", description: "Unique three-day festival celebrating womanhood and the onset of monsoons.", lat: 20.2961, lng: 85.8245 },

  // North-East
  { id: "losar", name: "Losar", cityCode: "GTK", state: "Sikkim", month: "February", description: "Tibetan New Year marked by yak dances and traditional ceremonies.", lat: 27.3389, lng: 88.6065 },
  { id: "bihu", name: "Bohag Bihu", cityCode: "GHY", state: "Assam", month: "April", description: "Assamese new year and harvest festival with iconic folk dance.", lat: 26.1445, lng: 91.7362 },
  { id: "cherry-blossom", name: "Cherry Blossom Festival", cityCode: "SHL", state: "Meghalaya", month: "November", description: "Live music and events celebrating the autumn blooming of Himalayan cherry blossoms.", lat: 25.5788, lng: 91.8933 },
  { id: "nyokum", name: "Nyokum Yullo", cityCode: "ITN", state: "Arunachal Pradesh", month: "February", description: "Nyishi community agricultural festival praying for prosperity and peace.", lat: 27.0844, lng: 93.6053 },
  { id: "hornbill", name: "Hornbill Festival", cityCode: "KHM", state: "Nagaland", month: "December", description: "Ten-day grand showcase of all Nagaland tribes at Kisama village.", lat: 25.6751, lng: 94.1086 },
  { id: "yaoshang", name: "Yaoshang", cityCode: "IMP", state: "Manipur", month: "March", description: "Spring festival featuring colors, sports, and Thabal Chongba moonlight dances.", lat: 24.8170, lng: 93.9368 },
  { id: "chapchar-kut", name: "Chapchar Kut", cityCode: "AZL", state: "Mizoram", month: "March", description: "Mizoram's biggest festival celebrating the clearing of forests for jhum cultivation.", lat: 23.7271, lng: 92.7176 },
  { id: "garia-puja", name: "Garia Puja", cityCode: "AGTL", state: "Tripura", month: "April", description: "Tribal harvest and prosperity festival honoring the deity Baba Garia.", lat: 23.8315, lng: 91.2868 },

  // Central
  { id: "khajuraho-dance", name: "Khajuraho Dance Festival", cityCode: "KJH", state: "Madhya Pradesh", month: "February", description: "Classical Indian dance performances set against the stunning temple complex.", lat: 24.8318, lng: 79.9199 },
  { id: "lokrang", name: "Lokrang Festival", cityCode: "BPL", state: "Madhya Pradesh", month: "January", description: "Five-day cultural extravaganza showcasing Indian folk and tribal arts.", lat: 23.2599, lng: 77.4126 },
  { id: "rajim-kumbh", name: "Rajim Kumbh", cityCode: "R", state: "Chhattisgarh", month: "February/March", description: "Massive religious gathering at the confluence of three rivers near Raipur.", lat: 21.2514, lng: 81.6296 },

  // West
  { id: "jaipur-lit-fest", name: "Jaipur Literature Festival", cityCode: "JP", state: "Rajasthan", month: "January", description: "The world's largest free literary festival hosted at the Diggi Palace.", lat: 26.9124, lng: 75.7873 },
  { id: "pushkar-camel", name: "Pushkar Camel Fair", cityCode: "PSK", state: "Rajasthan", month: "November", description: "Massive livestock fair and cultural carnival on the edge of the Thar desert.", lat: 26.4899, lng: 74.5511 },
  { id: "jodhpur-riff", name: "Rajasthan International Folk Festival (RIFF)", cityCode: "JU", state: "Rajasthan", month: "October", description: "Roots music festival hosted in and around Mehrangarh Fort.", lat: 26.2389, lng: 73.0243 },
  { id: "mewar-fest", name: "Mewar Festival", cityCode: "UDP", state: "Rajasthan", month: "March/April", description: "Spring festival with a colorful procession of women carrying idols to Gangaur Ghat.", lat: 24.5854, lng: 73.7125 },
  { id: "navratri", name: "Navratri", cityCode: "ADI", state: "Gujarat", month: "September/October", description: "Nine nights of spectacular, statewide Garba and Dandiya Raas dancing.", lat: 23.0225, lng: 72.5714 },
  { id: "ganesh-chaturthi", name: "Ganesh Chaturthi", cityCode: "MUM", state: "Maharashtra", month: "August/September", description: "Ten-day citywide celebration ending in grand, energetic immersion processions.", lat: 19.0760, lng: 72.8777 },
  { id: "goa-carnival", name: "Goa Carnival", cityCode: "PNJ", state: "Goa", month: "February/March", description: "Colorful parades, ornate floats, and street parties celebrated before Lent.", lat: 15.4909, lng: 73.8278 },

  // South
  { id: "visakha-utsav", name: "Visakha Utsav", cityCode: "VSKP", state: "Andhra Pradesh", month: "December", description: "Four-day tourism event featuring cultural shows, food stalls, and beach events.", lat: 17.6868, lng: 83.2185 },
  { id: "bonalu", name: "Bonalu", cityCode: "HYD", state: "Telangana", month: "July/August", description: "Traditional Hindu folk festival honoring goddess Mahakali.", lat: 17.3850, lng: 78.4867 },
  { id: "hampi-utsav", name: "Hampi Utsav", cityCode: "HMP", state: "Karnataka", month: "November", description: "Cultural extravaganza of dance, music, and light shows among the ancient ruins.", lat: 15.3350, lng: 76.4600 },
  { id: "karaga", name: "Bengaluru Karaga", cityCode: "BGL", state: "Karnataka", month: "March/April", description: "One of Bengaluru's oldest festivals featuring an all-night floral procession.", lat: 12.9716, lng: 77.5946 },
  { id: "mysuru-dasara", name: "Mysuru Dasara", cityCode: "MYS", state: "Karnataka", month: "September/October", description: "Grand ten-day royal festival famous for the illuminated Mysore Palace.", lat: 12.2958, lng: 76.6394 },
  { id: "pongal", name: "Pongal", cityCode: "CHN", state: "Tamil Nadu", month: "January", description: "Four-day Tamil harvest festival thanking nature and cattle for a rich yield.", lat: 13.0827, lng: 80.2707 },
  { id: "bastille-day", name: "Bastille Day", cityCode: "PDC", state: "Puducherry", month: "July", description: "French National Day celebrated with parades and singing of the Marseillaise.", lat: 11.9416, lng: 79.8083 },
  { id: "cochin-carnival", name: "Cochin Carnival", cityCode: "KCI", state: "Kerala", month: "December/January", description: "Fort Kochi's massive New Year street carnival ending with burning the 'Papanai' effigy.", lat: 9.9312, lng: 76.2673 },
  { id: "onam-munnar", name: "Onam", cityCode: "MNR", state: "Kerala", month: "August/September", description: "Harvest festival celebrated across the state with sadya feasts and floral carpets.", lat: 10.0889, lng: 77.0595 },
  { id: "island-tourism", name: "Island Tourism Festival", cityCode: "PBL", state: "Andaman & Nicobar", month: "January", description: "Ten-day mega event showcasing arts, crafts, and culture at the ITF Ground.", lat: 11.6234, lng: 92.7265 }
];