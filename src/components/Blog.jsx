import React, { useState, useEffect } from "react";
import axios from "axios";
//Implementaremos un componente para visualizar las entradas existentes del blog
//consumiremos Post.json para obtener las entradas del blog
//También implementaremos un formulario para agregar nuevas entradas
const Blog = () => {
    const [posts, setPosts] = useState([]);//esttado para almacenar las entradas del blog
    const [form, setForm] = useState({//estado para manejar el formulario de nuevas entradas
        title: "",
        author: "",
        date: "",
        image: "",
        content: ""
    });

    useEffect(() => {//efecto para cargar las entradas del blog al montar el componente, puede dar error si no encuentra el archivo Post.json
        axios.get("/Post.json")
            .then(res => setPosts(res.data || []))
            .catch(err => console.error("Error al cargar posts:", err));
    }, []);

        return (
            <>
                <div className="blog-banner">
                    <h1>Blog EcoMarket</h1>
                    <p>Noticias, consejos y vida saludable</p>
                </div>
                <div className="container my-5">
                    <h2 className="section-title-llamativo">Recientes</h2>
            <h3 className="section-subtitle-llamativo">Aquí podrás encontrar las entradas más recientes de nuestro blog de noticias saludables, artículos interesantes e ideas para una vida sostenible.</h3>
            <div className="row">
                {posts.map((post, idx) => (
                    <div key={post.id || idx} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={post.image} alt={post.title} className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <p className="text-muted mb-0">
                                    <small>Autor: {post.author} | Fecha: {post.date}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
                        
            <hr />
            <h4 className="mt-5 mb-3 text-success">Agregar nueva entrada</h4>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const newPost = {
                        ...form,
                        id: Date.now()
                    };
                    setPosts([newPost, ...posts]);
                    setForm({
                        title: "",
                        author: "",
                        date: "",
                        image: "",
                        content: ""
                    });
                }}
                className="mb-5"
            >
                    {/* campos con etiqueta y ejemplo */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: 5 consejos para una vida saludable"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Autor</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: EcoMarket Team"
                            value={form.author}
                            onChange={e => setForm({ ...form, author: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            required
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="form-label fw-bold">URL de la imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: https://miweb.com/imagen.jpg"
                            value={form.image}
                            onChange={e => setForm({ ...form, image: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fw-bold">Contenido</label>
                        <textarea
                            className="form-control"
                            placeholder="Ej: En este artículo te contamos cómo mejorar tu alimentación..."
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            required
                        />
                    </div>
                <button type="submit" className="btn btn-primary">Agregar entrada</button>
            </form>
            </div>
    </>
    );
}
export default Blog;