
import React, { useState } from 'react';
import EventCard, { EventProps } from '../events/EventCard';
import { Button } from '@/components/ui/button';
import { BadgeCheck, CalendarCheck, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { eventCategories } from '@/data/mockEvents';

interface EventsSectionProps {
  events: EventProps[];
  loading?: boolean;
  error?: string | null;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, loading = false, error = null }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);
  
  // Only show the first 5 categories + All in the tabs
  const displayedCategories = ["All", ...eventCategories.slice(1, 6)];

  return (
    <section className="section bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Discover and join events happening around you</p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/browse">
              View all events 
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="flex overflow-auto pb-1 mb-2">
            {displayedCategories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="swiss-grid">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-2">Loading events...</span>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-destructive">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.slice(0, 8).map((event) => (
              <EventCard key={event.id} {...event} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg font-medium">No events found</p>
              <p className="text-muted-foreground mt-2">
                {activeCategory === "All" 
                  ? "There are no upcoming events at the moment." 
                  : `There are no upcoming events in the ${activeCategory} category.`}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 border rounded-lg bg-card flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <BadgeCheck className="h-6 w-6 text-planora-blue" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Verified Organizers</h3>
            <p className="text-muted-foreground">Events hosted by trusted organizers with great reviews</p>
          </div>
          <div className="p-6 border rounded-lg bg-card flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <CalendarCheck className="h-6 w-6 text-planora-blue" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Diverse Events</h3>
            <p className="text-muted-foreground">From beach cleanups to fashion shows, find events that match your interests</p>
          </div>
          <div className="p-6 border rounded-lg bg-card flex flex-col items-center text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-planora-blue" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Local & Virtual</h3>
            <p className="text-muted-foreground">Join events near you or participate in virtual events from anywhere</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
