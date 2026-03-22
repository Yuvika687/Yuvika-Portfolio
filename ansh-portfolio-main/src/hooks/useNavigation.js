import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback((sectionId) => {
    if (!sectionId || sectionId === 'home' || sectionId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = sectionId.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const handleNavigation = useCallback((action) => {
    if (!action) return;

    // External links
    if (action.startsWith('http')) {
      window.open(action, '_blank', 'noopener,noreferrer');
      return;
    }

    // Route navigation
    if (action.startsWith('/')) {
      navigate(action);
      return;
    }

    // Section navigation - always go to home first if not already there
    if (action.startsWith('#') || action === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(action), 100);
      } else {
        scrollToSection(action);
      }
      return;
    }
  }, [navigate, location.pathname, scrollToSection]);

  return { handleNavigation };
};
