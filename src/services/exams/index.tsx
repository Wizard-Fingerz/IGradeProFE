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

export const fetchAllTransferredexamsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/transferred-Examination/?page=${options.currentPage}`, {
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

export const fetchAllexams = async () => {
  const response = await fetch(`${BASE_URL}/Examination/`, {
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

export const fetchAllexamsAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/Examination/exams_analytics/`, {
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

export const fetchAllexamsWithoutPagination = async () => {
  const response = await fetch(`${BASE_URL}/Examination/`, {
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

export const fetchAllexamstatuses = async () => {
  const response = await fetch(`${BASE_URL}/Examination-status/`, {
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


export const fetchAllExaminationMode = async () => {
  const response = await fetch(`${BASE_URL}/Examination-mode/`, {
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


export const fetchVirtualConsultationToken = async () => {
  const response = await fetch(`${BASE_URL}/generate-videosdk-token/`, {
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


export const createVirtualConsultation = async () => {
  const response = await fetch(`${BASE_URL}/create-consultation-room/`, {
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


export const fetchAllExaminationType = async () => {
  const response = await fetch(`${BASE_URL}/Examination-type/`, {
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




export const fetchTransferredExaminationById = async (transferredId: any) => {
  const response = await fetch(`${BASE_URL}/transferred-Examination/${transferredId}/`, {
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


export const fetchExaminationAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/Examination-analytics/`, {
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


export const exportAllExaminationData = async () => {
  const response = await fetch(`${BASE_URL}/exams/export-csv/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  // Return the raw blob for further handling
  const blob = await response.blob(); // Parse response as a Blob
  return blob;
};

