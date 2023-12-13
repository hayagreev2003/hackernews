import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";

function App() {

  
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/post/:objectID" element={<PostDetails />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
