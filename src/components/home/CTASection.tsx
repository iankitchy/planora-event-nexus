
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-planora-blue text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to Create Your Event?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of event creators and make your next event a success with Planora's powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-planora-blue hover:bg-white/90" asChild>
              <Link to="/create">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20" asChild>
              <Link to="/browse">Browse Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
