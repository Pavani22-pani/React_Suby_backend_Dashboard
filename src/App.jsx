import { useState } from 'react'
import './App.css'
import LandingPage from './vendorDashboard/pages/LandingPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from './vendorDashboard/components/NotFound'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      


    </div>
  )
}

export default App



// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LandingPage from './vendorDashboard/pages/LandingPage';
// import NotFound from './vendorDashboard/components/NotFound';

// const RedirectToClient = () => {
//   window.location.href = "  http://localhost:5174/";
//   return null;
// };

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <Link to="/">Dashboard Home</Link> | 
//           <Link to="/client">Go to Client App</Link>
//         </nav>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/client" element={<RedirectToClient />} />
//           <Route path="/*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
