import Slider from "react-slick";
import React, {useRef, useState, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../style/IDLE.module.css';
import {Link} from "react-router-dom";
import moment from "moment";

export default function IDLE() {
    const host_ip = `${process.env.REACT_APP_IP}`;
    const addr = "ws://"+ host_ip + ":5000";
    const [outputs, setOutputs] = useState([]);
    const [imgs, setImg] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    let ws = useRef(null);
    const shelter_num = `${process.env.SHELTER_NUM}`;

    let timer = null;
    const [time, setTime] = useState(moment());

    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    function getExtension(filename) {
        let parts = filename.split('.');
        return parts[parts.length - 1];
    }

    function isImage(filename) {
        let extI = getExtension(filename);
        switch (extI.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false;
    }

    function isVideo(filename) {
        let extV = getExtension(filename);
        console.log(extV.toLowerCase())
        switch (extV.toLowerCase()) {
            case 'm4v':
            case 'avi':
            case 'mpg':
            case 'mp4':
                return true;
        }
        return false;
    }

    useEffect(() => {
        if(!ws.current) {
            ws.current = new WebSocket(addr);
            ws.current.onopen = () => {
                console.log("connected to " + addr);
                setOutputs("connected to " + addr);
                setSocketConnected(true);
                ws.current.send(
                    JSON.stringify({
                        message: 0
                    })
                )
            };
            ws.current.onclose = (error) => {
                console.log("disconnect from " + addr);
                setOutputs("disconnect from " + addr)
                console.log(error);
            };
            ws.current.onerror = (error) => {
                console.log("connection error " + addr);
                setOutputs("connection error " + addr)
                console.log(error);
            };
            ws.current.onmessage = (evt) => {
                // server에서 보낸 데이터
                const data = JSON.parse(evt.data)
                data.map((data) => {
                    addMessage(data);
                    console.log(data);
                })
            };
        };
    }, []);

    function addMessage(img) {

        setImg([...imgs, img]);
    }

    const settings = {
        slide: 'div',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false
    };

    return (
        <div>
            <header className={styles.page3_header}>
                <div className={styles.page3_date}>
                    {time.format('YYYY-MM-DD')}
                </div>
                {/* LT=4:50 , LTS=4:50:21 */}
                <div className={styles.page3_time}>{time.format('LT')}</div>
            </header>



            <Slider {...settings}>
                    {imgs.map(m =>
                        <div className={styles.slide_list} key={m}>
                            {
                                isImage(m) === true ?
                                <img src={`${process.env.PUBLIC_URL}` + m} key={m} />
                                : <video muted autoPlay src={`${process.env.PUBLIC_URL}` + m} key={m} />
                            }
                        </div>
                    )}
            </Slider>

            <div className={styles.social}>
                <tr>
                    <p>작품보기<br/>
                        <button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
                            <Link to='/select' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
                <tr>
                    <p className={styles.line}>낙서장<br/>
                        <button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
                            <Link to='/board' style={{color : 'white', textDecoration: 'none'}}>GO</Link>
                        </button>
                    </p>
                </tr>
                <tr>
                    <p className={styles.QR}>
                        <img whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} key="shelter_num" src={`${process.env.PUBLIC_URL}` + '/ftp/ShelterQR/Content/Shelter_'+ shelter_num + '/contentQR.jpg'}/>
                    </p>
                </tr>
            </div>
        </div>
    );
}

