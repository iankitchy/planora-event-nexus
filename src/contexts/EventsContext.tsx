
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EventProps } from '@/components/events/EventCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { mockEvents } from '@/data/mockEvents';

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

  // Helper function to merge Supabase and mock events without duplicates (Supabase wins)
  function mergeEvents(supabaseEvents: EventProps[], mockEvents: EventProps[]): EventProps[] {
    const supabaseMap: Record<string, EventProps> = {};
    supabaseEvents.forEach((event) => {
      supabaseMap[event.id] = event;
    });

    // Add mock events only if their IDs are not present in Supabase results
    const merged = [
      ...supabaseEvents,
      ...mockEvents.filter((mock) => !(mock.id in supabaseMap)),
    ];
    return merged;
  }

  // Fetch events from Supabase on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching events from Supabase');
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
        
        console.log('Supabase response:', { data, error });
        
        let supabaseEvents: EventProps[] = [];
        if (error) {
          console.error('Supabase error:', error);
          setError('Could not load events.');
          toast({
            title: "Error",
            description: "Failed to load events. Please try again later.",
            variant: "destructive",
          });
        } else if (data && data.length > 0) {
          supabaseEvents = data.map(item => ({
            id: item.id,
            title: item.title,
            date: item.date,
            time: item.time,
            location: item.location,
            category: item.category,
            imageUrl: item.imageurl,
            organizer: item.organizer
          }));
          
          console.log('Mapped events:', supabaseEvents);
          toast({
            title: "Success",
            description: `Loaded ${supabaseEvents.length} events.`,
          });
        } else {
          console.log('No events found');
        }

        // Merge supabase and mock events
        const finalEvents = mergeEvents(supabaseEvents, mockEvents);
        setEvents(finalEvents);

      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  // Add a new event to Supabase (do not affect mock events)
  const addEvent = async (event: Omit<EventProps, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const supabaseEvent = {
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        category: event.category,
        imageurl: event.imageUrl,
        organizer: event.organizer
      };
      
      console.log('Adding event to Supabase:', supabaseEvent);
      
      const { data, error: insertError } = await supabase
        .from('events')
        .insert([supabaseEvent])
        .select('*')
        .single();
        
      if (insertError) {
        console.error('Insert error:', insertError);
        setError('Failed to create event.');
        toast({
          title: "Error",
          description: "Failed to create event. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        const newEvent: EventProps = {
          id: data.id,
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          category: data.category,
          imageUrl: data.imageurl,
          organizer: data.organizer
        };
        
        console.log('Created new event:', newEvent);
        setEvents((prevEvents) => [newEvent, ...prevEvents]);
        toast({
          title: "Success",
          description: "Event created successfully.",
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
