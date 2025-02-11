import axios from "axios"
import '../style/main.css';
import '../style/noscript.css';
import '../style/mycss.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Community() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const port = "8000";
    const backend_url = "http://" + host_ip + ":" + port;

    return(
        <html>
        {/*br tag for screen matching control without css*/}
        <br/>
        <br/>
        <head>
            <meta charSet="UTF-8"/>
            <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
            <meta content="width=device-width,initial-scale=1" name="viewport"/>
            <meta content="description" name="description"/>
            <meta name="google" content="notranslate"/>
            <meta content="Mashup templates have been developped by Orson.io team" name="author"/>
            <meta name="msapplication-tap-highlight" content="no"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link rel="stylesheet" href="assets/css/main.css"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css"/>
        </head>
        <body>
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <Link to='/select' className="w3-bar-item w3-button w3-padding-large" style={{color : 'white', textDecoration: 'none'}}>GALLERY</Link>
            </div>
        </div>
        <div className="my_center">
            <div className="detail-contents">
                <p style={{textAlign: 'center'}}>
                    <Link to = '/issueboard' className="w3-bar-item w3-button w3-padding-large" style={{color : 'black', textDecoration: 'none'}}>
                        <strong>Issue Board</strong></Link>
                </p>
                <hr></hr>
                    <div className="wrapper">
                            {/*{% for list in communitylist %}*/}
                            <ul className="nav my_center_txt">
                                {/*<li><a href="#">{{list.name}}</a></li>*/}
                            </ul>
                            {/*{% endfor %}*/}
                    </div>
                    <p style={{textAlign: 'center'}}>
                        <Link to = '/dailyboard' className="w3-bar-item w3-button w3-padding-large" style={{color : 'black', textDecoration: 'none'}}>
                            <strong>Daily Board</strong></Link>
                    </p>
                    <hr></hr>
                        <div className="wrapper">
                            {/*<table>*/}
                                {/*{% for list in communitylist %}*/}
                                <ul className="nav my_center_txt">
                                    {/*<li><a href="#">{{list.name}}</a></li>*/}
                                </ul>
                                {/*{% endfor %}*/}
                            {/*</table>*/}
                        </div>

                        <p style={{textAlign: 'center'}}>
                            <a href = {'http://' + host_ip + ':' + port + '/Service/paintlist'} className="w3-bar-item w3-button w3-padding-large" style={{color : 'black', textDecoration: 'none'}}>
                                <strong>Drawing Guest Book</strong></a>
                            {/*<Link to = '/paintlist' className="w3-bar-item w3-button w3-padding-large" style={{color : 'black', textDecoration: 'none'}}>*/}
                            {/*    <strong>Drawing Guest Book</strong></Link>*/}

                        </p>


            </div>

            {/*<div style={{textAlign: 'center'}}>*/}
            {/*    <div><h3 style={{paddingLeft: '40px'}}>QR코드를 찍어 커뮤니티 댓글작성!</h3></div>*/}
                {/*<img src="/media/{{communityQR}}">*/}
            {/*</div>*/}


        </div>
        </body>
        </html>
    )

}
export default Community;
