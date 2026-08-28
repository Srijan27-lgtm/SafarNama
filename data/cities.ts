export interface City {
  name: string;
  state: string;
  code: string; // used later in ItineraryCard's "Trip Ticket · CODE"
}

export const cities: City[] = [
  { name: "Leh", state: "Ladakh", code: "Leh"},
  { name: "Srinagar", state: "Jammu & Kashmir", code: "SNR"},
  { name: "Shimla", state: "Himachal Pradesh", code: "SHM"},
  { name: "Manali", state: "Himachal Pradesh", code: "MNL"},
  { name: "Amritsar", state: "Punjab", code: "ASR"},
  { name: "Chandigarh", state: "Chandigarh", code: "CDG"},
  { name: "Rishikesh", state: "Uttarakhand", code: "RKSH"},
  { name: "Gurugram", state: "Haryana", code: "GGM"},
  { name: "Agra", state: "Uttar Pradesh", code: "AGRA"},
  { name: "Varanasi", state: "Uttar Pradesh", code: "BSB"},
  { name: "Patna", state: "Bihar", code: "PNBE"},
  { name: "Ranchi", state: "Jharkhand", code: "RNC"},
  { name: "Jamshedpur", state: "Jharkhand", code: "JSR"},
  { name: "Kolkata", state: "West Bengal", code: "KOL"},
  { name: "Darjeeling", state: "West Bengal", code: "DRJ"},
  { name: "Gangtok", state: "Sikkim", code: "GTK"},
  { name: "Guwahati", state: "Assam", code: "GHY"},
  { name: "Shillong", state: "Meghalaya", code: "SHL"},
  { name: "Itanagar", state: "Arunachal Pradesh", code: "ITN"},
  { name: "Kohima", state: "Nagaland", code: "KHM"},
  { name: "Imphal", state: "Manipur", code: "IMP"},
  { name: "Aizawl", state: "Mizoram", code: "AZL"},
  { name: "Agartala", state: "Tripura", code: "AGTL"},
  { name: "Bhubaneswar", state: "Odisha", code: "BBS"},
  { name: "Visakhapatnam", state: "Andhra Pradesh", code: "VSKP"},
  { name: "Khajuraho", state: "Madhya Pradesh", code: "KJH"},
  { name: "Bhopal", state: "Madhya Pradesh", code: "BPL"},
  { name: "Raipur", state: "Chhattisgarh", code: "R"},
  { name: "Jaipur", state: "Rajasthan", code: "JP"},
  { name: "Pushkar", state: "Rajasthan", code: "PSK"},
  { name: "Jodhpur", state: "Rajasthan", code: "JU"},
  { name: "Udaipur", state: "Rajasthan", code: "UDP"},
  { name: "Ahmedabad", state: "Gujarat", code: "ADI"},
  { name: "Mumbai", state: "Maharashtra", code: "MUM"},
  { name: "Hyderabad", state: "Telangana", code: "HYD"},
  { name: "Panaji", state: "Goa", code: "PNJ"},
  { name: "Hampi", state: "Karnataka", code: "HMP"},
  { name: "Bengaluru", state: "Karnataka", code: "BGL"},
  { name: "Mysuru", state: "Karnataka", code: "MYS"},
  { name: "Chennai", state: "Tamil Nadu", code: "CHN"},
  { name: "Puducherry", state: "Puducherry", code: "PDC"},
  { name: "Kochi", state: "Kerala", code: "KCI"},
  { name: "Munnar", state: "Kerala", code: "MNR"},
  { name: "Port Blair", state: "Andaman & Nicobar", code: "PBL"}

  // Add every other city/circuit here later — the form and dropdown
  // need no changes, they just read from this array.
];