import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Gallery from "./containers/Gallery";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./store/store-hooks.ts";
import {selectUser} from "./store/users/usersSlice.ts";
import Register from "./containers/Users/Register.tsx";
import Login from "./containers/Users/Login.tsx";

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Gallery/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/gallery/:id" element={<Gallery/>}/>
            <Route path="/my-gallery/:id" element={
              <ProtectedRoute isAllowed={!!user}>
                <Gallery/>
              </ProtectedRoute>
            }/>
            {/*<Route*/}
            {/*  path="/gallery/add"*/}
            {/*  element={*/}
            {/*    <ProtectedRoute isAllowed={!!user}>*/}
            {/*      <SubmitNewPhoto/>*/}
            {/*    </ProtectedRoute>*/}
            {/*  }*/}
            {/*/>*/}
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
