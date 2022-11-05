import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  myStyle = {
    display: "grid",
    margin: "2rem auto",
    padding: "0",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    gap: "2rem",
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?apiKey=43f12184fb55439d8b963c9a14747218&language=en";
    let response;
    try {
      response = await fetch(url);
    } catch(error) {
      this.setState({
        articles: [],
        error: "network",
        loading: false,
      });
      return;
    }
    if(!response.ok) {
      this.setState({
        articles: [],
        error: "server-side",
        loading: false,
      });
      return;
    }
    const responseData = await response.json();
    // console.log(responseData);
    this.setState({
      articles: responseData.articles,
      loading: false
    })
  }

  getNews(index, article) {
    return (
        <NewsItem key={ index } title={ article.title } description={ article.description } imageUrl={ article.urlToImage } url={ article.url } />
    );
  }

  getNewsArray() {
    const newsArray = [];
    let index = 1;
    for(let article of this.state.articles) {
      newsArray.push(this.getNews(index++, article));
    }
    return newsArray;
  }

  render() {
    const jsxElement = (
        <div className='container my-5'>
          <h2 className='text-center'>Top Headlines</h2>
          { 
            !this.state.loading && this.state.articles.length > 0 ?
              <ol style={ this.myStyle }>
                { this.getNewsArray() }
              </ol> : 
              this.state.loading ?
              <div className="text-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div> :
              <h5 className="text-center my-3">
                { this.state.error === "server-side" ? 
                "Something went wrong Internally! - Stay Tuned" : 
                "Please connect to a stable internet connection!" }
              </h5>
          }
        </div>
    );
    return jsxElement;
  }
}
