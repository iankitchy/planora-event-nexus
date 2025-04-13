
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import EventsSection from '@/components/home/EventsSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import { mockEvents } from '@/data/mockEvents';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <EventsSection events={mockEvents} />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
