import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

import _ from 'lodash';
import AllInbox from './Tabs/AllInbox';

const InboxPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabLabels = ["all", "read", "unread", "groups", "community", "archived"].map(label => _.startCase(label));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: 36,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Inbox
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label.toLowerCase()} sx={{ textTransform: 'capitalize' }} />
          ))}
        </Tabs>

        <Box></Box>
        <Box></Box>
      </Box>
      <Box sx={{ padding: 2 }}>
        {selectedTab === 0 && <AllInbox />}
        {selectedTab === 1 && <AllInbox />}
        {selectedTab === 2 && <AllInbox />}
        {selectedTab === 3 && <AllInbox />}
        {selectedTab === 4 && <AllInbox />}
      </Box>
    </Box>
  );
};

export default InboxPage;
