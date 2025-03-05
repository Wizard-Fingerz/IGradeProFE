import { BASE_URL } from "../../constant";


const token = localStorage.getItem('token');


export const fetchAllResultsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/exam-results/?page=${options.currentPage}`, {
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


export const fetchAllScoresWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/exam-scores/?page=${options.currentPage}`, {
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


export const fetchAllScriptsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/exam-results/?page=${options.currentPage}`, {
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
