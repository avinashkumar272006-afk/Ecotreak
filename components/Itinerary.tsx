import React, { useState } from 'react';
import { TripItinerary, Activity, ActivityCategory } from '../types';
import { 
  Bus, 
  Leaf, 
  Utensils, 
  Bed, 
  Palette, 
  TreePine, 
  Footprints,
  Clock,
  ExternalLink,
  Award,
  Droplets,
  Share2,
  Check
} from 'lucide-react';

interface ItineraryProps {
  data: TripItinerary;
}

const CategoryIcon: React.FC<{ category: ActivityCategory }> = ({ category }) => {
  switch (category) {
    case ActivityCategory.Transport: return <Bus className="w-5 h-5 text-blue-500" />;
    case ActivityCategory.Food: return <Utensils className="w-5 h-5 text-orange-500" />;
    case ActivityCategory.Accommodation: return <Bed className="w-5 h-5 text-purple-500" />;
    case ActivityCategory.Workshop: return <Palette className="w-5 h-5 text-pink-500" />;
    case ActivityCategory.Nature: return <TreePine className="w-5 h-5 text-green-600" />;
    case ActivityCategory.Culture: return <Footprints className="w-5 h-5 text-indigo-500" />;
    default: return <Leaf className="w-5 h-5 text-emerald-500" />;
  }
};

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(activity.locationName + ' ' + activity.title)}`;

  return (
    <div className="relative pl-8 pb-8 border-l-2 border-emerald-100 last:border-0 last:pb-0 group">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all"></div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm border border-emerald-50 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                </span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{activity.category}</span>
            </div>
            <a 
                href={googleSearchUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-emerald-600 transition-colors"
                title="Search on Google"
            >
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{activity.description}</p>

        <div className="flex items-start gap-2 bg-sand-100 p-3 rounded-lg">
             <div className="mt-0.5"><CategoryIcon category={activity.category} /></div>
             <div className="text-xs text-gray-700">
                <span className="font-semibold block mb-0.5">Eco-Impact</span>
                {activity.sustainabilityTip}
             </div>
        </div>
      </div>
    </div>
  );
};

const Itinerary: React.FC<ItineraryProps> = ({ data }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Header Summary */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-emerald-50 mb-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
                        {data.city} Eco-Itinerary
                    </h2>
                    <p className="text-gray-600 max-w-2xl">{data.summary}</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center bg-emerald-50 p-4 rounded-2xl min-w-[100px]">
                        <Award className="w-6 h-6 text-emerald-600 mb-1" />
                        <span className="text-2xl font-bold text-emerald-700">{data.sustainabilityScore}</span>
                        <span className="text-xs text-emerald-800 font-medium">Eco Score</span>
                    </div>
                    <div className="flex flex-col items-center bg-emerald-50 p-4 rounded-2xl min-w-[100px]">
                        <Droplets className="w-6 h-6 text-teal-600 mb-1" />
                        <span className="text-2xl font-bold text-teal-700">{data.carbonSavedKg}kg</span>
                        <span className="text-xs text-teal-800 font-medium">CO₂ Saved</span>
                    </div>
                </div>
            </div>
            
            {/* Share Button */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 hidden md:block">
                 {/* Positioned via flex on mobile, absolute on desktop maybe? Let's just put it in the flex flow or a specific toolbar. 
                     Actually, let's put it next to the summary for visibility. 
                 */}
            </div>
            
             <div className="mt-6 flex justify-start">
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copied ? 'Link Copied!' : 'Share Itinerary'}
                </button>
            </div>
        </div>

        {/* Day Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
            {data.days.map((day, index) => (
                <button
                    key={day.dayNumber}
                    onClick={() => setActiveDay(index)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeDay === index 
                        ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                        : 'bg-white text-gray-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100'
                    }`}
                >
                    Day {day.dayNumber}: {day.theme}
                </button>
            ))}
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar / sticky day info */}
            <div className="md:col-span-4 lg:col-span-3">
                <div className="sticky top-6 bg-emerald-900 text-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-5xl font-bold text-emerald-300 opacity-20 absolute top-2 right-4">
                        0{data.days[activeDay].dayNumber}
                    </h3>
                    <div className="relative z-10">
                        <span className="uppercase text-xs tracking-widest text-emerald-400 font-semibold mb-2 block">Day Theme</span>
                        <h4 className="text-2xl font-bold mb-4">{data.days[activeDay].theme}</h4>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            Today's focus supports local culture and minimizes carbon footprint through careful selection of activities and transit.
                        </p>
                    </div>
                </div>
            </div>

            {/* Activities */}
            <div className="md:col-span-8 lg:col-span-9">
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/60">
                    {data.days[activeDay].activities.map((activity, idx) => (
                        <ActivityCard key={idx} activity={activity} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Itinerary;