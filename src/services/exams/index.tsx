import { BASE_URL } from "../../constant";



const token = localStorage.getItem('token');
console.log(token);

export const fetchAllExaminationsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {


  const response = await fetch(`${BASE_URL}/app/exams/?page=${options.currentPage}`, {
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


export const fetchExaminationById = async (ExaminationId: any) => {
  const response = await fetch(`${BASE_URL}/app/exam-details/${ExaminationId}/`, {
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

