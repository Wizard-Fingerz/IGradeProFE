import { BASE_URL } from "../../constant";



const token = localStorage.getItem('token');
console.log(token);

export const fetchAllQuestionsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {


  const response = await fetch(`${BASE_URL}/app/subject-questions/?page=${options.currentPage}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

