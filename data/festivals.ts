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
  // North
  { id: "hemis", name: "Hemis Festival", cityCode: "Leh", state: "Ladakh", month: "June/July", description: "Masked Cham dances at Hemis Monastery honoring Guru Padmasambhava.", lat: 34.1526, lng: 77.5771 },
  { id: "baisakhi", name: "Baisakhi", cityCode: "ASR", state: "Punjab", month: "April", description: "Harvest festival and Sikh new year, centered at the Golden Temple.", lat: 31.6340, lng: 74.8723 },
  { id: "holi-mathura", name: "Lathmar Holi", cityCode: "MTR", state: "Uttar Pradesh", month: "March", description: "World-famous Holi celebrations in the towns of Mathura and Vrindavan.", lat: 27.4924, lng: 77.6737 },
  { id: "kumbh-mela", name: "Kumbh Mela", cityCode: "PRY", state: "Uttar Pradesh", month: "January/February", description: "The largest peaceful gathering in the world, taking place at the Triveni Sangam.", lat: 25.4358, lng: 81.8463 },

  // East & North East
  { id: "durga-puja", name: "Durga Puja", cityCode: "KOL", state: "West Bengal", month: "September/October", description: "Kolkata's defining festival featuring elaborate pandals across the city.", lat: 22.5726, lng: 88.3639 },
  { id: "chhath-puja", name: "Chhath Puja", cityCode: "PNBE", state: "Bihar", month: "October/November", description: "Riverside offerings to the sun god, a defining Bihari festival.", lat: 25.5941, lng: 85.1376 },
  { id: "rath-yatra", name: "Rath Yatra", cityCode: "PURI", state: "Odisha", month: "June/July", description: "Massive chariot festival of Lord Jagannath, drawing millions to the coast near Bhubaneswar.", lat: 19.8135, lng: 85.8312 },
  { id: "bihu", name: "Bihu", cityCode: "GHY", state: "Assam", month: "April", description: "Assamese new year and harvest festival with iconic folk dance.", lat: 26.1445, lng: 91.7362 },
  { id: "hornbill", name: "Hornbill Festival", cityCode: "KHM", state: "Nagaland", month: "December", description: "Ten-day showcase of all of Nagaland's tribes at Kisama village.", lat: 25.6751, lng: 94.1086 },

  // West & Central
  { id: "navratri", name: "Navratri & Garba", cityCode: "ADI", state: "Gujarat", month: "September/October", description: "Nine nights of energetic Garba and Dandiya dances across the state.", lat: 23.0225, lng: 72.5714 },
  { id: "ganesh-chaturthi", name: "Ganesh Chaturthi", cityCode: "MUM", state: "Maharashtra", month: "August/September", description: "Ten-day citywide celebration ending in grand immersion processions.", lat: 19.0760, lng: 72.8777 },
  { id: "pushkar-camel-fair", name: "Pushkar Camel Fair", cityCode: "PSK", state: "Rajasthan", month: "November", description: "Massive livestock fair and cultural carnival on the edge of the Thar desert.", lat: 26.4899, lng: 74.5511 },
  { id: "goa-carnival", name: "Goa Carnival", cityCode: "PNJ", state: "Goa", month: "February/March", description: "Parades, floats, and street parties celebrated before Lent.", lat: 15.4909, lng: 73.8278 },

  // South
  { id: "onam", name: "Onam", cityCode: "TRV", state: "Kerala", month: "August/September", description: "Kerala's biggest harvest festival, famous for snake boat races and Sadya feasts.", lat: 8.5241, lng: 76.9366 },
  { id: "mysuru-dasara", name: "Mysuru Dasara", cityCode: "MYS", state: "Karnataka", month: "September/October", description: "Ten-day royal festival with an illuminated Mysore Palace and elephant procession.", lat: 12.2958, lng: 76.6394 },
  { id: "pongal", name: "Pongal", cityCode: "CHN", state: "Tamil Nadu", month: "January", description: "Tamil harvest festival marking the sun's northward journey.", lat: 13.0827, lng: 80.2707 },
  { id: "bonalu", name: "Bonalu", cityCode: "HYD", state: "Telangana", month: "July/August", description: "Folk festival honoring goddess Mahakali with processions and offerings.", lat: 17.3850, lng: 78.4867 }
];