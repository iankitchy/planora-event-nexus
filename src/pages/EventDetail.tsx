
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { mockEvents } from '@/data/mockEvents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Share2, Heart, Calendar as CalendarIcon, Users, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/events/EventCard';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(mockEvents[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Find similar events (same category)
  const similarEvents = mockEvents.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundEvent = mockEvents.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="h-10 w-3/4 bg-muted rounded-md mb-4"></div>
            <div className="h-6 w-1/2 bg-muted rounded-md mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="h-8 w-1/3 bg-muted rounded-md mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 bg-muted rounded-md"></div>
                  <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                </div>
              </div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-4">
          <Link to="/browse" className="text-muted-foreground hover:text-foreground text-sm">
            ← Back to all events
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-auto object-cover aspect-[16/9]"
              />
            </div>
            
            <h1 className="font-heading font-bold text-3xl mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-planora-blue">{event.category}</Badge>
              <Badge variant="outline">In-Person</Badge>
              <Badge variant="outline">Free</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Organized by {event.organizer}</span>
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
                <TabsTrigger value="organizer">Organizer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-xl">About this event</h2>
                  <p className="text-muted-foreground">
                    Join us for {event.title}, a unique opportunity to engage with your community and make a difference.
                    This event is perfect for anyone interested in {event.category.toLowerCase()} activities and meeting
                    like-minded individuals.
                  </p>
                  <p className="text-muted-foreground">
                    What to expect:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>An engaging and inclusive environment for all participants</li>
                    <li>Expert guidance from experienced facilitators</li>
                    <li>Opportunities to network and connect with others</li>
                    <li>Refreshments will be provided</li>
                  </ul>
                  <p className="text-muted-foreground">
                    Please arrive 15 minutes before the start time to complete registration.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="venue" className="mt-4">
                <div className="space-y-4">
                  <h2 className="font-heading font-semibold text-xl">Venue Information</h2>
                  <p className="text-muted-foreground">
                    {event.location}
                  </p>
                  <div className="aspect-[16/9] bg-muted rounded-lg mb-4">
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      Map view placeholder
                    </div>
                  </div>
                  <h3 className="font-medium">Getting there</h3>
                  <p className="text-muted-foreground">
                    Parking is available on site. Public transportation options include nearby bus stops
                    and the metro station within walking distance.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="organizer" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mr-4">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="font-heading font-semibold text-xl">{event.organizer}</h2>
                      <p className="text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {event.organizer} has been creating events on Planora since 2023. They specialize 
                    in {event.category.toLowerCase()} events that bring communities together.
                  </p>
                  <div className="flex items-center">
                    <div className="flex mr-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-current text-planora-orange"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0 (24 reviews)</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2">Contact Organizer</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-card rounded-lg border p-6 sticky top-24">
              <h2 className="font-heading font-semibold text-xl mb-4">Registration</h2>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-semibold">Free</div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-muted-foreground">Spots remaining</span>
                </div>
                <div className="font-semibold">45/50</div>
              </div>
              
              <Button className="w-full mb-4">Register Now</Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => setIsFavorited(!isFavorited)}>
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-planora-orange text-planora-orange' : ''}`} />
                  {isFavorited ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start">
                  <Info className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    This event follows Planora's community guidelines and refund policies. 
                    By registering, you agree to these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {similarEvents.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading font-semibold text-2xl mb-6">Similar Events</h2>
            <div className="swiss-grid">
              {similarEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventDetail;
