import React from 'react';
import Camera from '../components/Camera';

function CapturePage({globalStore}) {
  return (
    <div>
      <Camera globalStore={globalStore} />
    </div>
  );
}

export default CapturePage;
