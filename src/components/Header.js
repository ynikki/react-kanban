import React from 'react';
import {render} from 'react-dom';

window.onscroll = function (e) {
  var nav = document.getElementsByClassName("header"),
    range = 70;
    scrollTop = document.body.scrollTop;

    if (scrollTop > range) {
      nav.clasList.add("scollNav");
    } else {
      nav.classList.add("scrollNav");
    }
}