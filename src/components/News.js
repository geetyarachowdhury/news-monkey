import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      load: true,
      page:1
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async updateNews() {
    this.props.setProgress( 10 );
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch( url );
    this.props.setProgress( 40 );
    let parsedData = await data.json();
    this.props.setProgress( 70 );
    this.setState( {
      articles: parsedData.articles,
      load: false,
      totalResults: parsedData.totalResults
    } );
    this.props.setProgress( 100 );
  } 

  async componentDidMount() {
   this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState( { page: this.state.page + 1 } );
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d19c9246bb974386974fc21deac9bb1d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch( url );
    let parsedData = await data.json();
    this.setState( {
      articles: this.state.articles.concat( parsedData.articles ),
      totalResults: parsedData.totalResults
    } );
   
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: "35px"}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
        {/* {this.state.load && <Spinner />}          */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
          {this.state.articles.map( ( element ) => {
            return <div className="col-md-4 my-2 d-flex justify-content-center" key={element.url}>
              <NewsItem newsUrl={ element.url } title={ element.title ? element.title : "..." } description={ element.description ? element.description : "..." }
                imageUrl={ element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/videos/black-and-white-loading-indicator-on-dark-background-screen-animation-video-id1129874433?s=640x640" }
                time = {element.publishedAt} author={element.author} source={element.source.name}
                />
          </div>
          })}                   
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
