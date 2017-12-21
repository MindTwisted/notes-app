import React, {Component} from 'react';
import PreloaderGIF from '../../static/images/preloader.gif';

class Preloader extends Component {
    render() {
        return (
            <div className="Preloader">
                <img src={PreloaderGIF}
                     alt="Preloader"
                     className="Preloader__image"/>
            </div>
        )
    }
}

export default Preloader;