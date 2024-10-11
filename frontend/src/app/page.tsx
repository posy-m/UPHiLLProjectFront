// 'use client'
import React from 'react'
import InfoForm from './mypage/molecules/InfoForm';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();


export default function Home() {
  return (
    // <QueryClientProvider client={queryClient}>
      <InfoForm/>
    // </QueryClientProvider>

  );
}
