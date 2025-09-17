var circle_hour=document.querySelector('.none_circle_hour');
var circle_minutes=document.querySelector('.none_circle_minutes');
var circle_second=document.querySelector('.none_circle_second');
var hour_hand=document.querySelector('.controller_hour');
var minutes_hand=document.querySelector('.controller_minutes');
var second_hand=document.querySelector('.controller_second');
var box=document.querySelector('.Box');
var am_pm=document.querySelector('.am_pm');
    setInterval(function()
{
var now=new Date();
var secondRotate=now.getSeconds()+now.getMilliseconds()/1000;
var secondText = now.getSeconds()
var minutesRotate=now.getMinutes()+secondRotate/60;
var minutesText=now.getMinutes();
var hourRotate=now.getHours()+minutesRotate/60;
var hourText=now.getHours()
circle_hour.style.rotate=30*hourRotate+"deg";
hour_hand.style.rotate=30*hourRotate+"deg";
circle_minutes.style.rotate=6*minutesRotate+"deg";
minutes_hand.style.rotate=6*minutesRotate+"deg";
second_hand.style.rotate=6*secondRotate+"deg";
circle_second.style.rotate=6*secondRotate+"deg";
box.innerText=set(hourText>12?hourText-12:hourText)+":"+set(minutesText)+":"+set(secondText);
am_pm.textContent=(hourText>12?"pm":"am");
},1);
function set(value)
{
    return value < 10 ? '0'+value:value;
}
