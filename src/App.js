
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseEditor from './components/CourseEditor';
import { useDbData } from "./utilities/firebase";
import Navigation from "./components/Navigation";
import { useProfile } from './utilities/profile';
//import CourseList from './components/CourseList.jsx';

const CourseFormForUrl = (data) =>{
  const { course_key } = useParams();
  return <CourseEditor course_key={course_key}  data={data["data"]} />;
};

const Main = () => {
  //role-based authorization init
  const [profile, profileLoading, profileError] = useProfile();
  // const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [data, error] = useDbData('/');
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  
   //role-based authorization error processing 
   if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
   if (profileLoading) return <h1>Loading user profile</h1>;
   if (!profile) return <h1>No profile data</h1>;

  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={
            <div>
                <Banner title = {data.title}></Banner>
                <TermPage courses = {data.courses} profile={profile}/> 
            </div> 
        } />
      <Route path="/course/:course_key/" element={<CourseFormForUrl data={data.courses}/>} />
    </Routes>
  </BrowserRouter>
  );
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
