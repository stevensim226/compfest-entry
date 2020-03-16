import React, { Component } from 'react'

import { Row, Col} from 'react-bootstrap';
import $ from "jquery"
import axios from "axios"

export class Meme extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isSaved: false
        }
    }
    
    componentDidMount(){
        $(function(){
            $(".meme").hover(() => {
                $(".hover-blur").css({"z-index":3,"opacity":0.7})
            }, () => {
                $(".hover-blur").css({"z-index":1,"opacity":0})
            })
        })
        
        // Check if meme saved or not
        axios.post("https://compfest-entry-api.herokuapp.com//api/check",{
            postLink: this.props.postLink,
            subreddit: this.props.subreddit,
            title: this.props.title,
            url: this.props.url
        })
        .then(res => this.setState({isSaved: res.data.exists}))
        .catch(err => () => {
            $(".save-error").css("display","block")
            setTimeout(() => {
                $(".save-error").css("display","none")
            }, 3000)
        })
    }

    // Saves meme with post request to the saved meme api
    handleSave = () => {
        axios.post("https://compfest-entry-api.herokuapp.com//api/create",{
                postLink: this.props.postLink,
                subreddit: this.props.subreddit,
                title: this.props.title,
                url: this.props.url
            
        })
        .then(res => this.setState({isSaved: true}))
        .catch(err => {
            $(".save-error").css("display","block")
            setTimeout(() => {
                $(".save-error").css("display","none")
            }, 3000)
        })
    }

    // Deletes meme from the api
    handleUnsave = () => {
        axios.delete("https://compfest-entry-api.herokuapp.com//api/delete",{
            data : {
            postLink: this.props.postLink,
            subreddit: this.props.subreddit,
            title: this.props.title,
            url: this.props.url
            }
        })
        .then(res => this.setState({isSaved: false}))
        .catch(err => {
            $(".save-error").css("display","block")
            setTimeout(() => {
                $(".save-error").css("display","none")
            }, 3000)
        })
    }

    render() {
        return (
            <div class="mb-2 meme">
                <img className="meme-image rounded" alt="meme" src={this.props.url}></img>
                <div className="p-1 meme-info rounded-bottom">
                    <Row>
                        <Col xs={8}>
                            <p className="m-0 pl-2 text-light font-weight-bold">{this.props.title}</p>
                            <p className="m-0 pl-2 text-light">from {this.props.subreddit}</p>
                        </Col>
                        <Col xs={4} className="text-gold d-flex align-items-center save-button" onClick={this.state.isSaved ? this.handleUnsave : this.handleSave}>
                            { this.state.isSaved ? <i class="fas fa-bookmark"></i> : <div><i className="far fa-bookmark"></i></div> }
                            { this.state.isSaved ? <div className="ml-2">Saved</div> : <div className="ml-2">Save</div> }
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Meme
