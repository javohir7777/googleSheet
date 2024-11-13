import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requies from "../server";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
    date: new Date().toString(),
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await requies.get(
          `22896944-75bb-437f-bb8a-c3a2a7a9f765/${id}`
        );

        setData(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requies.put(
        `22896944-75bb-437f-bb8a-c3a2a7a9f765/${id}`,
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
        <h1 className="text-muted text-center">Edit</h1>
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
            name="message"
            cols="30"
            rows="3"
            className="form-control"
            id="message"
            value={data.message}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
