
import React from 'react';
import { Link } from 'react-router-dom';
import { HELPLINES } from '../constants';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-grey text-background mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Emergency Helplines</h3>
            <ul className="space-y-1">
              {HELPLINES.map((helpline) => (
                <li key={helpline.name}>
                  <a href={helpline.website} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                    {helpline.name}: {helpline.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-secondary">Terms of Service</Link></li>
              <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <Logo to="/home" className="h-10 mb-2" />
            <p>"Reflect Connect Heal"</p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
          <p>Made with ❤️ for Mental Wellness</p>
          <p className="mt-2 text-xs">
            Disclaimer: Reflecta is a supportive community platform, not a substitute for professional medical advice. For emergencies, please contact verified helplines.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;