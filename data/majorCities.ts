export interface MajorCity {
  name: string;
  state: string;
  code: string;
  lat: number;
  lng: number;
}

export const majorCities: MajorCity[] = [
  { name: "Visakhapatnam", state: "Andhra Pradesh", code: "VTZ", lat: 17.6868, lng: 83.2185 },
  { name: "Itanagar", state: "Arunachal Pradesh", code: "IXI", lat: 27.0844, lng: 93.6053 },
  { name: "Guwahati", state: "Assam", code: "GAU", lat: 26.1445, lng: 91.7362 },
  { name: "Patna", state: "Bihar", code: "PAT", lat: 25.5941, lng: 85.1376 },
  { name: "Raipur", state: "Chhattisgarh", code: "RPR", lat: 21.2514, lng: 81.6296 },
  { name: "Panaji", state: "Goa", code: "GOI", lat: 15.4909, lng: 73.8278 },
  { name: "Ahmedabad", state: "Gujarat", code: "AMD", lat: 23.0225, lng: 72.5714 },
  { name: "Gurugram", state: "Haryana", code: "GGN", lat: 28.4595, lng: 77.0266 },
  { name: "Shimla", state: "Himachal Pradesh", code: "SLV", lat: 31.1048, lng: 77.1734 },
  { name: "Ranchi", state: "Jharkhand", code: "IXR", lat: 23.3441, lng: 85.3096 },
  { name: "Bengaluru", state: "Karnataka", code: "BLR", lat: 12.9716, lng: 77.5946 },
  { name: "Kochi", state: "Kerala", code: "COK", lat: 9.9312, lng: 76.2673 },
  { name: "Bhopal", state: "Madhya Pradesh", code: "BHO", lat: 23.2599, lng: 77.4126 },
  { name: "Mumbai", state: "Maharashtra", code: "BOM", lat: 19.0760, lng: 72.8777 },
  { name: "Imphal", state: "Manipur", code: "IMF", lat: 24.8170, lng: 93.9368 },
  { name: "Shillong", state: "Meghalaya", code: "SHL", lat: 25.5788, lng: 91.8933 },
  { name: "Aizawl", state: "Mizoram", code: "AJL", lat: 23.7271, lng: 92.7176 },
  { name: "Kohima", state: "Nagaland", code: "KMA", lat: 25.6751, lng: 94.1086 },
  { name: "Bhubaneswar", state: "Odisha", code: "BBI", lat: 20.2961, lng: 85.8245 },
  { name: "Amritsar", state: "Punjab", code: "ATQ", lat: 31.6340, lng: 74.8723 },
  { name: "Jaipur", state: "Rajasthan", code: "JAI", lat: 26.9124, lng: 75.7873 },
  { name: "Gangtok", state: "Sikkim", code: "GKT", lat: 27.3389, lng: 88.6065 },
  { name: "Chennai", state: "Tamil Nadu", code: "MAA", lat: 13.0827, lng: 80.2707 },
  { name: "Hyderabad", state: "Telangana", code: "HYD", lat: 17.3850, lng: 78.4867 },
  { name: "Agartala", state: "Tripura", code: "IXA", lat: 23.8315, lng: 91.2868 },
  { name: "Varanasi", state: "Uttar Pradesh", code: "VNS", lat: 25.3176, lng: 82.9739 },
  { name: "Rishikesh", state: "Uttarakhand", code: "RIS", lat: 30.0869, lng: 78.2676 },
  { name: "Kolkata", state: "West Bengal", code: "CCU", lat: 22.5726, lng: 88.3639 },
  { name: "New Delhi", state: "Delhi", code: "DEL", lat: 28.6139, lng: 77.2090 },
  { name: "Srinagar", state: "Jammu and Kashmir", code: "SXR", lat: 34.0837, lng: 74.7973 },
  { name: "Leh", state: "Ladakh", code: "LEH", lat: 34.1526, lng: 77.5771 },
  { name: "Puducherry", state: "Puducherry", code: "PNY", lat: 11.9416, lng: 79.8083 },
  { name: "Chandigarh", state: "Chandigarh", code: "IXC", lat: 30.7333, lng: 76.7794 },
  { name: "Port Blair", state: "Andaman and Nicobar Islands", code: "IXZ", lat: 11.6234, lng: 92.7265 },

  // extra popular tourist hotspots, on top of the state entries above
  { name: "Agra", state: "Uttar Pradesh", code: "AGR", lat: 27.1767, lng: 78.0081 },
  { name: "Udaipur", state: "Rajasthan", code: "UDR", lat: 24.5854, lng: 73.7125 },
  { name: "Jodhpur", state: "Rajasthan", code: "JDH", lat: 26.2389, lng: 73.0243 },
  { name: "Manali", state: "Himachal Pradesh", code: "MNL", lat: 32.2432, lng: 77.1892 },
  { name: "Munnar", state: "Kerala", code: "MUN", lat: 10.0889, lng: 77.0595 },
  { name: "Mysuru", state: "Karnataka", code: "MYS", lat: 12.2958, lng: 76.6394 },
  { name: "Hampi", state: "Karnataka", code: "HMP", lat: 15.3350, lng: 76.4600 },
  { name: "Darjeeling", state: "West Bengal", code: "DJL", lat: 27.0410, lng: 88.2663 },
  { name: "Khajuraho", state: "Madhya Pradesh", code: "KJH", lat: 24.8318, lng: 79.9199 },
  { name: "Pushkar", state: "Rajasthan", code: "PSK", lat: 26.4899, lng: 74.5511 },
  { name: "Jamshedpur", state: "Jharkhand", code: "IXW", lat: 22.8046, lng: 86.2029 },
];