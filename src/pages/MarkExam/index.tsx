import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, MenuItem, Menu, IconButton, Grid, Button } from '@mui/material';
import CustomInput from '../../components/CustomBorderedInput';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import CustomDataTable from '../../components/CustomTable/mui';
import { Link } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AnalyticsCard from '../../components/AnalyticsCard';
import { fetchAllScriptsWithPagination } from '../../services/results';

const MarkExamPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize] = React.useState(15);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [hasPreviousPage, setHasPreviousPage] = React.useState(false);
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
        const response = await fetchAllScriptsWithPagination({
          pageIndex: paginationModel.page,
          pageSize: paginationModel.pageSize,
          currentPage: paginationModel.currentPage,

        });

        setData(response.MarkExams);
        setDataCount(response.count);
        setHasNextPage(!!response.next);
        setHasPreviousPage(!!response.previous);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setNetworkError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageIndex, pageSize, currentPage, paginationModel]);

  const handlePaginationModelChange = (model: { pageSize: number; page: number; currentPage: number }) => {
    // Update the pagination model state
    setPaginationModel(model);
    setPageIndex(model.page); // Update the current page index (0-based)
    setCurrentPage(model.currentPage + 1); // Update the current page (1-based)

    // Check if there is a next page
    if (hasNextPage) {
      const newPage = model.page + 1; // Increment page
      setPaginationModel(prev => ({ ...prev, page: newPage, currentPage: newPage + 1 }));
      setPageIndex(newPage);
      setCurrentPage(newPage + 1);
    }

    // Check if there is a previous page
    if (hasPreviousPage) {
      const newPage = model.page - 1; // Decrement page
      setPaginationModel(prev => ({ ...prev, page: newPage, currentPage: newPage + 1 }));
      setPageIndex(newPage);
      setCurrentPage(newPage + 1);
    }
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Add a state to keep track of the selected row ID
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);



  const isMenuOpen = Boolean(anchorEl); // Update this line


  const columns: GridColDef[] = [
    {
      field: 'custom_id',
      headerName: 'MRN',
      flex: 1,
      type: 'string', // Specify the type here
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>{params.value}</div>
        </Link>
      ),
    },
    {
      field: 'patient_name',
      headerName: 'Patient',
      flex: 1,
      type: 'string',
      renderCell: (params: GridRenderCellParams) => (
        <Link to={'#'}>
          <div>
            {params.value?.map((patient: { full_name: string }, index: React.Key | null) => (
              <span key={index}>{patient.full_name}</span>
            ))}
          </div>
        </Link>
      ),
    },
    {
      field: 'type_name',
      headerName: 'Type',
      flex: 1,
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
      flex: 1, // Fixed width
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
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const sampleVisitedNotes = ['Biology Flashcards', 'Math Chapter 2'];


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
          MarkExams
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '6px 16px',
            marginTop: 2,
            borderRadius: 2,
          }}
        >
          Add Subject
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '6px 16px',
            marginTop: 2,
            borderRadius: 2,
          }}
        >
          Bulk Upload
        </Button>
      </Box>



      <Grid container spacing={4} sx={{ mb: 5 }}>

        {/* Analytics Cards */}

        <Grid item xs={12} md={3}>
          <AnalyticsCard title="Total MarkExams" count={sampleVisitedNotes.length} />
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
          onPaginationModelChange={() => handlePaginationModelChange}

        />
      </Box>
    </Box>
  );
};

export default MarkExamPage;
