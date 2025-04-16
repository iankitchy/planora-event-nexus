
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EventProps } from '@/components/events/EventCard';
import { mockEvents } from '@/data/mockEvents';
import { v4 as uuidv4 } from 'uuid';

interface EventsContextType {
  events: EventProps[];
  addEvent: (event: Omit<EventProps, 'id'>) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with mock events
  const [events, setEvents] = useState<EventProps[]>(mockEvents);

  const addEvent = (event: Omit<EventProps, 'id'>) => {
    const newEvent = {
      ...event,
      id: uuidv4(), // Generate a unique ID
    };
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent }}>
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
