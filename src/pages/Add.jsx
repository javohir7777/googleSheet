import { useState } from "react";
import { useNavigate } from "react-router-dom";
import requies from "../server";

const Add = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    date: new Date().toString(),
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requies.post(
        "22896944-75bb-437f-bb8a-c3a2a7a9f765",
        data
      );
      console.log(res);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form
        style={{ maxWidth: "500px", margin: "auto" }}
        onSubmit={handleSubmit}
      >
        <h1 className="text-muted text-center">Add</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            type="message"
            cols="30"
            rows="3"
            className="form-control"
            id="message"
            name="message"
            value={data.message}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
