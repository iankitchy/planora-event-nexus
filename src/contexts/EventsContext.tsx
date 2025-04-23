
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EventProps } from '@/components/events/EventCard';
import { supabase } from '@/integrations/supabase/client';

interface EventsContextType {
  events: EventProps[];
  addEvent: (event: Omit<EventProps, 'id'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from Supabase on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      if (error) {
        setError('Could not load events.');
        setLoading(false);
        return;
      }
      if (data) {
        // Map Supabase field 'imageurl' to EventProps field 'imageUrl'
        const mappedEvents = data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date,
          time: item.time,
          location: item.location,
          category: item.category,
          imageUrl: item.imageurl, // Map imageurl to imageUrl
          organizer: item.organizer
        }));
        setEvents(mappedEvents);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Add a new event to Supabase
  const addEvent = async (event: Omit<EventProps, 'id'>) => {
    setLoading(true);
    setError(null);
    
    // Create a properly mapped object for Supabase
    const supabaseEvent = {
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      imageurl: event.imageUrl, // Map imageUrl to imageurl for Supabase
      organizer: event.organizer
    };
    
    const { data, error: insertError } = await supabase
      .from('events')
      .insert([supabaseEvent])
      .select('*')
      .single();
      
    if (insertError) {
      setError('Failed to create event.');
      setLoading(false);
      return;
    }
    
    if (data) {
      // Map back from Supabase format to EventProps format
      const newEvent: EventProps = {
        id: data.id,
        title: data.title,
        date: data.date,
        time: data.time,
        location: data.location,
        category: data.category,
        imageUrl: data.imageurl, // Map imageurl back to imageUrl
        organizer: data.organizer
      };
      
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
    }
    
    setLoading(false);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, loading, error }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
