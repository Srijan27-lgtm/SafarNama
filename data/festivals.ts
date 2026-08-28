export interface Festival {
  id: string;
  name: string;
  cityCode: string; // matches City.code from data/cities.ts
  state: string;
  month: string; // rough timing, not exact dates (varies yearly / lunar calendar)
  description: string;
  lat: number;
  lng: number;
}

export const festivals: Festival[] = [
  { id: "hemis", name: "Hemis Festival", cityCode: "Leh", state: "Ladakh", month: "June/July", description: "Masked Cham dances at Hemis Monastery honoring Guru Padmasambhava.", lat: 34.1526, lng: 77.5771 },
  { id: "tulip-fest", name: "Tulip Festival", cityCode: "SNR", state: "Jammu & Kashmir", month: "March/April", description: "Asia's largest tulip garden in bloom on the Zabarwan foothills.", lat: 34.0837, lng: 74.7973 },
  { id: "shimla-summer", name: "Shimla Summer Festival", cityCode: "SHM", state: "Himachal Pradesh", month: "May/June", description: "Music, folk dance, and flower shows along the Ridge.", lat: 31.1048, lng: 77.1734 },
  { id: "manali-winter-carnival", name: "Manali Winter Carnival", cityCode: "MNL", state: "Himachal Pradesh", month: "January", description: "Ski races, bonfire nights, and folk performances in the snow.", lat: 32.2432, lng: 77.1892 },
  { id: "baisakhi", name: "Baisakhi", cityCode: "ASR", state: "Punjab", month: "April", description: "Harvest festival and Sikh new year, centered at the Golden Temple.", lat: 31.6340, lng: 74.8723 },
  { id: "rose-fest", name: "Chandigarh Rose Festival", cityCode: "CDG", state: "Chandigarh", month: "February/March", description: "Thousands of rose varieties on display at Zakir Hussain Rose Garden.", lat: 30.7333, lng: 76.7794 },
  { id: "intl-yoga-fest", name: "International Yoga Festival", cityCode: "RKSH", state: "Uttarakhand", month: "February/March", description: "Week-long yoga and meditation gathering on the banks of the Ganges.", lat: 30.0869, lng: 78.2676 },
  { id: "sheetla-mata-fair", name: "Sheetla Mata Fair", cityCode: "GGM", state: "Haryana", month: "March/April", description: "Large temple fair drawing pilgrims from across the NCR.", lat: 28.4595, lng: 77.0266 },
  { id: "taj-mahotsav", name: "Taj Mahotsav", cityCode: "AGRA", state: "Uttar Pradesh", month: "February", description: "Ten-day crafts, cuisine, and culture fair near the Taj Mahal.", lat: 27.1767, lng: 78.0081 },
  { id: "dev-deepawali", name: "Dev Deepawali", cityCode: "BSB", state: "Uttar Pradesh", month: "November", description: "Lakhs of oil lamps lit along the ghats of the Ganges.", lat: 25.3176, lng: 82.9739 },
  { id: "chhath-puja", name: "Chhath Puja", cityCode: "PNBE", state: "Bihar", month: "October/November", description: "Riverside offerings to the sun god, a defining Bihari festival.", lat: 25.5941, lng: 85.1376 },
  { id: "sarhul", name: "Sarhul Festival", cityCode: "RNC", state: "Jharkhand", month: "March/April", description: "Tribal spring festival honoring the sal tree and nature spirits.", lat: 23.3441, lng: 85.3096 },
  { id: "tusu-parab", name: "Tusu Parab", cityCode: "JSR", state: "Jharkhand", month: "January", description: "Harvest festival celebrated with folk songs and river processions.", lat: 22.8046, lng: 86.2029 },
  { id: "durga-puja", name: "Durga Puja", cityCode: "KOL", state: "West Bengal", month: "September/October", description: "Kolkata's defining festival — elaborate pandals across the city.", lat: 22.5726, lng: 88.3639 },
  { id: "darjeeling-carnival", name: "Darjeeling Carnival", cityCode: "DRJ", state: "West Bengal", month: "November/December", description: "Hill-town street carnival with music, food, and craft stalls.", lat: 27.0410, lng: 88.2663 },
  { id: "losar", name: "Losar Festival", cityCode: "GTK", state: "Sikkim", month: "February", description: "Tibetan/Sikkimese new year with masked dances at monasteries.", lat: 27.3389, lng: 88.6065 },
  { id: "bihu", name: "Bihu Festival", cityCode: "GHY", state: "Assam", month: "April", description: "Assamese new year and harvest festival with folk dance and feasting.", lat: 26.1445, lng: 91.7362 },
  { id: "wangala", name: "Wangala Festival", cityCode: "SHL", state: "Meghalaya", month: "November", description: "Garo hundred-drum harvest festival near Shillong.", lat: 25.5788, lng: 91.8933 },
  { id: "nyokum-yullo", name: "Nyokum Yullo Festival", cityCode: "ITN", state: "Arunachal Pradesh", month: "February", description: "Nyishi community festival praying for prosperity and peace.", lat: 27.0844, lng: 93.6053 },
  { id: "hornbill", name: "Hornbill Festival", cityCode: "KHM", state: "Nagaland", month: "December", description: "Ten-day showcase of all of Nagaland's tribes at Kisama village.", lat: 25.6751, lng: 94.1086 },
  { id: "yaoshang", name: "Yaoshang Festival", cityCode: "IMP", state: "Manipur", month: "March", description: "Manipuri spring festival with Thabal Chongba folk dance nights.", lat: 24.8170, lng: 93.9368 },
  { id: "chapchar-kut", name: "Chapchar Kut", cityCode: "AZL", state: "Mizoram", month: "March", description: "Mizoram's biggest festival, celebrating the end of jhum cultivation.", lat: 23.7271, lng: 92.7176 },
  { id: "garia-puja", name: "Garia Puja", cityCode: "AGTL", state: "Tripura", month: "April", description: "Tribal harvest and prosperity festival honoring deity Garia.", lat: 23.8315, lng: 91.2868 },
  { id: "ekamra-utsav", name: "Ekamra Utsav", cityCode: "BBS", state: "Odisha", month: "December", description: "Heritage festival celebrating Bhubaneswar's temple architecture and crafts.", lat: 20.2961, lng: 85.8245 },
  { id: "vizag-utsav", name: "Vizag Utsav", cityCode: "VSKP", state: "Andhra Pradesh", month: "January", description: "Beachfront festival of music, food, and coastal culture.", lat: 17.6868, lng: 83.2185 },
  { id: "khajuraho-dance-fest", name: "Khajuraho Dance Festival", cityCode: "KJH", state: "Madhya Pradesh", month: "February", description: "Classical Indian dance performed against the temple complex backdrop.", lat: 24.8318, lng: 79.9199 },
  { id: "bhopal-utsav", name: "Bhopal Utsav", cityCode: "BPL", state: "Madhya Pradesh", month: "November", description: "City-wide cultural fair around the old and new lakes.", lat: 23.2599, lng: 77.4126 },
  { id: "rajim-kumbh", name: "Rajim Kumbh Mela", cityCode: "R", state: "Chhattisgarh", month: "February/March", description: "River-confluence mela near Raipur, dubbed Chhattisgarh's mini Kumbh.", lat: 21.2514, lng: 81.6296 },
  { id: "teej", name: "Teej Festival", cityCode: "JP", state: "Rajasthan", month: "July/August", description: "Monsoon festival with a grand procession of the Teej Mata idol.", lat: 26.9124, lng: 75.7873 },
  { id: "pushkar-camel-fair", name: "Pushkar Camel Fair", cityCode: "PSK", state: "Rajasthan", month: "November", description: "Massive livestock fair and carnival on the edge of the Thar.", lat: 26.4899, lng: 74.5511 },
  { id: "marwar-festival", name: "Marwar Festival", cityCode: "JU", state: "Rajasthan", month: "September/October", description: "Folk music and heritage festival honoring Rajasthani valor.", lat: 26.2389, lng: 73.0243 },
  { id: "mewar-festival", name: "Mewar Festival", cityCode: "UDP", state: "Rajasthan", month: "March/April", description: "Spring festival with a colorful procession to Gangaur Ghat.", lat: 24.5854, lng: 73.7125 },
  { id: "uttarayan", name: "Uttarayan Kite Festival", cityCode: "ADI", state: "Gujarat", month: "January", description: "Skies filled with kites for Makar Sankranti across the city.", lat: 23.0225, lng: 72.5714 },
  { id: "ganesh-chaturthi", name: "Ganesh Chaturthi", cityCode: "MUM", state: "Maharashtra", month: "August/September", description: "Ten-day citywide celebration ending in grand immersion processions.", lat: 19.0760, lng: 72.8777 },
  { id: "bonalu", name: "Bonalu Festival", cityCode: "HYD", state: "Telangana", month: "July/August", description: "Folk festival honoring goddess Mahakali with processions and offerings.", lat: 17.3850, lng: 78.4867 },
  { id: "goa-carnival", name: "Goa Carnival", cityCode: "PNJ", state: "Goa", month: "February/March", description: "Parades, floats, and street parties before Lent.", lat: 15.4909, lng: 73.8278 },
  { id: "hampi-utsav", name: "Hampi Utsav", cityCode: "HMP", state: "Karnataka", month: "November", description: "Dance, music, and puppetry staged among the ruins of Vijayanagara.", lat: 15.3350, lng: 76.4600 },
  { id: "karaga", name: "Bengaluru Karaga Festival", cityCode: "BGL", state: "Karnataka", month: "March/April", description: "Overnight temple procession, one of Bengaluru's oldest traditions.", lat: 12.9716, lng: 77.5946 },
  { id: "mysuru-dasara", name: "Mysuru Dasara", cityCode: "MYS", state: "Karnataka", month: "September/October", description: "Ten-day royal festival with an illuminated Mysore Palace and elephant procession.", lat: 12.2958, lng: 76.6394 },
  { id: "pongal", name: "Pongal", cityCode: "CHN", state: "Tamil Nadu", month: "January", description: "Tamil harvest festival marking the sun's northward journey.", lat: 13.0827, lng: 80.2707 },
  { id: "puducherry-beach-fest", name: "Puducherry Beach Festival", cityCode: "PDC", state: "Puducherry", month: "January", description: "Sand art, music, and food stalls along the Rock Beach promenade.", lat: 11.9416, lng: 79.8083 },
  { id: "cochin-carnival", name: "Cochin Carnival", cityCode: "KCI", state: "Kerala", month: "December/January", description: "Fort Kochi's New Year street carnival with a burning effigy of 'Papanai'.", lat: 9.9312, lng: 76.2673 },
  { id: "munnar-winter-fest", name: "Munnar Winter Festival", cityCode: "MNR", state: "Kerala", month: "December", description: "Hill-station festival of music and local crafts amid the tea gardens.", lat: 10.0889, lng: 77.0595 },
  { id: "island-tourism-fest", name: "Island Tourism Festival", cityCode: "PBL", state: "Andaman & Nicobar", month: "January", description: "Beachfront festival showcasing island culture and cuisine.", lat: 11.6234, lng: 92.7265 },
];