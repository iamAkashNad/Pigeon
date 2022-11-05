import React, { Component } from 'react';

export default class NewsItem extends Component {
    myStyle = {
        margin: "auto",
        width: "100%",
        height: "100%",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    };
  render() {
    const { title, description, imageUrl, url } = this.props;
    const altImageUrl = "https://thumbs.dreamstime.com/b/golden-dove-olive-branch-holy-spirit-peace-concept-vector-illustration-golden-dove-olive-branch-holy-spirit-peace-219580021.jpg";
    return (
        <li className="card" style={ this.myStyle }>
            <img src={ imageUrl ? imageUrl : altImageUrl } style={{ height: "10rem", objectFit: "cover" }} className="card-img-top" alt="News Image" />
            <div className="card-body">
                <h5 className="card-title">
                    { !title || title.length <= 50 ? title : title.slice(0, 50) + "..." }
                </h5>
                <p className="card-text">
                    { !description || description.length <= 50 ? description : description.slice(0, 50) + "..." }
                </p>
                <a href={ url } target="_blank" className="btn btn-sm btn-outline-primary">Read More</a>
            </div>
        </li>
    )
  }
}
