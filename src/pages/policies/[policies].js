// src/pages/policies/[policies].js
import React from 'react';
import { useRouter } from 'next/router';
import policyData from '../../../public/local/policyData/policyData';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import Policy from './Policy'; // Import the Policy component

const PolicyPage = ({ policy }) => {
  return (
    <>
      <Nav />
      <Policy policy={policy} /> {/* Pass the policy data to Policy component */}
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { policies } = params; // Get the policy name from the URL parameters
  const data = policyData[policies] || policyData['shipping-policy']; // Fallback to shipping policy

  return {
    props: {
      policy: data, // Pass the fetched policy data as props
    },
  };
}

export default PolicyPage;
