import React from 'react';
import '../Loading/Loading.css';
import ppnngg from '../IMG/diamond.png';

function LoadingScreen() {

    return (
        <div className="loading-screen">
            <img src={ppnngg} alt=''/>
            <div class="container">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>

        </div>
    );
}

export default LoadingScreen;
