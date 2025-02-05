import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

interface NavItemProps {
  text: string;
  active: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, to }) => {
  return (
    <MuiLink component={RouterLink} to={to} sx={{ textDecoration: 'none' }} >
      {text}
    </MuiLink>
  );
};

export default NavItem;