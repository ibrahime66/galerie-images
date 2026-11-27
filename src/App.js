import { StatusBar } from 'expo-status-bar';

import GalleryScreen from './screens/GalleryScreen';

export default function App() {
  return (
    <>
      <GalleryScreen />
      <StatusBar style="auto" />
    </>
  );
}
