import React from 'react';
import LoadingGif from '@/assets/loading.gif';

interface IProps {
  message?: string;
}

const DataLoading = ({ message = 'Wait a minute ~ Data Loading..' }: IProps) => {
  return (
    <div>
      <div>
        <img style={{ height: 50 }} src={LoadingGif} alt='loading' />
      </div>
      <div style={{ marginTop: 20 }}>{message}</div>
    </div>
  );
};
export default DataLoading;
