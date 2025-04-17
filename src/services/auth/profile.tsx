import { BASE_URL } from "../../constant";


// const authApiService = new AuthApiService();
// const token = authApiService.getAuth()?.token;
// const tokenString = localStorage.getItem('token');
// if (tokenString !== null) {
//   const token = JSON.parse(tokenString);
//   console.log(token);
// } else {
//   console.log('No token found in local storage');
// }


// const token = localStorage.getItem('token');
// console.log(token);

const token = localStorage.getItem('token');

export const createStudentUserService = async (payload: any) => {

  // const token = authApiService.getAuth()?.token

  const token = localStorage.getItem('token');
  console.log(token);

  try {
    const response = await fetch(`${BASE_URL}/students/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    if (response.status === 201) {
      console.log('Student user created successfully!');
      await response.json();

      return true; // Return true to indicate success
    } else {
      const errorData = await response.json();
      console.error(`Error creating student user: ${errorData.message}`);
      return false; // Return false to indicate failure
    }
  } catch (error) {
    console.error('Error creating student user:', error);
    return false; // Return false to indicate failure
  }
};


export const createInstitutionOwnerUserService = async (payload: any) => {


  const token = localStorage.getItem('token');
  console.log(token);


  try {
    const response = await fetch(`${BASE_URL}/api/users/student/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      console.log('Student user created successfully!');
    } else {
      const errorData = await response.json();
      console.error(`Error creating institutional owner: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error creating student user:', error);
  }
};

export const getProfileDetails = async () => {
 
  const token = localStorage.getItem('token');
  console.log(token);

  try {
    const response = await fetch(`${BASE_URL}/account/users/me/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const responseData = await response.json();
      return responseData; // Return the response data
      
      localStorage.setItem("userDetails", responseData);

    } else {
      const errorData = await response.json();
      console.error(`Error getting student me: ${errorData.message}`);
      return null; // Return null to indicate failure
    }
  } catch (error) {
    console.error('Error getting student me:', error);
    return null; // Return null to indicate failure
  }
};

export const fetchDashboardAnalytics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/app/analytics/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch  details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching  details:', error);
    throw error;
  }
};