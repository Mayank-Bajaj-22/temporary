import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Home, Compass } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="py-24 sm:py-36 text-center">
      <Container size="narrow">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#E8E3D9]/70 flex items-center justify-center text-[#76501F]">
          <TreePine className="w-10 h-10 stroke-[1.5]" />
        </div>
        
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#76501F] block mb-2">
          Page Not Found — 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-serif text-[#281A10] tracking-tight mb-4">
          Off the Beaten Path
        </h1>

        <p className="text-sm sm:text-base text-[#777166] max-w-md mx-auto leading-relaxed mb-8">
          The page or product you were looking for doesn't exist, may have been retired, or was moved to another part of our workshop.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="primary" icon={Home}>
            Return to Homepage
          </Button>
          <Button to="/products" variant="secondary" icon={Compass}>
            Explore Products
          </Button>
        </div>
      </Container>
    </div>
  );
}
