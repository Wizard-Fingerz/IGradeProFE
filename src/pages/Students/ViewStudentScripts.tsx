import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Avatar, Typography, Breadcrumbs, Link, Button } from '@mui/material';
import CustomDataTable from '../../components/CustomTable/mui';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import { fetchStudentScriptsByID } from '../../services/students';
import CustomInput from '../../components/CustomBorderedInput';
import { useNavigate, useParams } from 'react-router-dom';

const ViewStudentScripts: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const studentId = id ? parseInt(id, 10) : undefined;

    const [data, setData] = React.useState([]);

    const [tabIndex, setTabIndex] = useState(0);
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
                if (studentId !== undefined) {
                    const response = await fetchStudentScriptsByID({
                        pageIndex: paginationModel.page,
                        pageSize: paginationModel.pageSize,
                        currentPage: paginationModel.currentPage,
                        studentId: studentId,
                    });

                    setData(response.results);
                    setDataCount(response.count);
                    setHasNextPage(!!response.next);
                    setHasPreviousPage(!!response.previous);
                }

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

    const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'uploadedAt', headerName: 'Uploaded At', width: 150 },
        // Add more columns as needed
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Breadcrumbs aria-label="breadcrumb"
                    sx={{
                        '& .MuiBreadcrumbs-li': {
                            fontSize: 28,
                            fontWeight: 600,
                        }
                    }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/students"
                    >
                        Students
                    </Link>
                    <Typography color="text.primary">Scripts</Typography>
                    <Typography color="text.primary">Oladiti John - 2445768DGFR</Typography>
                </Breadcrumbs>


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


            <div className='flex flex-row justify-between items-center'>

                <Tabs value={tabIndex} onChange={handleTabChange} className='mb-4 mt-4'>
                    <Tab label="Subjects" />
                    <Tab label="Scripts" />
                    <Tab label="Bio Data" />
                    <Tab label="Scores" />
                    <Tab label="Results" />
                </Tabs>


                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        padding: '6px 16px',
                        marginTop: 2,
                        borderRadius: 2,
                    }}
                    onClick={() => navigate(`/students/scripts/upload/${studentId}`)}
                >
                    Upload Script
                </Button>
            </div>
            {tabIndex === 0 && (
                <Box>
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
            )}

            {tabIndex === 1 && (
                <Box>
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
            )}
            {tabIndex === 2 && (
                <Box>
                    {/* Add components or code to display student's personal data */}
                    <p>Personal Data Screen</p>
                </Box>
            )}
            {tabIndex === 3 && (
                <Box>
                    {/* Add components or code to display student's personal data */}
                    <p>Scores</p>
                </Box>
            )}

            {tabIndex === 4 && (
                <Box>
                    {/* Add components or code to display student's personal data */}
                    <p>Results</p>
                </Box>
            )}
        </Box>
    );
};

export default ViewStudentScripts;