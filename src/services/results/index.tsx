import { BASE_URL } from "../../constant";


const token = localStorage.getItem('token');


export const fetchAllResultsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/exams/?page=${options.currentPage}`, {
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


export const fetchAllTransferredexamsWithPagination = async (options: {
  pageIndex: number;
  pageSize: number;
  currentPage: number;
}) => {
  const response = await fetch(`${BASE_URL}/transferred-Result/?page=${options.currentPage}`, {
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

export const fetchAllexams = async () => {
  const response = await fetch(`${BASE_URL}/Result/`, {
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

export const fetchAllexamsAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/Result/exams_analytics/`, {
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

export const fetchAllexamsWithoutPagination = async () => {
  const response = await fetch(`${BASE_URL}/Result/`, {
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
  const response = await fetch(`${BASE_URL}/Result-status/`, {
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


export const fetchAllResultMode = async () => {
  const response = await fetch(`${BASE_URL}/Result-mode/`, {
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


export const fetchAllResultType = async () => {
  const response = await fetch(`${BASE_URL}/Result-type/`, {
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

export const fetchResultById = async (ResultId: any) => {
  const response = await fetch(`${BASE_URL}/Result/${ResultId}/`, {
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


export const fetchTransferredResultById = async (transferredId: any) => {
  const response = await fetch(`${BASE_URL}/transferred-Result/${transferredId}/`, {
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

  
export const fetchResultAnalytics = async () => {
  const response = await fetch(`${BASE_URL}/Result-analytics/`, {
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


  export const exportAllResultData = async () => {
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

