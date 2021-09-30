import '../css/common.scss'
import '../css/module1.css'
import $ from 'jquery';
// import {clg1} from './module1/test1'

// function clickBtn1(){
    // const btn1 = document.getElementById('btn1');
    // console.log(btn1,'111')
    // $("#btn1").css("color",'red')
// }
// clg1();
// clickBtn1();

console.log(9999);
$("#btn1").bind('click',function(){
    $(this).css("color",'green')
})