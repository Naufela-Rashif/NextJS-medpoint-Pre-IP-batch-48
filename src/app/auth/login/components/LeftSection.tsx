'use client';

import React, { useState, MouseEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Box, Button, IconButton, InputAdornment, TextField, Typography, Popover } from '@mui/material';
import { loginAction } from '@/app/auth/login/actions';
import { Input } from '@/components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LeftSection() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Handler submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const result = await loginAction(formData);
    if (result?.error) {
      setErrorMessage(result.error);
      const btn = formElement.querySelector<HTMLButtonElement>('button[type="submit"]');
      setAnchorEl(btn ?? formElement);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setErrorMessage(null);
  };
  const isPopoverOpen = Boolean(anchorEl) && Boolean(errorMessage);
  const handleButtonClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className="w-1/2 flex flex-col items-center h-full">
      <div className="w-full pl-5 py-5">
        <Image
          src="/Mediverse-logo.png"
          width={100}
          height={100}
          alt="mediverse logo"
        />
      </div>

      <div className="max-w-md p-8">
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 'bold', fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '0.5rem', color: '#1f2937' }}
        >
                Selamat Datang
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '2rem' }}
        >
                Masuk dan kelola dashboard Mediverse Anda sekarang
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Input
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Kata Sandi"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={handleButtonClick}
            className="w-full lg:w-2/3"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              backgroundColor: '#5600e9',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#5600e9',
                color: '#fff',
              },
            }}
          >
                        Masuk sekarang
          </Button>

          <Popover
            open={isPopoverOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            disableRestoreFocus
          >
            <Box sx={{ p: 2, maxWidth: 260 }}>
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
              <Box textAlign="right" mt={1}>
                <Button size="small" onClick={handleClose}>
                                    OK
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>
      </div>
    </div>
  );
}
