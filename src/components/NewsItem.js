import React from "react";

const NewsItem = (props) => {
  const myStyle = {
    margin: "auto",
    width: "100%",
    height: "100%",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  };
  const { title, description, imageUrl, url, author, date, source } = props;
    const altImageUrl =
      "https://thumbs.dreamstime.com/b/golden-dove-olive-branch-holy-spirit-peace-concept-vector-illustration-golden-dove-olive-branch-holy-spirit-peace-219580021.jpg";
    return (
      <li className="card" style={myStyle}>
        <img
          src={imageUrl ? imageUrl : altImageUrl}
          style={{ height: "10rem", objectFit: "cover" }}
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <h5 className="card-title">
            {!title || title.length <= 50 ? title : title.slice(0, 50) + "..."}
          </h5>
          <span className="badge text-bg-primary">{source}</span>
          <p className="card-text">
            {!description || description.length <= 50
              ? description
              : description.slice(0, 50) + "..."}
          </p>
          <p className="card-text">
            <small className="text-muted">
                { author && author.slice(0, 4) === "http" ? 
                  <span>By <a style={{ textDecoration: "none", fontWeight: "bold", color: "gray" }} href={author} target="_blank">website</a> on </span> : 
                  author ?
                  <span>By <b>{author.length <= 40 ? author : 
                  author.slice(0, 40) + "..."}</b> on </span> : 
                  "" 
                }
                {
                  new Date(date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) + ", " +
                  new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  })
              }
            </small>
          </p>
          <a
            href={url}
            target="_blank"
            className="btn btn-sm btn-outline-primary"
          >
            Read More
          </a>
        </div>
      </li>
    );
};

export default NewsItem;
