import React from "react";

const BlogPost = () => {
  return (
    <section id="blog" className="blog-section">
      <div className="container">
        {/* Título de la sección */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="section-title">Últimas noticias</h2>
            <p className="section-subtitle">
              Mantente al día con nuestros artículos y novedades
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="row">
          {/* Blog 1 */}
          <div className="col-md-4 mb-4">
            <div className="blog-card">
              <img
                src="/assets/blog1.jpg"
                alt="Blog 1"
                className="img-fluid"
              />
              <h5 className="blog-title mt-2">Título del Blog 1</h5>
              <p className="blog-excerpt">Resumen del artículo del blog 1...</p>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="col-md-4 mb-4">
            <div className="blog-card">
              <img
                src="/assets/blog2.jpg"
                alt="Blog 2"
                className="img-fluid"
              />
              <h5 className="blog-title mt-2">Título del Blog 2</h5>
              <p className="blog-excerpt">Resumen del artículo del blog 2...</p>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="col-md-4 mb-4">
            <div className="blog-card">
              <img
                src="/assets/blog3.jpg"
                alt="Blog 3"
                className="img-fluid"
              />
              <h5 className="blog-title mt-2">Título del Blog 3</h5>
              <p className="blog-excerpt">Resumen del artículo del blog 3...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
