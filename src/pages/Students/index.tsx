import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, MenuItem, Menu, IconButton, Grid } from '@mui/material';
import CustomInput from '../../components/CustomBorderedInput';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import CustomDataTable from '../../components/CustomTable/mui';
import { Link } from 'react-router-dom';
import { fetchAllStudentsWithPagination } from '../../services/students';
import { MoreVert } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AnalyticsCard from '../../components/AnalyticsCard';
import CreateStudentModal from '../../components/modals/students/CreateStudentsModal';
import EditStudentModal from '../../components/modals/students/EditStudentsModal';
import DeleteStudentModal from '../../components/modals/students/DeleteStudentModal';
import BulkUploadStudentsModal from '../../components/modals/students/BulkUploadModal';

const StudentPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [, setHasNextPage] = React.useState(false);
  const [, setHasPreviousPage] = React.useState(false);
  const [networkError, setNetworkError] = React.useState(false); // New state for network error
  const [dataCount, setDataCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({ pageSize: 15, page: 0, currentPage: 1 });



  useEffect(() => {
    const fetchStudentMe = async () => {
      const response = await getProfileDetails();
      if (response) {
        setUser(response);
      }
    };
    fetchStudentMe();
  }, []);




  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      setNetworkError(false);

      try {
        const response = await fetchAllStudentsWithPagination({
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
    const newPage = model.page + 1; // Convert 0-based index to 1-based currentPage
    setPaginationModel(prev => ({ ...prev, page: model.page, pageSize: model.pageSize, currentPage: newPage }));
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Add a state to keep track of the selected row ID
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);



  const isMenuOpen = Boolean(anchorEl); // Update this line


  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Candidate',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{`${params.row.first_name} ${params.row.last_name}`}</div>
        </Link>
      ),
    },
    {
      field: 'center_number',
      headerName: 'Center Number',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'candidate_number',
      headerName: 'Candidate Number',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'examination_number',
      headerName: 'Examination Number',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'exam_type',
      headerName: 'Exam Type',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'year',
      headerName: 'Year',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Link to={`/students/details/view/${params.row.id}`}>
          <div>{params.value}</div>
        </Link>
      ),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5, // Fixed width
      renderCell: (params: GridRenderCellParams) => {
        const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
          // Handle the click to open the menu
          setAnchorEl(event.currentTarget);
          setSelectedRowId(params.row.id); // Store the selected row ID
        };

        const handleClose = () => {
          setAnchorEl(null); // Close the menu
        };

        return (
          <div>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen && selectedRowId === params.row.id} // Check against selectedRowId
              onClose={handleClose}
            >
              <MenuItem>
                <EditStudentModal studentID={params.row.id} btnText="Edit Student" />

              </MenuItem>
              <MenuItem>

                <DeleteStudentModal studentID={params.row.id} btnText="Delete Student" />
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },

  ];



  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: 28,
            fontWeight: 600,
            marginBottom: { xs: 2, md: 0 }, // Margin bottom on small screens
          }}
        >
          Candidate
        </Typography>


        <Box sx={
          {
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
            justifyContent: 'space-between',

          }
        }>
          <CustomInput />

          <div className="top-navbar-icons">
            <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
          </div>

        </Box>


      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 2 }}>
        <CreateStudentModal />
        <BulkUploadStudentsModal />
      </Box>


      <Grid container spacing={4} sx={{ mb: 5, }}>

        {/* Analytics Cards */}

        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Candidate" count={dataCount} />
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
    </Box>
  );
};

export default StudentPage;
