// src/components/Members.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import Navbar from './Navbar';

const Members = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <Container>
      <Navbar />
      {user ? (
        <div>
          <Typography variant="h4">Welcome, {user.displayName}</Typography>
          <div>
            <Typography>Email: {user.email}</Typography>
            <Typography>Username: {user.username}</Typography>
            <Typography>Role: {user.role}</Typography>
          </div>
        </div>
      ) : (
        <Typography variant="h6">No user is logged in.</Typography>
      )}
    </Container>
  );
};

export default Members;
