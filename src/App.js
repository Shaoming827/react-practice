
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Banner from './components/Banner.jsx';
import CourseList from './components/CourseList.jsx';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (<div>
    <Banner title = {data.title}></Banner>
    <CourseList courses = {data.courses}></CourseList>
    </div>);
}

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className ="container">
      <Main />
    </div>
  </QueryClientProvider>
);

export default App;
