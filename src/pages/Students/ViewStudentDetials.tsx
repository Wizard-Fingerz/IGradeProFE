import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Avatar, Typography, Breadcrumbs, Link, Button, Alert, Paper, Grid, Divider } from '@mui/material';
import CustomDataTable from '../../components/CustomTable/mui';
import { getProfileDetails } from '../../services/auth/profile';
import { User } from '../../types/user';
import { fetchStudentScriptsByID, fetchStudentByID } from '../../services/students';
import CustomInput from '../../components/CustomBorderedInput';
import { useNavigate, useParams } from 'react-router-dom';

const ViewStudentDetials: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const studentId = id ? parseInt(id, 10) : undefined;

    const [student, setStudent] = useState<any>(null);
    const [data, setData] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const [dataCount, setDataCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 15, page: 0, currentPage: 1 });

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
        const fetchStudentDetails = async () => {
            try {
                const data = await fetchStudentByID(studentId!);
                setStudent(data);
            } catch (error) {
                setNetworkError(true);
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    useEffect(() => {
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
    }, [pageIndex, pageSize, currentPage, paginationModel, studentId]);

    const handlePaginationModelChange = (model: { pageSize: number; page: number }) => {
        setPaginationModel({ ...model, currentPage: model.page + 1 });
        setPageIndex(model.page);

        if (hasNextPage) {
            const newPage = model.page + 1;
            setPaginationModel(prev => ({ ...prev, page: newPage }));
            setPageIndex(newPage);
        }

        if (hasPreviousPage) {
            const newPage = model.page - 1;
            setPaginationModel(prev => ({ ...prev, page: newPage }));
            setPageIndex(newPage);
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

    // Dummy statistics data
    const statistics = {
        subjects: 5,
        passedExams: 3,
        failedExams: 2,
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 4 }}>
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
                    <Typography color="text.primary">Details</Typography>
                    {student && (
                        <Typography color="text.primary">{student.first_name} {student.last_name} - {student.candidate_number}</Typography>
                    )}
                </Breadcrumbs>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack on small screens, row on medium and up
                    justifyContent: 'space-between',
                }}>
                    <CustomInput />
                    <div className="top-navbar-icons">
                        <Avatar src={user?.profile_picture} sx={{ width: 40, height: 40, ml: 2 }} />
                    </div>
                </Box>
            </Box>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        {student && (
                            <Box>
                                <Typography variant="body1"><strong>Name:</strong> {student.first_name} {student.last_name}</Typography>
                                <Typography variant="body1"><strong>Candidate Number:</strong> {student.candidate_number}</Typography>
                                <Typography variant="body1"><strong>Center Number:</strong> {student.center_number}</Typography>
                                <Typography variant="body1"><strong>Examination Number:</strong> {student.examination_number}</Typography>
                                <Typography variant="body1"><strong>Exam Type:</strong> {student.exam_type}</Typography>
                                <Typography variant="body1"><strong>Year:</strong> {student.year}</Typography>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Typography variant="body1"><strong>Number of Subjects Offered:</strong> {statistics.subjects}</Typography>
                            <Typography variant="body1"><strong>Number of Subjects Graded:</strong> {statistics.subjects}</Typography>
                            <Typography variant="body1"><strong>Passed Exams:</strong> {statistics.passedExams}</Typography>
                            <Typography variant="body1"><strong>Failed Exams:</strong> {statistics.failedExams}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box className="flex flex-col gap-1">
                             <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    padding: '6px 16px',
                                    mt: 2,
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate(`/students/scripts/upload/${studentId}`)}
                            >
                                Upload Script
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    padding: '6px 16px',
                                    mt: 2,
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate(`/students/scripts/upload/${studentId}`)}
                            >
                                Print Result
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    padding: '6px 16px',
                                    mt: 2,
                                    borderRadius: 2,
                                }}
                                onClick={() => navigate(`/students/scripts/upload/${studentId}`)}
                            >
                                Mail Script
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Tabs value={tabIndex} onChange={handleTabChange} className='mb-4 mt-4'>
                <Tab label="Subjects" />
                <Tab label="Scripts" />
                <Tab label="Scores" />
                <Tab label="Results" />
            </Tabs>

            {networkError && (
                <Alert severity="error" className="mt-4">
                    Error fetching student details.
                </Alert>
            )}

            {tabIndex === 0 && (
                <Box>
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
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                </Box>
            )}

         

            {tabIndex === 2 && (
                <Box>
                    {/* Add components or code to display student's scores */}
                    <Typography variant="h6">Scores</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">Scores content goes here...</Typography>
                </Box>
            )}

            {tabIndex === 3 && (
                <Box>
                    {/* Add components or code to display student's results */}
                    <Typography variant="h6">Results</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">Results content goes here...</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ViewStudentDetials;