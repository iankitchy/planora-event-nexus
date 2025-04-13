
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-center">About Planora</h1>
          <p className="text-muted-foreground text-lg mb-12 text-center">
            We're on a mission to make event creation and discovery simple, beautiful, and accessible for everyone.
          </p>
          
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-12">
            <img
              src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
              alt="Planora team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-8 mb-12">
            <h2 className="font-heading font-semibold text-2xl mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              Planora was born out of a simple observation: creating and finding events should be easy, 
              but existing platforms were often overly complex and visually cluttered. We set out to build 
              a platform that puts user experience first, guided by principles of Swiss design: clean, 
              functional, and focused on what matters.
            </p>
            <p className="text-muted-foreground">
              Founded in 2023, our team brings together expertise in design, engineering, and event management.
              We're passionate about bringing people together and believe that great events create meaningful 
              connections and communities.
            </p>
          </div>
          
          <div className="space-y-8 mb-12">
            <h2 className="font-heading font-semibold text-2xl mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-planora-blue mr-2" />
                  Simplicity
                </h3>
                <p className="text-muted-foreground">
                  We value straightforward solutions and remove unnecessary complexity from the event experience.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-planora-blue mr-2" />
                  Inclusivity
                </h3>
                <p className="text-muted-foreground">
                  We build for everyone, ensuring our platform is accessible and welcoming to all users.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-planora-blue mr-2" />
                  Quality
                </h3>
                <p className="text-muted-foreground">
                  We're committed to excellence in every aspect of our platform, from design to functionality.
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-planora-blue mr-2" />
                  Community
                </h3>
                <p className="text-muted-foreground">
                  We believe in the power of bringing people together through meaningful events and experiences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-8 rounded-lg text-center mb-12">
            <h2 className="font-heading font-semibold text-2xl mb-4">Our Mission</h2>
            <p className="text-lg mb-0">
              "To empower event creators and attendees with a platform that makes events more accessible, 
              enjoyable, and impactful for everyone."
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="font-heading font-semibold text-2xl mb-6">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/create">Create an Event</Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/browse">
                  Browse Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
