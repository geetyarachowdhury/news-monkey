import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, time, author, source} = this.props;
        return (
            <div>
                <div className="card">
  <img src={imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ title } <small><span className="badge bg-secondary">{source}</span></small></h5>
    <p className="card-text">{ description }</p>
    <p><small className="text-muted">By { author ? author : "Unknown" } on { new Date(time).toGMTString() }</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-danger">Read More...</a>
    
  </div>
</div>
            </div>
        )
    }
}

export default NewsItem
