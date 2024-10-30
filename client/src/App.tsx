import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Gallery from "./containers/Gallery";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./store/store-hooks.ts";
import {selectUser} from "./store/users/usersSlice.ts";
import Register from "./containers/Auth/Register.tsx";
import Login from "./containers/Auth/Login.tsx";
import {AdminPanel} from "./containers/Admin";
import {MyFavourites} from "./containers/MyFavourites";
import {Categories} from "./containers/Categories";

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
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/admin/categories" element={<Categories />}/>
            <Route path="/favourites" element={<MyFavourites />}/>
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
