
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Yoga Instructor",
    text: "Planora has transformed how I manage my yoga workshops. The platform's clean design and ease of use have helped me reach new students and grow my practice.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Software Developer",
    text: "I've discovered so many interesting events in my city through Planora. The filters make it easy to find exactly what I'm looking for, and the mobile experience is fantastic.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Environmental Activist",
    text: "Our non-profit organizes regular clean-up drives, and Planora has made volunteer recruitment so much easier. The analytics feature helps us track our impact over time.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
  }
];

const TestimonialSection = () => {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Planora is trusted by event creators and attendees alike. Here's what they have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-lg border p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-planora-orange" />
                ))}
              </div>
              
              <blockquote className="flex-grow">
                <p className="italic text-muted-foreground">"{testimonial.text}"</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
