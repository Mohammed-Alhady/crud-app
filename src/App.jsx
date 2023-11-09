import { Route, Routes } from "react-router-dom";
import { Post, PostEdit, PostLists } from "./pages";
const App = () => {
  return (
    <div>
      <h1>Blog</h1>
      <Routes>
        <Route path="/" Component={PostLists} />
        <Route path="/posts/:id" Component={Post} />
        <Route path="/posts/:id/edit" Component={PostEdit} />
      </Routes>
    </div>
  );
};

export default App;
