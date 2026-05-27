import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';

export default function App() {


  const isLoading = useCachedResources();
 

  if(isLoading){
   return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );   
  }else{
    return null;
  }
}
