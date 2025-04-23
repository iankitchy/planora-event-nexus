
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
        // Ensure correct typing
        setEvents(data as EventProps[]);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Add a new event to Supabase
  const addEvent = async (event: Omit<EventProps, 'id'>) => {
    setLoading(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from('events')
      .insert([event])
      .select('*')
      .single();
    if (insertError) {
      setError('Failed to create event.');
      setLoading(false);
      return;
    }
    if (data) {
      setEvents((prevEvents) => [data as EventProps, ...prevEvents]);
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
