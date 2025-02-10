import { BASE_URL } from "../../constant";


const token = localStorage.getItem('token');


export const fetchAllStudentsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/account/students/?page=${options.currentPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export const fetchStudentScripts = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/app/student-scripts/?page=${options.currentPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};



export const fetchStudentScriptsByID = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number; studentId: number
}) => {
  try {
    const response = await fetch(`${BASE_URL}/app/student-scripts/${options.studentId}/?page=${options.currentPage}&page_size=${options.pageSize}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student scripts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching student scripts:', error);
    throw error;
  }
};


export const fetchStudentByID = async (studentId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/account/students/${studentId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch student details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};