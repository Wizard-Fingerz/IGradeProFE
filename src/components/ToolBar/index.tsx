import React from 'react';
import { Box, Button, InputBase, InputAdornment, Tooltip, IconButton } from '@mui/material';
import { Search, GridView, List, Description, FilterList, ListAlt, Insights, Apps } from '@mui/icons-material';

interface ToolbarProps {
    onViewChange: (view: string) => void;
    view: string;
    searchPlaceholder: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ onViewChange, view, searchPlaceholder }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 4 }}>
            <Button
                onClick={() => onViewChange('board')}
                variant={view === 'board' ? 'contained' : 'outlined'}
                color="primary"
                sx={{ mr: 1, minWidth: '120px' }}
                startIcon={view === 'board' ? <GridView /> : null}
            >
                Board View
            </Button>
            <Button
                onClick={() => onViewChange('list')}
                variant={view === 'list' ? 'contained' : 'outlined'}
                color="primary"
                sx={{ mr: 1, minWidth: '120px' }}
                startIcon={view === 'list' ? <List /> : null}
            >
                List View
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 1, minWidth: '120px' }}>
                Limited Access
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 1, minWidth: '120px' }}>
                Owners
            </Button>
            <Button variant="outlined" color="primary" sx={{ mr: 1, minWidth: '120px' }}>
                Twitter Team
            </Button>
            <InputBase
                placeholder={searchPlaceholder}
                sx={{
                    border: '1px solid grey',
                    borderRadius: '5px',
                    padding: '0.4rem',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    width: '200px', // Set a fixed width
                    '&:focus': {
                        outline: 'none',
                        border: '1px solid grey',
                    },
                    '& .MuiInputBase-input': {
                        padding: '0.4rem 0.8rem',
                        height: '100%',
                        flex: 1,
                    },
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }
            />


            <Tooltip title="Description">
                <IconButton>
                    <Description fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Filter List">
                <IconButton>
                    <FilterList fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="List View">
                <IconButton>
                    <ListAlt fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Insights">
                <IconButton>
                    <Insights fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Apps">
                <IconButton>
                    <Apps fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default Toolbar;
