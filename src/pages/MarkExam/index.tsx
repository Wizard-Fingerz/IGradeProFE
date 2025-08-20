import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, MenuItem, Menu, IconButton, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import CustomInput from '../../components/CustomBorderedInput';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import CustomDataTable from '../../components/CustomTable/mui';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVert, Visibility } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AnalyticsCard from '../../components/AnalyticsCard';
import { fetchAllResultsWithPagination } from '../../services/results';

const MarkExamPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [, setHasNextPage] = React.useState(false);
  const [, setHasPreviousPage] = React.useState(false);
  const [networkError, setNetworkError] = React.useState(false);
  const [dataCount, setDataCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({ pageSize: 25, page: 0, currentPage: 1 });
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = React.useState<any>(null); // State for selected row data
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal open/close

  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const fetchStudentMe = async () => {
      const response = await getProfileDetails();
      if (response) {
        setUser(response);
      }
    };
    fetchStudentMe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setNetworkError(false);

      try {
        const response = await fetchAllResultsWithPagination({
          pageIndex: paginationModel.page,
          pageSize: paginationModel.pageSize,
          currentPage: paginationModel.currentPage,
        });

        setData(response.results);
        setDataCount(response.count);
        setHasNextPage(!!response.next);
        setHasPreviousPage(!!response.previous);
      } catch (error) {
        console.error('Error fetching results:', error);
        setNetworkError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

  const handlePaginationModelChange = (model: { pageSize: number; page: number }) => {
    const newPage = model.page + 1;
    setPaginationModel((prev) => ({ ...prev, page: model.page, pageSize: model.pageSize, currentPage: newPage }));
  };

  const handleView = (row: any) => {
    setSelectedRowData(row); // Set the selected row data
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRowData(null); // Clear the selected row data
  };

  const columns: GridColDef[] = [
    {
      field: 'examination_number',
      headerName: 'Candidate Number',
      flex: 1,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'question_number',
      headerName: 'Question No',
      flex: 0.5,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'question_text',
      headerName: 'Question',
      flex: 2,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'student_answer',
      headerName: 'Student Answer',
      flex: 2,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'student_score',
      headerName: 'Student Score',
      flex: 0.5,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'question_score',
      headerName: 'Question Score',
      flex: 0.5,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'similarity_score_percentage',
      headerName: 'Similarity Score',
      flex: 0.5,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => {
        const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          setAnchorEl(event.currentTarget);
          setSelectedRowId(params.row.id);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        return (
          <div>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={isMenuOpen && selectedRowId === params.row.id} onClose={handleClose}>
              <MenuItem onClick={() => handleView(params.row)}>

                <span
                  className='flex flex-row gap-4 text-blue-800'

                >
                  <Visibility width={20} />
                  <p>View</p>
                </span>
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];


  const DetailRow = ({ label, value }: { label: string; value: any }) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {value}
      </Typography>
    </Box>
  );


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          Mark Exams
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
          }}
        >
          <CustomInput />

          <div className="top-navbar-icons">
            <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
          </div>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', height: '50px', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '6px 16px',
            marginTop: 2,
            borderRadius: 2,
          }}
          onClick={() => navigate('/marks/upload-zip')}
        >
          Upload Scripts
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Exam Mark" count={dataCount} />
        </Grid>
      </Grid>

      <Box sx={{ padding: 2 }}>
        <CustomDataTable
          rows={data}
          columns={columns}
          rowCount={dataCount}
          isLoading={isLoading}
          isError={networkError}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
        />
      </Box>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedRowData
            ? `Candidate ${selectedRowData.candidate_number} answer to Question ${selectedRowData.question_number}`
            : 'Loading...'}
        </DialogTitle>     <DialogContent>
          {selectedRowData && (
            <Box mt={1}>
              <Stack spacing={2}>
                <DetailRow label="Question" value={selectedRowData.question_text} />
                <DetailRow label="Comprehension" value={selectedRowData.exam_comprehension} />
                <DetailRow label="Examiner Answer" value={selectedRowData.examiner_answer} />
                <DetailRow label="Student Answer" value={selectedRowData.student_answer} />
                <DetailRow
                  label="Student Score"
                  value={
                    selectedRowData.student_score === null || selectedRowData.student_score === undefined
                      ? 'NA'
                      : selectedRowData.student_score
                  }
                />
                <DetailRow
                  label="Question Score"
                  value={
                    selectedRowData.question_score === null || selectedRowData.question_score === undefined
                      ? '0'
                      : selectedRowData.question_score
                  }
                />
                {/* <DetailRow label="Similarity Score" value={`${selectedRowData.similarity_score_percentage}`} /> */}
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default MarkExamPage;
