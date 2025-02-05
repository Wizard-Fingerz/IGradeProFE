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


export const fetchAllTransferredexamsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/transferred-Student/?page=${options.currentPage}`, {
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
  const response = await fetch(`${BASE_URL}/Student/`, {
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
  const response = await fetch(`${BASE_URL}/Student/exams_analytics/`, {
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
  const response = await fetch(`${BASE_URL}/Student/`, {
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

export const fetchAllexamstatuses = async () => {
  const response = await fetch(`${BASE_URL}/Student-status/`, {
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


export const fetchAllStudentMode = async () => {
  const response = await fetch(`${BASE_URL}/Student-mode/`, {
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


export const fetchVirtualConsultationToken = async () => {
  const response = await fetch(`${BASE_URL}/generate-videosdk-token/`, {
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


export const createVirtualConsultation = async () => {
  const response = await fetch(`${BASE_URL}/create-consultation-room/`, {
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


export const fetchAllStudentType = async () => {
  const response = await fetch(`${BASE_URL}/Student-type/`, {
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

export const fetchStudentById = async (StudentId: any) => {
  const response = await fetch(`${BASE_URL}/Student/${StudentId}/`, {
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


export const fetchTransferredStudentById = async (transferredId: any) => {
  const response = await fetch(`${BASE_URL}/transferred-Student/${transferredId}/`, {
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

  
export const fetchStudentAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/Student-analytics/`, {
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


  export const exportAllStudentData = async () => {
    const response = await fetch(`${BASE_URL}/exams/export-csv/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
  
    // Return the raw blob for further handling
    const blob = await response.blob(); // Parse response as a Blob
    return blob;
  };

