import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { IconButton, Tooltip } from '@mui/material';

export interface LayoutComponentProps {
    children: React.ReactNode;
}

const prewPage: number = -1;

export const LayoutComponent: React.FC<LayoutComponentProps> = ({
    children
}: LayoutComponentProps): JSX.Element => {
    const navigate = useNavigate();

    const handlePageBack = useCallback(() => navigate(prewPage), []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Tooltip title="Hacker News">
                            <IconButton color='inherit' onClick={handlePageBack} sx={{ mr: 2 }} >
                                <AltRouteIcon />
                            </IconButton></Tooltip>

                        <Typography variant="h6" component="div" mr={3}>
                            Hacker News
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box
                sx={{
                    height: 'calc(100vh - 64px)',
                    overflowY: 'auto',
                    paddingTop: '64px'
                }}
            >
                {children}
            </Box>
        </>
    );
};
