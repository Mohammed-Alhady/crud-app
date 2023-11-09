import { useState } from "react";
import PropTypes from "prop-types";

const PostForm = ({ onSubmit, values }) => {
  const [post, setPost] = useState({
    title: values.title || "",
    body: values.body || "",
  });

  const handleChangeInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const renderField = (label) => (
    <div>
      <label>{label}</label>
      <input
        type="text"
        name={label.toLowerCase()}
        onChange={handleChangeInput}
        value={post[label.toLowerCase()]}
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderField("title")}
      {renderField("body")}
      <button type="submit">Submit</button>
    </form>
  );
};

PostForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
};

export default PostForm;
