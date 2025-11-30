export enum ActivityCategory {
  Transport = 'Transport',
  Workshop = 'Workshop',
  Food = 'Food',
  Accommodation = 'Accommodation',
  Nature = 'Nature',
  Culture = 'Culture'
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  category: ActivityCategory;
  sustainabilityTip: string;
  locationName: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  activities: Activity[];
}

export interface TripItinerary {
  city: string;
  summary: string;
  sustainabilityScore: number; // 0-100
  carbonSavedKg: number; // Estimated
  days: DayItinerary[];
}

export interface GenerateItineraryParams {
  city: string;
}
