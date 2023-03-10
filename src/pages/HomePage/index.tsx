import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';
import {
  IconButton,
  Tooltip,
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  ListItem,
  List
} from '@mui/material';
import { NewStory } from '../../types';
import { getDataRequest } from '../../api';
import { unixTimeConvert } from '../../helpers';
import { ErrorAlertComponent, LoadingComponent } from '../../components';

export const HomePage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [data, setData] = useState<NewStory[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<boolean>(false);

  const toggleLoading = useCallback(() => setLoading(state => !state), []);

  const makeRequest = useCallback(async () => {
    toggleLoading();

    try {
      const newsData = await getDataRequest();

      setData(newsData);
    } catch (error) {
      setRequestError(true);
      // makeRequest();
    }

    toggleLoading();
  }, [toggleLoading]);

  useEffect(() => {
    setRequestError(false);
    makeRequest();

    const requestLoop = setInterval(() => makeRequest(), 60000);

    return () => {
      clearInterval(requestLoop);
    };
  }, [makeRequest]);

  const handleReloadNews = useCallback(() => makeRequest(), [makeRequest]);
  const goToPage = useCallback((url: string) => navigate(url), [navigate]);

  if (!data || loading) return <LoadingComponent />

  return (
    <>
      <List>
        {data.map((el: NewStory) => (
          <Box key={el.data.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => goToPage("news")}
              >
                <ListItemText primary={el.data.title} />

                <Box>
                  <ListItemText secondary={`Created at ${unixTimeConvert(el.data.time)}`} />
                  <ListItemText secondary={`by ${el.data.by}`} />
                </Box>
              </ListItemButton>
            </ListItem>

            <Divider />
          </Box>
        ))}
      </List>

      <Tooltip title="Reload news">
        <IconButton
          size="large"
          color="primary"
          sx={{ position: "fixed", bottom: "20px", left: "50%" }}
          onClick={handleReloadNews}
        >
          <CachedIcon />
        </IconButton>
      </Tooltip>

      {requestError && <ErrorAlertComponent />}
    </>
  );
};
