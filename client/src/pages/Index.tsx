
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Navbar from '@/components/Navbar';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = "ConectaIDP - A vaga certa para o seu perfil";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
