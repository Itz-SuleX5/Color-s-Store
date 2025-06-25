import { LucideIcon } from 'lucide-react';

interface IconoLucideProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}

const IconoLucide: React.FC<IconoLucideProps> = ({ icon: Icon, size = 24, color = 'currentColor' }) => {
  return <Icon size={size} color={color} />;
};

export default IconoLucide;