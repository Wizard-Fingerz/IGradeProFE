import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, MenuItem, Menu, IconButton, Grid } from '@mui/material';
import CustomInput from '../../components/CustomBorderedInput';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import CustomDataTable from '../../components/CustomTable/mui';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AnalyticsCard from '../../components/AnalyticsCard';
import CreateSubjectModal from '../../components/modals/subjects/CreateSubjectModal';
import DeleteSubjectModal from '../../components/modals/subjects/DeleteSubjectModal';
import EditSubjectModal from '../../components/modals/subjects/EditSubjectModal';
import { fetchAllSubjectsWithPagination } from '../../services/subjects';
import BulkUploadSubjectsModal from '../../components/modals/subjects/BulkUploadModal';

const SubjectPage: React.FC = () => {
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
        const response = await fetchAllSubjectsWithPagination({
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
      field: 'name',
      headerName: 'Name',
      flex: 1,
      type: 'string', // Specify the type here
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 4,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    // Repeat for other columns...

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
                <EditSubjectModal subjectID={params.row.id} btnText="Edit Subject" />

              </MenuItem>
              <MenuItem>

                <DeleteSubjectModal subjectID={params.row.id} btnText="Delete Subject" />
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
          Subjects
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
        <CreateSubjectModal />
        <BulkUploadSubjectsModal />
      </Box>


      <Grid container spacing={4} sx={{ mb: 5, }}>

        {/* Analytics Cards */}

        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total Subjects" count={dataCount} />
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

export default SubjectPage;
