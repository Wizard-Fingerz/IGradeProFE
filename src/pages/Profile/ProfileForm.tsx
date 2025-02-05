import React, { useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Avatar,
  MenuItem,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/IGradePro.png'
import { createInstitutionOwnerUserService, createStudentUserService } from '../../services/auth/profile';


const userTypes = [
  'Student',
  'Institution Owner',
  'Tutor',
  'Teacher',
  'Counselor',
  'Librarian',
  'IT Staff',
  'Alumni',
  'Guest Lecturer',
  'Mentor',
  'Research Partner',
  'Government Agency',
];

const steps = ['Select User Type', 'Upload Profile Image', 'Fill in Details'];

const ProfileSetup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      let userService;
  
      const formData = new FormData();
  
      if (userType === 'Student') {
        formData.append('first_name', data.fullName.split(' ')[0]);
        formData.append('last_name', data.fullName.split(' ').slice(1).join(' '));
        formData.append('email', data.email);
        formData.append('date_of_birth', data.dateOfBirth);
        formData.append('state', data.state);
        formData.append('country', data.country);
        formData.append('address', data.address);
        formData.append('grade_level', data.gradeLevel);
        formData.append('profile_picture', profileImage ?? '');
  
        userService = createStudentUserService;
      } else if (userType === 'Institution Owner') {
        formData.append('first_name', data.fullName.split(' ')[0]);
        formData.append('last_name', data.fullName.split(' ').slice(1).join(' '));
        formData.append('email', data.email);
        formData.append('state', data.state);
        formData.append('country', data.country);
        formData.append('address', data.address);
        formData.append('profile_picture', profileImage ?? '');
  
        userService = createInstitutionOwnerUserService;
      } else {
        console.error('Unsupported user type');
        return;
      }
  
      if (!userService) {
        console.error('User  service is not defined');
        return;
      }
  
      const success = await userService(formData);
      if (success) {
        handleNext(); // Proceed to the next step if successful
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ margin: '20px',width: '100vw', mt: 4 }}>
        <header>
          <Box sx={{
            display: 'flex',
            padding: '0 0.3%',
            alignItems: 'center',
            mb: 4,
            justifyContent: 'space-between',
            '@media (max-width: 768px)': { flexDirection: 'row', alignItems: 'center' }
          }}>
            <MuiLink component={RouterLink} to={"/"} sx={{ textDecoration: 'none' }}>
              <img src={logo} width={120} height={28} />
            </MuiLink>




          </Box>
        </header>
        <Typography variant="h6" gutterBottom>
          Profile Setup
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Choose your user type
            </Typography>
            <RadioGroup value={userType} onChange={handleUserTypeChange}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {userTypes.map((type, index) => (
                  <FormControlLabel
                    key={index}
                    value={type}
                    control={<Radio />}
                    label={type}
                    sx={{ marginRight: 2, marginBottom: 2 }}
                  />
                ))}
              </Box>
            </RadioGroup>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!userType}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Upload your profile image
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
            {profileImage && (
              <Avatar
                src={URL.createObjectURL(profileImage)}
                alt="Profile Image"
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
            <Box sx={{ mt: 2, justifyContent: 'space-between' }}>
              <Button onClick={handleBack} sx={{ ml: 2 }}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={!profileImage}>
                Next
              </Button>

            </Box>
          </Box>
        )}
        {activeStep === 2 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Fill in your details ({userType})
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {userType === 'Student' && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      {...register('fullName', { required: 'Full name is required' })}
                      error={!!errors.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                      error={!!errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      fullWidth
                      margin="normal"
                      {...register('dateOfBirth', { required: 'Date of birth is required' })}
                      error={!!errors.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      fullWidth
                      margin="normal"
                      {...register('state', { required: 'State is required' })}
                      error={!!errors.state}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Country"
                      fullWidth
                      margin="normal"
                      {...register('country', { required: 'Country is required' })}
                      error={!!errors.country}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Address"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      {...register('address', { required: 'Address is required' })}
                      error={!!errors.address}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Grade Level"
                      fullWidth
                      margin="normal"
                      select
                      {...register('gradeLevel', { required: 'Grade level is required' })}
                      error={!!errors.gradeLevel}
                    >
                      <MenuItem value="Elementary">Elementary</MenuItem>
                      <MenuItem value="Middle School">Middle School</MenuItem>
                      <MenuItem value="High School">High School</MenuItem>
                      <MenuItem value="College">College</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              )}
              {userType === 'Institution Owner' && (
                <>
                  <TextField
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    {...register('fullName', { required: 'Full name is required' })}
                    error={!!errors.fullName}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                  />
                  <TextField
                    label="Institution Name"
                    fullWidth
                    margin="normal"
                    {...register('institutionName', { required: 'Institution name is required' })}
                    error={!!errors.institutionName}
                  />
                </>
              )}
              {/* Add more conditions for other user types */}
              <Box sx={{ mt: 2 }}>
                <Button onClick={handleBack} sx={{ ml: 2 }}>
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Finish
                </Button>
              </Box>
            </form>
          </Box>
        )}

        {activeStep === steps.length && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Profile setup complete! 🎉
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Your profile has been successfully set up. You can now access your dashboard.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2, px: 4 }}
              onClick={() => navigate('/')}
              >
              Go to your Dashboard
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfileSetup;
