
import React from 'react';
import { Calendar, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  organizer: string;
}

const EventCard: React.FC<EventProps> = ({
  id,
  title,
  date,
  time,
  location,
  category,
  imageUrl,
  organizer,
}) => {
  return (
    <div className="event-card group animate-fade-in">
      <Link to={`/event/${id}`} className="block">
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-planora-blue">{category}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg line-clamp-2 mb-2">{title}</h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{organizer}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
