export default function TripConfig() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10">
      <h3 className="text-xl font-bold mb-4">Trip Configuration</h3>
      
      <label className="block mb-2">Destination City</label>
      <input type="text" placeholder="Jaipur, Rajasthan" className="w-full border p-2 rounded mb-4" />

      <label className="block mb-2">Duration</label>
      <select className="w-full border p-2 rounded mb-4">
        <option>3 Days</option>
        <option>5 Days</option>
      </select>

      <label className="block mb-2">Travel Style</label>
      <select className="w-full border p-2 rounded mb-4">
        <option>Backpacker / Solo</option>
        <option>Family</option>
      </select>

      <label className="block mb-2">Total Budget (₹)</label>
      <input type="range" min="5000" max="40000" className="w-full mb-4" />

      <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold">
        Generate Smart Itinerary
      </button>
    </div>
  );
}
