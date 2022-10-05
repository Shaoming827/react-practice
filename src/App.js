
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseEditor from './components/CourseEditor';
//import CourseList from './components/CourseList.jsx';

const CourseFormForUrl = (data) =>{
  const { course_term,course_number } = useParams();
  return <CourseEditor course_term={course_term} course_number={course_number} data={data} />;
};
const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
            <div>
                <Banner title = {data.title}></Banner>
                <TermPage courses = {data.courses}/> 
            </div> 
        } />
      <Route path="/course/:course_term/:course_number" element={<CourseFormForUrl data={data} />} />
    </Routes>
  </BrowserRouter>
  );
  // return (
  //   <div>
  //     <Banner title = {data.title}></Banner>
  //     <TermPage courses = {data.courses}/> 
  //   </div>
  //   );
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
