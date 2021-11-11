import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


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
      load: false,
      page:1
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d19c9246bb974386974fc21deac9bb1d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState( { load: true } );
    let data = await fetch( url );
    let parsedData = await data.json();
    this.setState( { articles: parsedData.articles, load: false, totalResults: parsedData.totalResults } );
    console.log( parsedData.articles );
  } 

  async componentDidMount() {
   this.updateNews();
  }

  handlePrev = async () => {
    this.setState( { page: this.state.page - 1 } );
    this.updateNews();
  }

  handleNext = async () => {
    this.setState( { page: this.state.page + 1 } );
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "35px"}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
        {this.state.load && <Spinner />}
        <div className="row">
          { !this.state.load && this.state.articles.map( ( element ) => {
            return <div className="col-md-4 my-2 d-flex justify-content-center" key={element.url}>
              <NewsItem newsUrl={ element.url } title={ element.title ? element.title : "..." } description={ element.description ? element.description : "..." }
                imageUrl={ element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/videos/black-and-white-loading-indicator-on-dark-background-screen-animation-video-id1129874433?s=640x640" }
                time = {element.publishedAt} author={element.author} source={element.source.name}
                />
          </div>
          })}
                   
        </div>
        <div className="container mt-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-danger" onClick={this.handlePrev}> &larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
