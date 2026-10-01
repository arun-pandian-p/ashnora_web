import React from 'react';
import { AshnoraCompactInstaller } from '@/components/desktop/AshnoraCompactInstaller';
import { Helmet } from 'react-helmet-async';

const Installer: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Ashnora Setup — Installing Ashnora Restaurant OS</title>
        <meta name="description" content="Ashnora Restaurant Operating System installer." />
      </Helmet>
      <AshnoraCompactInstaller />
    </>
  );
};

export default Installer;
