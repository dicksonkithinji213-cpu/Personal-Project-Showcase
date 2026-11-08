import { useState } from "react";
function App() {
  const [projects, setProjects] = useState([
    { id: 1, title: "Project 1", description: "This is a brief description of Project 1." },
    { id: 2, title: "Project 2", description: "This is a brief description of Project 2." },
    { id: 3, title: "Project 3", description: "This is a brief description of Project 3." },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }
    const newProject = {
      id: projects.length + 1,
      title: title,
      description: description,
    };
    setProjects([...projects, newProject]);
    setTitle("");
    setDescription("");
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container my-4">
      <header className="text-center border-bottom py-3 mb-4">
        <h1>Personal Project Showcase App</h1>
      </header>
      <main className="mt-4">
        <section className="Card p-4">
          <h2 className="mb-3">Add project</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" 
              className="form-control" 
              id="title" value={title} 
              onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" 
              id="description" 
              rows="3"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}>

              </textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          
        </section>
        <section className="Card p-4 mt-4">
          <h2 className="mb-3">Project List</h2>

          <input 
          type="text" 
          className="form-control mb-3"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title"
          />
          <ul className="list-group">
            {filteredProjects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function ProjectItem({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className="list-group-item">
<div className="d-flex align-items-center"
  onClick={() => setIsExpanded(!isExpanded)}
  style={{ cursor: "pointer" }}>
  <div
    className="border rounded me-3 d-flex align-items-center justify-content-center"
    style={{ width: "80px", height: "80px", flexShrink: 0 }}
    aria-hidden="true"
  >
    Image
        </div>
        <div>
          <h5>{project.title}</h5>
          {isExpanded && <p>{project.description}</p>}
        </div>
      </div>
    </li>
  );
}

export default App