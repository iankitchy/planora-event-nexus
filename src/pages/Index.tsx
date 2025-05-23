
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import EventsSection from '@/components/home/EventsSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';
import { useEvents } from '@/contexts/EventsContext';

const Index = () => {
  const { events, loading, error } = useEvents();

  return (
    <Layout>
      <Hero />
      <EventsSection events={events} loading={loading} error={error} />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
