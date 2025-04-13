
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    "Create and manage events of all types",
    "Beautiful, mobile-friendly design",
    "Comprehensive event discovery",
    "Secure ticketing and payments",
    "Detailed analytics for organizers",
    "Seamless attendee experience"
  ];
  
  return (
    <section className="section bg-muted">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80" 
                  alt="Woman using Planora app"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1553289038-ba5079f5b921?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80" 
                  alt="People at an event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-planora-orange rounded-lg -z-10"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-planora-blue rounded-lg -z-10"></div>
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl">Everything You Need to Create Successful Events</h2>
            <p className="text-muted-foreground">
              Planora provides all the tools you need to create, promote, and manage events of any size.
              From simple community gatherings to large conferences, we've got you covered.
            </p>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-planora-green mr-3 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button size="lg" asChild>
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
