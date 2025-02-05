import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginModal from '../Auth/Login';
import SignUpModal from '../Auth/SignUp';
import logo from '../../../assets/IGradePro.png'
interface MenuItem {
  text: string;
  href: string;
  children?: MenuItem[];
}

const MENU_LIST: MenuItem[] = [
  { text: "Home", href: "/", children: [{ text: "Welcome", href: "/" }, { text: "Testimonials", href: "/Testimonials" }, { text: "Latest Updates", href: "/LatestUpdates" }] },
  { text: "About Us", href: "/About", children: [{ text: "Our Mission", href: "/OurMission" }, { text: "Our Team", href: "/OurTeam" }, { text: "Partners & Collaborations", href: "/Partners" }, { text: "Careers", href: "/Careers" }] },
  { text: "Subjects", href: "/Subjects", children: [{ text: "Featured Subjects", href: "/FeaturedSubjects" }, { text: "Upcoming Subjects", href: "/UpcomingSubjects" }, { text: "Webinars & Workshops", href: "/Webinars" }] },
  { text: "Instructors", href: "/Instructors", children: [{ text: "Meet Our Instructors", href: "/MeetInstructors" }, { text: "Instructor Profiles", href: "/InstructorProfiles" }, { text: "Become an Instructor", href: "/BecomeInstructor" }] },
  { text: "Blog", href: "/Blog", children: [{ text: "Articles & Insights", href: "/Articles" }, { text: "Success Stories", href: "/SuccessStories" }, { text: "Tips & Resources", href: "/Tips" }] },
  { text: "Pricing", href: "/Pricing", children: [{ text: "Subscription Plans", href: "/SubscriptionPlans" }, { text: "Free Trials", href: "/FreeTrials" }, { text: "Discounts & Promotions", href: "/Discounts" }] },
  { text: "Contact Us", href: "/Contact", children: [{ text: "FAQs", href: "/FAQs" }, { text: "Support Center", href: "/SupportCenter" }, { text: "Live Chat", href: "/LiveChat" }] }
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);


  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <header>
      <Box sx={{
        display: 'flex',
        padding: '0 0.3%',
        alignItems: 'center',
        justifyContent: 'space-between',
        '@media (max-width: 768px)': { flexDirection: 'row', alignItems: 'center' }
      }}>
        <MuiLink component={RouterLink} to={"/"} sx={{ textDecoration: 'none' }}>
        <img src={logo} width={120} height={28}/>
          </MuiLink>

        {/* Desktop Menu */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', '@media (max-width: 768px)': { display: 'none' } }}>
          {MENU_LIST.map((menu, idx) => (
            <Box
              key={menu.text}
              sx={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <MuiLink
                component={RouterLink}
                to={menu.href}
                sx={{
                  textDecoration: 'none',
                  color: '#333',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
              >
                {menu.text}
              </MuiLink>
              {menu.children && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#fff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    display: hoveredIndex === idx ? 'block' : 'none',
                    zIndex: 1000
                  }}
                >
                  {menu.children.map((child) => (
                    <MuiLink
                      key={child.text}
                      component={RouterLink}
                      to={child.href}
                      sx={{
                        display: 'block',
                        padding: '10px 20px',
                        color: '#666',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      {child.text}
                    </MuiLink>
                  ))}
                </Box>
              )}
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <MuiLink component={RouterLink} to='/signup' sx={{ textDecoration: 'none', padding: '10px' }}
            onClick={(e) => {
              e.preventDefault(); // Prevent the link from navigating to the login page
              setSignUpOpen(true);
            }}
            >Signup</MuiLink>
            <MuiLink
              component={RouterLink}
              to='/login'
              sx={{ textDecoration: 'none', padding: '10px' }}
              onClick={(e) => {
                e.preventDefault(); // Prevent the link from navigating to the login page
                setLoginOpen(true);
              }}
            >
              Login
            </MuiLink>
          </Box>
        </Box>

        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}

        />

        <SignUpModal
          open={signUpOpen}
          onClose={() => setSignUpOpen(false)}

        />

        {/* Mobile Menu Button */}
        <Box sx={{ display: 'none', '@media (max-width: 768px)': { display: 'block' } }}>
          <IconButton onClick={() => setNavActive(!navActive)} color='inherit'>
            {navActive ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Mobile Drawer Menu */}
        <Drawer anchor='right' open={navActive} onClose={() => setNavActive(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={() => setNavActive(false)} onKeyDown={() => setNavActive(false)}>
            <List>
              {MENU_LIST.map((menu) => (
                <ListItem key={menu.text} component={RouterLink} to={menu.href}>
                  <ListItemText primary={menu.text} />
                </ListItem>
              ))}
              <ListItem component={RouterLink} to='/signup'
                onClick={(e) => {
                  e.preventDefault(); // Prevent the link from navigating to the login page
                  setSignUpOpen(true);
                }}
              >
                <ListItemText primary='Signup' />
              </ListItem>
              <ListItem component={RouterLink} to='/login'
                onClick={(e) => {
                  e.preventDefault(); // Prevent the link from navigating to the login page
                  setLoginOpen(true);
                }}
              >
                <ListItemText primary='Login' />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </header>
  );
};

export default Navbar;
