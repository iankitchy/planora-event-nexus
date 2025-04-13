
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted">
      <div className="container py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left animate-fade-in">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl">
              Create & Discover<br />
              <span className="text-planora-blue">Amazing Events</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto md:mx-0">
              Planora helps you create, manage, and discover events that match your interests. 
              From workshops to cultural celebrations, find it all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link to="/create">Create Event</Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/browse">
                  <Search className="h-4 w-4" />
                  Browse Events
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block animate-fade-in">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80" 
                alt="People enjoying an event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-planora-orange rounded-lg -z-10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-planora-blue rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
