var months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var oj = [
    ['Lưu trữ và xử lý dữ liệu lớn','LT+BT',4,'06:45-10:05',[24,25,26,27,28,29,30,31,33,34,35,36,37,38,39,40,41],'D9-201',162302 ,'IT4931'],
    ['IoT và ứng dụng','LT+BT',5,'06:45-09:15',[24,25,26,27,28,29,30,31,33,34,35,36,37,38,39,40,41],'D9-205',157544,'IT4735'],
    ['Nhập môn kỹ thuật truyền thông','LT+BT',5,'12:30-15:00',[2+22,3+22,5+22,6+22,8+22,9+22,11+22,12+22,14+22,15+22,17+22,18+22],'B1-405',157498,'IT2030'],
    ['Các hệ thống phân tán và ứng dụng','LT+BT',6,'12:30-15:00',[2+22,4+22,6+22,8+22,11+22,13+22,15+22,17+22,19+22],'D9-105',157541,'IT4611'],
    ['Nhập môn kỹ thuật truyền thông','LT+BT',7,'15:05-17:35',[4+22,7+22,13+22,16+22,19+22],'D3-101',157539,'IT4593'],
]




var haveOj = []
oj.forEach(element => {
    var tmp = element[2];
    element[4].forEach(e=>{
        var date = new Date(2025,8,15);
        date.setDate(date.getDate()+(e-24)*7+(tmp-2));
        haveOj[`n_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`] = 1;    
    })
});

var now = new Date();
var Month = now.getMonth();
var Year = now.getFullYear();
var index = new Date(); 
setMonthYear(now.getMonth(),now.getFullYear());
setDate(now.getMonth(),now.getFullYear());
setIndex(document.querySelector(`.n_${now.getDate()}_${now.getMonth()}_${now.getFullYear()}`));



function setMonthYear(month,year){
    document.querySelector(".monthYear .content").textContent=`${months[month]}-${year}`;
}


function setIndex(e){
    if(e.textContent=="") return;
    if(document.querySelector(".index")) 
        document.querySelector(".index").classList.remove("index");
    e.classList.add("index");
    if(haveOj[e.classList[0]]==1){
        document.querySelector(".oj").innerHTML = "";
        var countDay = (parseDate(e.classList[0])- (new Date(2025,8,15)))/(1000*60*60*24);
        var countWeek = Math.floor(countDay/7)+24;
        var countDate = countDay%7+2;
        
        oj.forEach(element => {
            if(countDate == element[2] && element[4].includes(countWeek)){
                document.querySelector(".oj").innerHTML+=`
                <div class="content">
    <div>
    <div class="hour">${element[3]}</div>
    <div class="lop">${element[5]}</div>
    </div>
    <div>
    <div class="ten">${element[0]}</div>
    <div class="loaihinh">${element[1]}</div>
    </div>
    <div>
    <div class="malop">${element[6]}</div>
    <div class="mamon">${element[7]}</div>
    </div>
</div>
                `
            }
        });
    }
    else{
        document.querySelector(".oj").innerHTML = "";
    }
}

function setDate(month,year){
    document.querySelector(".date").innerHTML=""
var date = new Date(year, month, 1);

for(var i=0 ; i<date.getDay() ; i++){
    document.querySelector(".date").innerHTML += `<div></div>`;
}
do{
    
if(haveOj[`n_${date.getDate()}_${month}_${year}`]==1)
    document.querySelector(".date").innerHTML += `<div class="n_${date.getDate()}_${month}_${year} haveOj">${date.getDate()}</div>`;
else
    document.querySelector(".date").innerHTML += `<div class="n_${date.getDate()}_${month}_${year}">${date.getDate()}</div>`;

    date.setDate(date.getDate()+1);
}while(date.getDate()!=1);

if(index.getMonth()==month && index.getFullYear()==year){
    setIndex(document.querySelector(`.n_${index.getDate()}_${index.getMonth()}_${index.getFullYear()}`));
}

Array.from(document.querySelector(".date").children).forEach((e) => {
    e.addEventListener("click", () => {
        setIndex(e); 
        index = parseDate(e.classList[0]);
        
    });
});

}
function parseDate(str) {
    if(!document.querySelector("."+str)) return
    let parts = str.split("_");

    // Lấy ngày, tháng, năm từ mảng kết quả
    let day = parseInt(parts[1], 10);
    let month = parseInt(parts[2], 10); // Tháng trong JS bắt đầu từ 0
    let year = parseInt(parts[3], 10);

    // Trả về đối tượng Date
    return new Date(year, month, day);
}

document.querySelector(".right").addEventListener("click",e=>{
Month++
if(Month > 11) {Month = 0
Year ++ 
}
setMonthYear(Month,Year);
setDate(Month,Year);
})
document.querySelector(".left").addEventListener("click",e=>{
    Month--
    if(Month < 0) {Month = 11
    Year --
    }
    setMonthYear(Month,Year);
    setDate(Month,Year);
    })
