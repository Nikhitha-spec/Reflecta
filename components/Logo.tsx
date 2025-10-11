import React from 'react';
import { Link } from 'react-router-dom';

// Logo image URL
const logoUrl = 'https://res.cloudinary.com/darm86u7g/image/upload/v1760182713/Gemini_Generated_Image_64c15k64c15k64c1_cidatq.png';

interface LogoProps {
  to?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ to = '/home', className = '' }) => (
  <Link to={to}>
    <img src={logoUrl} alt="Reflecta Logo" className={`w-auto ${className}`} />
  </Link>
);

export default Logo;
