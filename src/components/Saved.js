import React, { Component } from 'react'

import { Container, Row, Col} from 'react-bootstrap';
import Meme from "./Meme"
import axios from "axios"
import $ from "jquery"

export class Body extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             memes: [],
             error: false
        }
    }
    
    componentDidMount(){
        var unfilteredMemes
        axios.get("https://compfest-entry-api.herokuapp.com/api/")
            .then(res => {
                this.setState({memes: res.data})
                unfilteredMemes = this.state.memes
            })
            .catch(err => {
                this.setState({...this.state,isError: true})
            })

        $(".searchbar").on("keyup",() => {
            var search_value = $(".searchbar").val()
            if (search_value !== "") {
                this.setState({...this.state,memes: unfilteredMemes.filter(meme => meme.title.toLowerCase().includes(search_value.toLowerCase()))})
            } else {
                this.setState({...this.state,memes: unfilteredMemes})
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.isError ? <div className="alert alert-danger">
                    An error occurred, please make sure the Django server is running or try refreshing the page.
                    </div> : ""}
                <Container>
                    <div className="text-light m-2 text-center">
                        <h4>Saved Memes</h4>
                        <p>There are the memes that you love</p>
                    </div>
                    { this.state.memes.length !== 0 || this.state.isError ? 
                        ""
                        :
                        <div className="text-light m-2 text-center">
                            <h1>You have no saved memes</h1>
                            <h3>Why not save some to laugh at it later?</h3>
                        </div>
                    }
                    <Row>
                        <Col className="d-flex justify-content-start align-items-center flex-column mt-2 meme-column">
                            {this.state.memes.slice(2*Math.floor(this.state.memes.length/3),this.state.memes.length).map(meme => 
                            /* Leftmost Panel */
                            <Row>
                               <Meme
                                    key={meme.id}
                                    postLink={meme.postLink}
                                    subreddit={meme.subreddit}
                                    title={meme.title}
                                    url={meme.url}
                               />
                            </Row> 
                            )}
                        </Col>
                        <Col className="d-flex justify-content-start align-items-center flex-column mt-2 meme-column">
                            {this.state.memes.slice(Math.floor(this.state.memes.length/3),2*Math.floor(this.state.memes.length/3)).map(meme => 
                            /* Middle Panel */
                                <Row>
                                <Meme
                                    key={meme.id}
                                    postLink={meme.postLink}
                                    subreddit={meme.subreddit}
                                    title={meme.title}
                                    url={meme.url}
                                />
                                </Row> 
                            )}
                        </Col>
                        <Col className="d-flex justify-content-start align-items-center flex-column mt-2 meme-column">
                            {this.state.memes.slice(0,Math.floor(this.state.memes.length/3)).map(meme => 
                            /* Rightmost Panel */
                                <Row>
                                <Meme
                                    key={meme.id}
                                    postLink={meme.postLink}
                                    subreddit={meme.subreddit}
                                    title={meme.title}
                                    url={meme.url}
                                />
                                </Row> 
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Body
