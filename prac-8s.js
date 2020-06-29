// スライドショーに表示する画像
const imgList = [
    "images/image01.png",
	"images/image02.png",
	"images/image03.png",
    "images/image04.png",
    "images/image05.png"
];

Array.prototype.hoge = () => {console.log('hoge')}

console.log(imgList.__proto__)
imgList.hoge();

const huge = [

]

huge.hoge();
// 画像ナビの要素を自動で追加
for(let i = 0; i < imgList.length; i++){
    // li要素を取得
    const slide = document.createElement("li");

    // li要素の中に画像タグを埋め込む
    slide.innerHTML = "<img src='" + imgList[i] + "'>";

    // li要素をクラス名「slider-innner」の子要素として追加
    const sliderInnerCollection = document.getElementsByClassName("slider-inner")
    sliderInnerCollection[0].appendChild(slide);

    // li要素を取得
    const nav = document.createElement("li");
    console.log(nav);

    // プロパティ「data-nav-index」に数値を割り振る
    nav.setAttribute("data-nav-index", i);

    // li要素をクラス名「nav」のこ要素として追加
    document.getElementsByClassName("nav")[0].appendChild(nav);
}

imgList.forEach((img, index) => {
    console.log(img, index)
})

// スライドの数を取得（処理のために-1する）
const length = imgList.length - 1;

//クラス名「imgeSlide」に画像の１枚の要素を格納
const imageSlide = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");

// クラス名「dotNavigation」にドットナビの１つの要素を格納
const dotNavigation = document.getElementsByClassName("nav")[0].getElementsByTagName("li");

// 「現在○枚目の画像を表示している」というインデックス番号を格納する変数
let nowIndex = 0;

// 現在表示されている画像とドットナビにクラス名を付ける
imageSlide[nowIndex].classList.add("show");
dotNavigation[nowIndex].classList.add("current");

// スライドがアニメーション中か判断するフラグ
let isChanging = false;

// スライドのsetTimeoutを管理するタイマー
let slideTimer;

// スライド切り替え時に呼び出す関数
function sliderSlide(val){

    // スライド中なら画像の切り替えをしない
    if(isChanging){
        return false;
    }

    isChanging = true;  // スライド中

    // 現在表示している画像とナビからクラス名を削除
    imageSlide[nowIndex].classList.remove("show");
    dotNavigation[nowIndex].classList.remove("current");
    nowIndex = val;

    // 次に表示する画像とナビにクラス名を付与
    imageSlide[nowIndex].classList.add("show");
    dotNavigation[nowIndex].classList.add("current");

    // アニメーションが終わるタイミングでisChangingのステータスをfalseに
    slideTimer = setTimeout(function(){
        isChanging = false;              //スライドが終わったのでスライド中ではない 
    },600);
}

// 左矢印のナビをクリックした時のイベント
document.getElementById("arrow-prev").addEventListener("click",() => {
    let index = nowIndex - 1;
    if(index < 0){
        index = length;
    }
    sliderSlide(index);
},false);

// 右矢印のナビをクリックした時のイベント
document.getElementById("arrow-next").addEventListener("click",function(){
    let index = nowIndex + 1;
    if(index > length){
        index = 0;
    }
    sliderSlide(index);
},false);

// ドットナビをクリックした時のイベント
for(let i=0; i < dotNavigation.length; i++){

    // データ属性のインデックス番号を元にスライドを行う
    dotNavigation[i].addEventListener("click",() => {
        const index = Number(this.getAttribute("data-nav-index"));
        sliderSlide(index);
    },false);
}