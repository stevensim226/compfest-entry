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

        // Get data from Meme API
        axios.get("https://meme-api.herokuapp.com/gimme/10")
            .then(res => {
                $(".loadingscreen").remove()
                this.setState({memes: res.data.memes})
                unfilteredMemes = this.state.memes

            })
            .catch(err => {
                this.setState({...this.state,isError: true})
            })

        // Search by title
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
                { // Check if conencted to the internet
                this.state.isError ? <div className="alert alert-danger">
                    An error occurred, please make sure that you are connected to the internet.
                    </div> : ""}
                
                {this.state.isError ? ""
                :
                <div className="loadingscreen text-light d-flex flex-column justify-content-center align-items-center">
                    <i class="fas fa-circle-notch fa-spin mb-3"></i>
                    <h2>Loading Memes...</h2>
                </div>
                }
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-start align-items-center flex-column mt-2 meme-column">
                            {this.state.memes.slice(2*Math.floor(this.state.memes.length/3),this.state.memes.length).map(meme => 
                            /* Shows meme in 3 panels divided almost equally */
                            /* Leftmost Panel */
                            <Row>
                               <Meme
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
