import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    query: PropTypes.string
  };
  static defaultProps = {
    country: "",
    category: "",
    query: "",
  };
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
      alreadyLoaded: false,
      totalResults: 0,
      articles: [],
      loading: true,
      isDataFetched: false,
      page: 1,
    };
  }

  fetchArticles = async (page, concat) => {
    // console.log(page);
    if(!concat && !this.state.alreadyLoaded) this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&language=en&pageSize=10&page=${page}&country=${this.props.country}&category=${this.props.category}&q=${this.props.query}`;
    let response;
    try {
      response = await fetch(url);
      if(!concat && !this.state.alreadyLoaded) this.props.setProgress(30);
    } catch (error) {
      if(!concat && !this.state.alreadyLoaded) this.props.setProgress(100);
      return {
        articles: this.state.articles,
        error: "network",
        loading: false,
        isDataFetched: false,
        page: page,
      };
    }
    if (!response.ok) {
      if(!concat && !this.state.alreadyLoaded) this.props.setProgress(100);
      return {
        articles: this.state.articles,
        error: "server-side",
        loading: false,
        isDataFetched: false,
        page: page,
      };
    }
    if(!concat && !this.state.alreadyLoaded) this.props.setProgress(50);
    const responseData = await response.json();
    if(!concat && !this.state.alreadyLoaded) this.props.setProgress(70);
    return {
      totalResults: responseData.totalResults,
      articles: concat ? this.state.articles.concat(responseData.articles) : responseData.articles,
      loading: false,
      isDataFetched: responseData.articles.length > 0,
      page: page,
    };
  };

  async componentDidMount() {
    const result = await this.fetchArticles(this.state.page);
    if(!this.state.alreadyLoaded) this.props.setProgress(100);
    this.setState({...result, alreadyLoaded: true});
  }

  fetchMoreData = async () => {
    // console.log(this.state.totalResults);
    // console.log("articles length :- " + this.state.articles.length);
    const result = await this.fetchArticles(this.state.page + 1, true);
    this.setState(result);
  }

  getNews(index, article) {
    return (
      <NewsItem
        key={index}
        title={article.title}
        description={article.description}
        imageUrl={article.urlToImage}
        url={article.url}
        author={article.author}
        date={article.publishedAt}
        source={article.source.name}
      />
    );
  }

  getNewsArray() {
    const newsArray = [];
    let index = 1;
    for (let article of this.state.articles) {
      newsArray.push(this.getNews(index++, article));
    }
    return newsArray;
  }

  render() {
    // console.log(this.state.page);
    const jsxElement = (
      <div className="container my-5">
        <h2 className="text-center">Top { this.props.country === "in" ? "Indian" : this.props.country === "us" ? "American" : "Worldwide" } Headlines</h2>
        {!this.state.loading && this.state.articles.length > 0 ? (
          <div>
              <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={ this.state.totalResults <= 100 ? this.state.articles.length < this.state.totalResults && this.state.isDataFetched : this.state.articles.length !== 100 }
                loader={<Spinner />}
              >
                <div>
                  <ol style={this.myStyle}>{this.getNewsArray()}</ol>
                </div>
              </InfiniteScroll>
            </div>
        ) : this.state.loading ? (
          <Spinner />
        ) : this.state.error ? (
          <h5 className="text-center my-3">
            {this.state.error === "server-side"
              ? "Something went wrong Internally! - Stay Tuned"
              : "Please connect to a stable internet connection!"}
          </h5>
        ) : 
          <h5 className="text-center my-3">Sorry for inconvenience - No news are found{ this.props.query.length > 0 ? ` for ${this.props.query}` : "" }!</h5>
        }
      </div>
    );
    return jsxElement;
  }
}
