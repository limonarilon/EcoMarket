import React from "react";
import formattedImages, { getImageSrc } from './Images';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


 useEffect(() => {
  let mounted = true;
    axios.get("/Post.json")
      .then(res => { if (mounted) setPosts(res.data || []); })
      .catch(err => { if (mounted) setError(err.message || "Error loading posts"); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);


  return (
    <div
      style={{
        backgroundImage: `url(${formattedImages['.assets/images/background-pattern']})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
      }}
    >
      <section id="blog" className="blog-section">
        <div className="container">
          {/* Título de la sección */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="section-title-llamativo">Nuestro blog</h2>
              <p className="section-subtitle-llamativo">
                Mantente al día con nuestros artículos y novedades
              </p>
            </div>
          </div>

          {/* Posts */}
          <div className="row justify-content-center align-items-stretch">
            {posts.map((post, index) => (
              <div key={post.id} className="col-md-4 d-flex align-items-stretch mb-4">
                <div className="blog-card w-100 d-flex flex-column align-items-center">
                  <img
                    src={getImageSrc(post.image)}
                    alt={post.title ? post.title : `Blog ${index + 1}`}
                    className="img-fluid"
                    style={{ height: "220px", objectFit: "cover", width: "100%", borderRadius: "12px" }}
                  />
                  <h5 className="blog-title mt-3 text-center">{post.title}</h5>
                  <p className="blog-excerpt text-center">
                    {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
                  </p>
                  <Link to="/blog" className="btn btn-outline-success mt-2">Ver más</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;