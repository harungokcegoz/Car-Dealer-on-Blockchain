// LoadingComponent.tsx
import CircularProgress from '@mui/joy/CircularProgress';

const LoadingComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex justify-center items-center space-x-2">
      <CircularProgress color="warning" variant="solid" />
      <span>Loading...</span>
    </div>
  </div>
);

export default LoadingComponent;
