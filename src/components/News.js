import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const myStyle = {
    display: "grid",
    margin: "2rem auto",
    padding: "0",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
    gap: "2rem",
  };
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async (page, concat) => {
    // console.log(page);
    if(!concat && !alreadyLoaded) props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&language=en&pageSize=10&page=${page}&country=${props.country}&category=${props.category}&q=${props.query}`;
    let response;
    try {
      response = await fetch(url);
      if(!concat && !alreadyLoaded) props.setProgress(30);
    } catch (error) {
      if(!concat && !alreadyLoaded) props.setProgress(100);
      return {
        articles: articles,
        error: "network",
        loading: false,
        isDataFetched: false,
        page: page,
      };
    }
    if (!response.ok) {
      if(!concat && !alreadyLoaded) props.setProgress(100);
      return {
        articles: articles,
        error: "server-side",
        loading: false,
        isDataFetched: false,
        page: page,
      };
    }
    if(!concat && !alreadyLoaded) props.setProgress(50);
    const responseData = await response.json();
    if(!concat && !alreadyLoaded) props.setProgress(70);
    return {
      totalResults: responseData.totalResults,
      articles: concat ? articles.concat(responseData.articles) : responseData.articles,
      loading: false,
      isDataFetched: responseData.articles.length > 0,
      page: page,
      error: null
    };
  };

  const updateState = (result) => {
    setArticles(result.articles);
    setTotalResults(result.totalResults);
    setLoading(result.loading);
    setIsDataFetched(result.isDataFetched);
    setError(result.error);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetchArticles(page);
      if(!alreadyLoaded) props.setProgress(100);
      updateState(result);
      setAlreadyLoaded(true);
    } fetchData();
  }, []);

  const fetchMoreData = async () => {
    // console.log(totalResults);
    // console.log("articles length :- " + articles.length);
    const result = await fetchArticles(page + 1, true);
    setPage(page + 1);
    updateState(result);
  }

  const getNews = (index, article) => {
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

  const getNewsArray = () => {
    const newsArray = [];
    let index = 1;
    for (let article of articles) {
      newsArray.push(getNews(index++, article));
    }
    return newsArray;
  }

  // console.log(page);
  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <h2 className="text-center">Top { props.country === "in" ? "Indian" : props.country === "us" ? "American" : "Worldwide" } Headlines</h2>
      {!loading && articles.length > 0 ? (
        <div>
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={ totalResults <= 100 ? articles.length < totalResults && isDataFetched : articles.length !== 100 }
              loader={<Spinner />}
            >
              <div>
                <ol style={myStyle}>{getNewsArray()}</ol>
              </div>
            </InfiniteScroll>
          </div>
      ) : loading ? (
        <Spinner />
      ) : error ? (
        <h5 className="text-center my-3">
          {error === "server-side"
            ? "Something went wrong Internally! - Stay Tuned"
            : "Please connect to a stable internet connection!"}
        </h5>
      ) : 
        <h5 className="text-center my-3">Sorry for inconvenience - No news are found{ props.query.length > 0 ? ` for ${props.query}` : "" }!</h5>
      }
    </div>
  );
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  query: PropTypes.string
};
News.defaultProps = {
  country: "",
  category: "",
  query: "",
};

export default News;
