import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requies from "../server";

const Home = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await requies.get(
        "22896944-75bb-437f-bb8a-c3a2a7a9f765?_format=index"
      );
      // setData(data);
      setData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = useCallback((index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const deleteId = async (id) => {
    const conDelete = confirm("Do you really want to delete?");
    conDelete &&
      (await requies.delete(`22896944-75bb-437f-bb8a-c3a2a7a9f765/${id}`));
    await getData();
  };

  return (
    <div className="accordion" id="accordionExample">
      {data?.map((item, i) => (
        <div className="accordion-item" key={i}>
          <h2 className="accordion-header" id={`heading${i}`}>
            <button
              className={`accordion-button ${
                activeIndex === i ? "" : "collapsed"
              }`}
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={activeIndex === i}
              aria-controls={`collapse${i}`}
            >
              {item.date}
            </button>
          </h2>
          <div
            id={`collapse${i}`}
            className={`accordion-collapse collapse ${
              activeIndex === i ? "show" : ""
            }`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <strong className="display-6">{item.name}</strong> - - -{" "}
                  {item.email}
                </span>
                <span>
                  <Link to={`edit/${i}`} style={{ textDecoration: "none" }}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger ms-1"
                    onClick={() => deleteId(i)}
                  >
                    X
                  </button>
                </span>
              </div>
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
