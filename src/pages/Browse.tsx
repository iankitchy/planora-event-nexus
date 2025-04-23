
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { eventCategories } from '@/data/mockEvents';
import EventCard from '@/components/events/EventCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEvents } from '@/contexts/EventsContext';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  
  const { events, loading, error } = useEvents();
  
  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Discover Events
          </h1>
          <p className="text-muted-foreground">
            Find and join events that match your interests
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events, locations, or organizers"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date: Soonest</SelectItem>
                <SelectItem value="newest">Newest Added</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showFilters && (
          <div className="bg-muted p-4 rounded-lg mb-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Date</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">Today</Badge>
                  <Badge variant="outline" className="cursor-pointer">This Week</Badge>
                  <Badge variant="outline" className="cursor-pointer">Weekend</Badge>
                  <Badge variant="outline" className="cursor-pointer">This Month</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Price</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">Free</Badge>
                  <Badge variant="outline" className="cursor-pointer">Paid</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Format</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer">In-Person</Badge>
                  <Badge variant="outline" className="cursor-pointer">Virtual</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex overflow-auto pb-2 mb-4">
            {["All", ...eventCategories.slice(1)].map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
            <span>Loading events...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h3 className="font-semibold text-lg mb-2 text-destructive">{error}</h3>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-6">
              Showing {filteredEvents.length} events
            </div>
            <div className="swiss-grid">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="font-semibold text-lg mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Browse;
