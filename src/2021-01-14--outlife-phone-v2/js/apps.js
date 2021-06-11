let $time = $('.js-time'),
    $date = $('.js-date'),
    homeLocked = '.js-home-locked',
    homeButtonLock = '.js-button-lock',
    homeUnlocked = '.js-home-unlocked',
    $lockedIcon = $('.js-locked-icon'),
    $apps = $('.js-apps');


/*
* Constructors
* */
class Component
{
    constructor(selector){
        this.el = selector;
        this.$el = $(this.el);
    }
    show(){
        this.$el.css({opacity: 1, visibility: 'visible'});
    }
    hide(){
        this.$el.css({opacity: 0, visibility: 'hidden'});
    }
    clear(){
        this.$el.html('');
    }
}
class ButtonBack extends Component
{
    constructor(selector){
        super(selector);
        this.$elIcon = this.$el.find('.js-button-back-icon')
    }
    set text(text){
        this.$el.find('span').html(text);
    }
    set link(link){
        this.$el.attr('onclick', link)
    }
    get white(){
        this.$elIcon.css('stroke', '#ffffff');
        this.$el.css('color', '#ffffff');
    }
    get black(){
        this.$elIcon.css('stroke', '#000000');
        this.$el.css('color', '#000000');
    }
    get blue(){
        this.$elIcon.css('stroke', '#007AFF');
        this.$el.css('color', '#007AFF');
    }
}
class LineBack extends Component
{
    constructor(selector){
        super(selector);
        this.$elLine = this.$el.find('.line')
    }
    get white(){
        this.$elLine.css('background', '#ffffff');
    }
    get black(){
        this.$elLine.css('background', '#000000');
    }
    get blue(){
        this.$elLine.css('background', '#007AFF');
    }
}
class IphoneHeader extends Component
{
    constructor(selector){
        super(selector);
        this.$elTime = this.$el.find('.js-header-time');
        this.$elIcon = this.$el.find('.js-header-icon');
    }
    get white(){
        this.$elTime.css('color', '#ffffff');
        this.$elIcon.css('fill', '#ffffff');
    }
    get black(){
        this.$elTime.css('color', '#000000');
        this.$elIcon.css('fill', '#000000');
    }
    get blue(){
        this.$elTime.css('color', '#007AFF');
        this.$elIcon.css('fill', '#007AFF');
    }
}
class Wallpaper extends Component
{
    constructor(selector){
        super(selector);
        this.$elLocked = this.$el;
        this.$elUnlocked = this.$el.find('.background');

    }
    set select(index){
        this.$elLocked.css('background-image', `url(${images[index]})`);
        this.$elUnlocked.css('background-image', `url(${images[index]})`);
    }
    set settingSelect(n){
        $(this.el + `[data-image='${n}']`)
            .addClass('selected')
    }
}

const appsContainer = new Component('.js-apps');
const iphoneHeader = new IphoneHeader('.js-header');
const lineBack = new LineBack('.js-line-back');
const buttonBack = new ButtonBack('.js-button-back');
const wallpaperImage = new Wallpaper('.js-home');
const settingWallpaperImage = new Wallpaper('.js-item-wallpaper');


/*
* general functions
* */
// click to unlock
$(function()
{
    $(homeLocked).on('click', function () {
        $lockedIcon
            .find('svg')
            .animate({
                top: '-5px',
            }, 200);

        setTimeout(function () {
            $(homeLocked)
                .animate({
                        opacity: 0,
                    },
                    300,
                    'linear',
                    function(){
                        $( this )
                            .css({visibility: 'hidden'});
                    }
                );
        },350);
    });
    $(homeButtonLock).on('click', function () {
        appsContainer.clear();
        closeApp();
        $lockedIcon.find('svg').css('top', '0');
        $(homeLocked).css({visibility: 'visible', opacity: '1'});
    })
});
function clock()
{
    let d = new Date(),
        month = d.getMonth(),
        day = d.getDate(),
        days = d.getDay(),
        hours = d.getHours(),
        minutes = d.getMinutes(),

        daysName = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
        monthName = ['Января','Февраля','Марта','Апреля','Мая','Июля','Июня','Августа','Сентября','Октября','Ноября','Декабря'],

        daysN = daysName[days],
        monthN = monthName[month];

    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;

    $time.html(`${hours}:${minutes}`);
    $date.text(`${daysN}, ${day} ${monthN}`);

    setTimeout("clock()", 1000);
}
function onlyNumber(inputs)
{
    $(inputs).on('keydown', function (e) {
        return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));
    });
}
function thousandSeparators(amount)
{
    let n = amount.toString();
    return  n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}
function closeApp()
{
    iphoneHeader.white;
    appsContainer.clear();
    lineBack.hide();
    buttonBack.hide();
    buttonBack.text = '';
    buttonBack.link = 'closeApp()';
}
function blackStaff(backText = '')
{
    iphoneHeader.black;
    buttonBack.show();
    lineBack.show();
    buttonBack.text = backText;
    buttonBack.black;
    lineBack.black;
}
function whiteStaff(backText = '')
{
    iphoneHeader.white;
    buttonBack.show();
    lineBack.show();
    buttonBack.text = backText;
    buttonBack.white;
    lineBack.white;
}
function playerInfo(name, number)
{
    $('.js-player-name').text(name);
    $('.js-player-number').text(`Мой номер: ${number}`);
}


/*
* App Bank
* */
$('.js-bank').on('click', function ()
{
    blackStaff();
    appBank();
});
function appBank()
{
    $apps
        .html(`
            <div class="app bank js-bank">
                <img class="bank-img js-bank-img" src="img/bank.svg" alt="">
                <span>Total Balance</span>
                <p class="bank-balance js-bank-balance">$${thousandSeparators(bankBalance)}</p>
                <a class="pay-house" onclick="showPayBlock(1)">
                    Оплатить<br /> дом
                </a>
                <a class="pay-rent" onclick="showPayBlock(2)">
                    Оплатить<br /> квартиру
                </a>
                <a class="pay-phone" onclick="showPayBlock(3)">
                    Пополнить<br /> телефон
                </a>
                <a class="pay-biz" onclick="showPayBlock(4)">
                    Оплатить<br /> бизнес
                </a>
                <div class="pay-block js-pay-block"></div>
                <div class="js-pay-transition"></div>
            </div>
        `);

    $('.js-pay-block').css('top', '100%');
    $('.js-bank-img').css({width: '9.0625vh',marginBottom: '2.34375vh'});
}
function showPayBlock(type)
{
    let text = '';

    if(type === 1) text = 'Оплатить дом';
    if(type === 2) text = 'Оплатить квартиру';
    if(type === 3) text = 'Пополнить телефон';
    if(type === 4) text = 'Оплатить бизнес';

    $('.js-pay-block')
        .html(`
            <a class="pay-block__cancel js-pay-cancel" onclick="hidePayBlock()">Отмена</a>
            <span class="pay-block__type js-pay-type">${text}</span>
            <input type="text" class="pay-block__amount">
            <span  class="pay-block__fee">Ваша комиссия - 10%</span>
            <a class="pay-block__button" onclick="bankPays(${type})">Оплатить</a>
        `)
        .animate({
            top: '30%',
        }, 150);

    $('.js-bank-img')
        .animate({
            width: '4.45313vh',
            height: '4.92188vh',
            marginBottom: '0.78125vh'
        }, 150);

    onlyNumber('.pay-block__amount');
}
function hidePayBlock()
{
    $('.js-pay-block')
        .animate({top: '100%',}, 150);
    $('.js-bank-img')
        .animate({
            width: '9.0625vh',
            height: '10.15625vh',
            marginBottom: '2.34375vh'
        }, 150);
}
function bankPays(type)
{
    let input = $('.pay-block__amount');
    let value = input.val();

    if(value === '') input.focus();

    if(type === 1 && value !== '')
    {
        transactionProcessing();
        console.log('дом => ' + value);
    }
    if(type === 2 && value !== '')
    {
        transactionProcessing();
        console.log('квартира => ' + value);
    }
    if(type === 3 && value !== '')
    {
        transactionProcessing();
        console.log('телефон => ' + value);
    }
    if(type === 4 && value !== '')
    {
        transactionProcessing();
        console.log('бизнес => ' + value);
    }
}
function transactionProcessing()
{
    let $payTransition = $('.js-pay-transition');

    $payTransition
        .html(`
            <div class="pay-transition">
                <div class="spin-circle transition-img"></div>
                <span>Транзакция в обработке</span>
                <a onclick="appBank()" >на главную</a>
            </div>
        `);

    setTimeout(function() {
        $payTransition
            .find('div')
            .removeClass('spin-circle')
            .addClass('accept');
        $payTransition
            .find('span')
            .text('Транзакция завершена')
            .css('padding-bottom', '30px');
        $payTransition
            .find('a')
            .css('display', 'inline-block')
    }, 2000);
}


/*
* App Taxi
* */
$('.js-taxi').on('click', function ()
{
    blackStaff();
    appTaxi();
});
function appTaxi()
{
    blackStaff();

    $apps.html(`
        <div class="app taxi js-taxi">
            <img src="img/taxi-logo.svg" alt="">
            <span><span class="bold">Split</span>Taxi</span>
            <a class="button" onclick="taxiList()">Список заказов</a>
            <div class="js-taxi-list"></div>
        </div>
    `);
}
function taxiList()
{
    whiteStaff('Выйти');
    buttonBack.link = 'closeApp()';


    $('.js-taxi-list')
        .html(`
            <div class="taxi-list js-taxi-list">
                <p class="title">Список заказов</p> 
                <div class="items scroll js-taxi-items"></div>
            </div>
        `);
    taxiListItems();
}
function taxiListItems()
{
    for(let i = 0; i < taxiOrders.length; i++){

        let player = taxiOrders[i].playerName;
        let address = taxiOrders[i].address;
        let distance = taxiOrders[i].distance;

        $('.js-taxi-items')
            .append(`
            <div class="item">
                <span class="item__header">${player}</span>
                <span class="item__address">${address}</span>
                <span class="item__distance">До места подачи: <span class="js-distance">${distance} км</span></span>
                <a class="item__button" onclick="taxiOrder(${i})">Принять</a>
            </div>
        `);
    }
}
function taxiOrder(i)
{
    buttonBack.text = 'Список заказов';
    buttonBack.link = 'taxiList()';

    let player = taxiOrders[i].playerName;
    let address = taxiOrders[i].address;
    let distance = taxiOrders[i].distance;

    acceptOrder(i);

    $('.js-taxi-list')
        .html(`
            <div class="taxi-order js-taxi-order">
                <p class="title">Мой заказ</p> 
                <span>Клиент</span>
                <p class="js-client-name">${player}</p>
                <span>До конечной точки</span>
                <p class="js-client-name">${distance} км</p>
                <div class="points">
                    <svg viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.389 0.697587C19.9053 1.78584 22.7659 4.64704 23.8535 8.16336C25.0244 11.9481 24.379 15.8795 22.0794 18.9428L12.6615 31.021L3.24302 18.9434C1.71176 16.911 0.887043 14.4337 0.894582 11.889C0.898722 10.0452 1.33414 8.22798 2.16603 6.58253C2.99792 4.93708 4.20321 3.50906 5.68556 2.41262C8.70783 0.185431 12.6675 -0.455217 16.389 0.697587ZM9.14247 17.1574C10.1841 17.8534 11.4087 18.2249 12.6615 18.2249C14.3407 18.2225 15.9504 17.5544 17.1377 16.3671C18.3251 15.1797 18.9932 13.57 18.9956 11.8908C18.9956 10.6381 18.6241 9.41342 17.9281 8.37179C17.2321 7.33015 16.2429 6.5183 15.0855 6.03889C13.928 5.55948 12.6545 5.43404 11.4258 5.67844C10.1971 5.92284 9.06847 6.52611 8.18263 7.41194C7.29679 8.29778 6.69353 9.42641 6.44912 10.6551C6.20472 11.8838 6.33016 13.1574 6.80957 14.3148C7.28898 15.4722 8.10084 16.4614 9.14247 17.1574ZM10.1529 8.13749C10.8956 7.64003 11.7692 7.374 12.6631 7.37305C13.8615 7.37193 15.0113 7.84675 15.8597 8.69312C16.7081 9.5395 17.1857 10.6881 17.1875 11.8865C17.1887 12.7805 16.9247 13.6547 16.4291 14.3986C15.9334 15.1425 15.2282 15.7227 14.4028 16.0659C13.5773 16.409 12.6687 16.4996 11.7917 16.3263C10.9148 16.153 10.1089 15.7235 9.47602 15.0922C8.84316 14.4608 8.41173 13.656 8.23631 12.7795C8.06089 11.9029 8.14935 10.994 8.49051 10.1678C8.83166 9.34149 9.41018 8.63495 10.1529 8.13749Z" fill="white"/>
                    </svg>
                    <p class="start">Pillbox Hill</p>
                    <img src="img/points-dots.svg" alt="">
                    <svg viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0799 8.82156C22.9817 5.30524 20.0934 2.44405 16.543 1.35579C12.7855 0.202986 8.78742 0.843634 5.73588 3.07082C4.23917 4.16726 3.0222 5.59528 2.18225 7.24073C1.34231 8.88618 0.902669 10.7034 0.898489 12.5472C0.890876 15.0919 1.72358 17.5692 3.26968 19.6016L12.7794 31.6792L22.2885 19.601C24.6104 16.5377 25.2621 12.6063 24.0799 8.82156ZM12.7757 17.0728C11.8736 17.0718 10.992 16.8061 10.2423 16.3091C9.49266 15.8121 8.90853 15.1062 8.56375 14.2806C8.21897 13.4549 8.12901 12.5466 8.30524 11.6703C8.48147 10.7941 8.91598 9.98924 9.55388 9.35746C10.1918 8.72569 11.0044 8.29534 11.8892 8.1208C12.7739 7.94626 13.691 8.03536 14.5247 8.37683C15.3583 8.71831 16.071 9.29683 16.5728 10.0393C17.0746 10.7818 17.343 11.655 17.3439 12.5484C17.3422 13.7478 16.8603 14.8976 16.004 15.7457C15.1477 16.5938 13.9868 17.071 12.7757 17.0728Z" fill="white"/>
                    </svg>
                    <p class="end">${address}</p>
                </div>
                <a class="navigation" onclick="makePoint('${address}')">Место подачи</a>
                <a onclick="taxiList(); cancelOrder()" class="cancel">Отменить заказ</a>
            </div>
        `);
}
function acceptOrder(i)
{
    console.log('принял заказ ID игорка: ', i)
}
function makePoint(address)
{
    console.log(address)
}
function cancelOrder(){
    console.log('cancelOrder')
}


/*
* App Setting
* */
$('.js-setting').on('click', function ()
{
    blackStaff();
    appSetting();
});
function appSetting()
{
    buttonBack.black;
    buttonBack.hide();

    $apps
        .html(`
            <div class="app setting">
                <p class="title">Настройки</p>
                <div class="player-info">
                    <div class="photo"><img src="img/player-img.jpg" alt=""></div>
                    <div>
                        <span class="player-name js-player-name"></span>
                        <span class="player-number js-player-number"></span>
                    </div>
                </div>
                <div class="item-container">
                    <a class="item">
                        <img class="icon" src="img/setting-icon1.svg" alt="">
                        Не беспокоить
                        <span class="not-disturb js-sleep " onclick="disturbToggle()"><span class="radio"></span></span>
                    </a>
                    <a class="item">
                        <img class="icon" src="img/setting-icon2.svg" alt="">
                        Яркость и экран
                        <img class="arrow" src="img/arrow-setting.svg" alt="">
                    </a>
                    <a class="item">
                        <img class="icon" src="img/setting-icon3.svg" alt="">
                        Звуки
                        <img class="arrow" src="img/arrow-setting.svg" alt="">
                    </a>
                    <a class="item" onclick="wallpapers()"> 
                        <img class="icon" src="img/setting-icon4.svg" alt="">
                        Обои
                        <img class="arrow" src="img/arrow-setting.svg" alt="">
                    </a>
                    <a class="item">
                        <img class="icon" src="img/setting-icon5.svg" alt="">
                        Тема
                        <img class="arrow" src="img/arrow-setting.svg" alt="">
                    </a>
                </div>
            </div>
        `);
    playerInfo(playerName, playerNumber)
}
function disturbToggle()
{
    let $button = $('.js-sleep');

    if ($button.hasClass('active')) {
        $button.removeClass('active');
        console.log('deactivated');
    } else {
        $button.addClass('active');
        console.log('activated');
    }
}
function wallpapers()
{
    blackStaff();
    buttonBack.blue;
    buttonBack.link = 'appSetting()';
    buttonBack.text = 'Назад';

    $apps
        .html(`
            <div class="app setting__wallpapers">
                <div class="title">Выбор обоев</div>
                <div class="wallpapers-container scroll js-images"></div>
            </div>
        `);

    appendImages();
    changeWallpaper();
    settingWallpaperImage.settingSelect = playerWallpaperSelect;
}
function appendImages()
{
    for(let i = 0; i < images.length; i++){
        $('.js-images')
            .append(`
                <a class="item js-item-wallpaper" data-image="${i}">
                    <img  src="${images[i]}" alt="">
                </a>
            `)
    }
}
function changeWallpaper()
{
    $('.js-item-wallpaper').on('click', function () {
        let dataImage = $(this).attr('data-image');
        $('.js-item-wallpaper').removeClass('selected');
        $(this).addClass('selected');
        playerWallpaperSelect = dataImage;
        console.log('change wallpaper to: ' + dataImage + ' + \".jpg\"');
        settingWallpaperImage.settingSelect = playerWallpaperSelect;
        wallpaperImage.select = playerWallpaperSelect;
    })
}


/*
* App Phone
* */
$('.js-tel').on('click', function ()
{
    blackStaff();
    appTel();
});
function appTel()
{
    blackStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app tel js-tel">
                <div class="tel-header">
                    <svg class="add-contact js-add-contact" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33333 0.933334C9.33333 0.417868 8.91547 0 8.4 0C7.88453 0 7.46667 0.417868 7.46667 0.933335V7.46667H0.933334C0.417868 7.46667 0 7.88453 0 8.4C0 8.91547 0.417868 9.33333 0.933335 9.33333H7.46667V15.8667C7.46667 16.3821 7.88453 16.8 8.4 16.8C8.91547 16.8 9.33333 16.3821 9.33333 15.8667V9.33333H15.8667C16.3821 9.33333 16.8 8.91547 16.8 8.4C16.8 7.88453 16.3821 7.46667 15.8667 7.46667H9.33333V0.933334Z" fill="#0A84FF"/>
                    </svg>
                    <span class="tel-number js-tel-number"></span>
                    <svg class="delete js-delete" width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.0717 1.61C5.98017 1.69929 5.88188 1.79715 5.75063 1.92918C5.75063 1.92918 3.58828 4.09299 3.58105 4.09923C3.51397 4.16287 3.45814 4.21729 3.40027 4.27482C3.37368 4.3014 3.35002 4.32479 3.29958 4.37441C3.25621 4.41707 3.23612 4.43688 3.21113 4.46175L1.25601 6.41907C1.21405 6.4626 1.17805 6.49925 1.13175 6.54576L1.07904 6.59874C1.01935 6.65855 0.972122 6.70722 0.905373 6.77683C0.752266 6.92791 0.597012 7.09876 0.450822 7.27794C0.314988 7.42278 0.205326 7.5902 0.126812 7.77276L0.106067 7.82799C-0.0353557 8.2658 -0.0353557 8.73703 0.106067 9.17484L0.127725 9.23219C0.206834 9.41429 0.317079 9.58112 0.453428 9.7252C0.599001 9.90408 0.754142 10.075 0.918171 10.2371C0.952677 10.2743 1.00352 10.3262 1.07144 10.3942C1.11834 10.4411 1.13853 10.4613 1.16367 10.4867C1.19616 10.5194 1.22423 10.5481 1.25029 10.5751L3.21057 12.5389C3.30769 12.6361 3.35117 12.6792 3.42895 12.7551C3.49289 12.8183 3.53074 12.8551 3.6008 12.9198L5.75256 15.0746C5.91384 15.2359 5.98619 15.308 6.07739 15.3975C6.19593 15.5161 6.27408 15.5928 6.39614 15.7121C6.44212 15.7605 6.45935 15.7784 6.48293 15.8004C6.7584 16.0772 7.09441 16.3218 7.46233 16.5096C7.83062 16.695 8.2211 16.8239 8.62409 16.8935C9.00167 16.9557 9.37844 16.9889 9.75612 16.9937C9.9163 16.9972 10.077 16.9994 10.2357 17L10.6139 17H17.648C17.794 17 17.9387 16.9979 18.1394 16.9936C18.5148 16.989 18.8954 16.9556 19.2718 16.8938C19.6829 16.8228 20.0761 16.6927 20.4437 16.5069C20.8163 16.3185 21.1563 16.0721 21.4511 15.7768C21.7446 15.4821 21.9901 15.1441 22.1791 14.7744C22.3664 14.4018 22.4959 14.0079 22.5657 13.6014C22.628 13.2203 22.6612 12.8401 22.6657 12.4589C22.6686 12.3653 22.6699 12.2829 22.6721 12.0993L22.6735 11.9818L22.6736 11.4026V4.99033L22.6725 4.88889C22.6713 4.77576 22.6707 4.72636 22.6696 4.66296C22.6686 4.60351 22.6673 4.54897 22.6658 4.49643C22.6615 4.12998 22.6287 3.75307 22.5677 3.38022C22.4976 2.97207 22.3692 2.58148 22.1857 2.21598C21.9957 1.84463 21.7519 1.50916 21.4608 1.21725C21.1696 0.924 20.8322 0.678635 20.4624 0.491397C20.0975 0.306816 19.7074 0.177574 19.3047 0.107798C18.9253 0.0461007 18.5485 0.0131868 18.1707 0.00824053C17.9997 0.0040988 17.8419 0.0018892 17.6902 0.0018892C17.5371 0.000318222 17.4103 0 17.126 0H10.8006C10.5183 0 10.3907 0.000320159 10.2307 0.00192069C10.0856 0.0018892 9.92828 0.0040847 9.74786 0.00836356C9.37734 0.0132288 9.00112 0.0461487 8.62887 0.106731C8.21945 0.17769 7.82901 0.306792 7.46381 0.490926C7.09314 0.679767 6.75695 0.924712 6.46547 1.2178C6.45196 1.23109 6.44207 1.24149 6.35955 1.32959C6.25717 1.42666 6.16302 1.51836 6.0717 1.61ZM6.64241 14.1852L4.46762 12.0072C4.46762 12.0072 4.42424 11.9678 4.41973 11.964C4.38617 11.9319 4.35731 11.9037 4.28521 11.8324C4.23316 11.7819 4.19267 11.7417 4.10048 11.6496L2.14807 9.69368C2.12517 9.66982 2.09328 9.63728 2.0571 9.60078C2.03022 9.57367 2.00851 9.55191 1.96096 9.50436C1.90117 9.44457 1.85825 9.40074 1.81823 9.35825C1.66534 9.20657 1.53592 9.06338 1.41485 8.91325L1.37336 8.86672C1.34132 8.83419 1.3145 8.79699 1.29378 8.75643C1.2465 8.58981 1.24662 8.41328 1.29414 8.24671C1.31489 8.20543 1.34186 8.16751 1.37416 8.13431L1.4123 8.09134C1.53404 7.9409 1.66402 7.79732 1.80163 7.66125C1.87536 7.58468 1.91798 7.54076 1.95021 7.5081L2.02326 7.43514C2.07448 7.38368 2.11545 7.34197 2.15478 7.30101L4.09979 5.35398C4.12114 5.33274 4.13922 5.3149 4.19033 5.26462C4.23452 5.22115 4.26011 5.19587 4.28846 5.16751C4.33233 5.12391 4.37548 5.08173 4.41786 5.04111C4.42715 5.03334 4.43796 5.02331 4.46869 4.99483L4.4688 4.99472L4.46888 4.99465L6.64175 2.81894C6.77002 2.68992 6.86435 2.59601 6.95668 2.50584C7.04547 2.41682 7.13117 2.33336 7.22179 2.2474C7.24188 2.22865 7.25389 2.2161 7.30936 2.15725L7.35321 2.11093C7.55489 1.90817 7.78263 1.74224 8.03213 1.61513C8.28408 1.48811 8.55594 1.39821 8.83655 1.34955C9.14097 1.30004 9.45514 1.27255 9.77006 1.26839C9.94782 1.26421 10.0955 1.26215 10.2359 1.26215C10.3967 1.26057 10.5214 1.26026 10.7995 1.26026H17.1249C17.4051 1.26026 17.529 1.26057 17.6828 1.26211C17.8298 1.26215 17.9779 1.26422 18.1463 1.26826C18.4688 1.27252 18.7836 1.30002 19.0951 1.35065C19.3683 1.39804 19.6393 1.48781 19.8927 1.61596C20.1421 1.74223 20.3698 1.90785 20.567 2.10639C20.7666 2.30658 20.933 2.53562 21.0612 2.78615C21.1868 3.03638 21.2763 3.30849 21.3246 3.58928C21.3745 3.89477 21.4018 4.20874 21.4056 4.52343C21.4072 4.58161 21.4083 4.63095 21.4093 4.6854C21.4103 4.74518 21.4109 4.79282 21.4121 4.90323L21.4131 4.99868L21.4131 5.55568V11.9687L21.4116 12.0852C21.4095 12.2613 21.4083 12.3388 21.4055 12.4336C21.4015 12.7628 21.3738 13.0801 21.3225 13.3941C21.2746 13.6731 21.184 13.9483 21.0547 14.2058C20.9272 14.455 20.759 14.6866 20.5582 14.8882C20.3584 15.0883 20.1274 15.2558 19.8744 15.3837C19.6184 15.5131 19.3444 15.6037 19.0615 15.6526C18.7526 15.7033 18.4351 15.7312 18.1169 15.7351C17.9186 15.7394 17.782 15.7413 17.6469 15.7413H10.2372C10.0887 15.7407 9.93556 15.7387 9.77684 15.7352C9.45649 15.7311 9.1428 15.7035 8.83252 15.6524C8.55686 15.6048 8.28503 15.515 8.03075 15.387C7.78383 15.261 7.55559 15.0948 7.35744 14.8961C7.34558 14.8845 7.32914 14.8675 7.30833 14.8455L7.30574 14.8428L7.30573 14.8428L7.30563 14.8427L7.3056 14.8427L7.30546 14.8425C7.25612 14.7905 7.24496 14.7787 7.23326 14.7675L7.2191 14.7542C7.1471 14.6866 7.07675 14.6176 6.96294 14.5038C6.87132 14.4138 6.80072 14.3435 6.64241 14.1852ZM11.1593 11.8327C11.1082 11.8832 11.0471 11.9245 10.9781 11.953C10.767 12.0405 10.5241 11.9921 10.3625 11.8306C10.2562 11.7246 10.1965 11.5806 10.1965 11.4305C10.1965 11.2804 10.2562 11.1365 10.3625 11.0305V11.0317C10.392 11.0023 10.4241 10.9766 10.4583 10.9548L12.912 8.4981L10.3625 5.9515L10.3716 5.94244C10.3207 5.89125 10.2792 5.82987 10.2505 5.76058C10.1631 5.5495 10.2114 5.30653 10.373 5.14499C10.479 5.03829 10.6233 4.97829 10.7737 4.97829C10.9241 4.97829 11.0683 5.03829 11.1743 5.14499H11.1718C11.2007 5.17386 11.226 5.20533 11.2475 5.23875L13.7097 7.69941L16.1918 5.21422C16.2096 5.18954 16.2295 5.16596 16.2517 5.14377C16.4132 4.98221 16.6562 4.93387 16.8673 5.0213C17.0784 5.10873 17.216 5.31471 17.216 5.54318C17.216 5.69549 17.1548 5.8378 17.0515 5.94166L17.0567 5.94687L14.5088 8.49797L16.9743 10.9619C17.0046 10.9822 17.033 11.0055 17.0592 11.0317L17.0579 11.0329C17.2195 11.1945 17.2678 11.4375 17.1804 11.6485C17.093 11.8596 16.887 11.9973 16.6585 11.9973C16.5072 11.9973 16.3657 11.9368 16.262 11.8347L16.2572 11.8395L13.7112 9.29647L11.1687 11.8421L11.1593 11.8327Z" fill="#0A84FF"/>
                    </svg>
                </div>
                <div class="tel-buttons js-tel-buttons">
                    <a data-val="1" class="tel-button">1</a>            
                    <a data-val="2" class="tel-button">2</a>            
                    <a data-val="3" class="tel-button">3</a>            
                    <a data-val="4" class="tel-button">4</a>            
                    <a data-val="5" class="tel-button">5</a>            
                    <a data-val="6" class="tel-button">6</a>            
                    <a data-val="7" class="tel-button">7</a>            
                    <a data-val="8" class="tel-button">8</a>            
                    <a data-val="9" class="tel-button">9</a>            
                    <a data-val="*" class="tel-button star">*</a>            
                    <a data-val="0" class="tel-button">0</a>            
                    <a data-val="#" class="tel-button">#</a>            
                    <a class="tel-button submit js-button">
                        <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.41185 15.9284C3.77527 14.9629 3.12766 14.0049 2.55679 12.9955C1.59693 11.2985 0.769544 9.54473 0.296449 7.62984C0.0698895 6.70375 -0.0494355 5.76144 0.0194261 4.81156C0.0646329 4.1893 0.2176 3.57894 0.541407 3.03345C1.10529 2.09895 1.87831 1.31671 2.79597 0.752009C3.46934 0.338972 4.16847 0 4.97536 0C5.38747 0 5.70077 0.174622 5.93101 0.547113C7.02175 2.31225 8.12564 4.06874 9.22532 5.82794C9.24845 5.8647 9.27789 5.89768 9.30575 5.93228C9.44032 6.22422 9.63428 6.47777 9.80933 6.74322C10.1111 7.20058 10.1689 7.68228 10.0096 8.20669C9.83404 8.7857 9.56753 9.32092 9.28314 9.8464C8.973 10.4195 8.65971 10.992 8.31383 11.5418C8.02944 11.9938 8.01157 12.443 8.18556 12.9274C8.45733 13.6843 8.92149 14.3114 9.41088 14.9234C10.1994 15.9052 11.1324 16.7388 11.9998 17.6406C12.5633 18.2283 13.1415 18.8056 13.7124 19.3879C14.3815 20.1329 15.1117 20.8114 15.8592 21.4715C16.2889 21.8587 16.7538 22.2027 17.2474 22.4986C17.7946 22.8187 18.2945 22.7538 18.8323 22.4208C19.7448 21.8558 20.6658 21.3022 21.6588 20.8849C22.3511 20.5935 22.9866 20.6573 23.6063 21.0617C25.2049 22.1045 26.8838 23.0144 28.4393 24.1292C28.7589 24.3584 29.0774 24.5903 29.3786 24.8428C30.041 25.3975 30.175 26.1327 29.775 27.0102C29.4501 27.7211 29.0122 28.3617 28.5533 28.9851C28.2027 29.4624 27.8532 29.9328 27.3585 30.2766C26.6999 30.734 25.9734 30.9443 25.1959 30.9881C23.5695 31.08 22.042 30.6302 20.5743 29.9836C16.8527 28.3493 13.6319 25.97 10.8286 22.9712C10.2971 22.4024 9.7021 21.8932 9.1123 21.386C7.34556 19.8674 5.94625 18.0158 4.57165 16.142C4.52066 16.0679 4.46809 15.9987 4.41185 15.9284Z" fill="white"/>
                        </svg>
                    </a>            
                </div>
                <div class="tel-footer js-tel-footer"></div>
            </div>
        `);
    numberInput();
    appendTelFooter('tel')
}
function numberInput()
{
    let number = '';
    let telButtons = $('.js-tel-buttons');
    let delButtons = $('.js-delete');
    let addContactButtons = $('.js-add-contact');

    telButtons.on('click', 'a:not(.js-button)', function ()
    {
        let thisVal = $(this).attr('data-val');

        if(number.length >= 7) return;
        else number += thisVal;

        $('.js-tel-number').html(number)
    });

    telButtons.on('click', 'a.js-button', function ()
    {
        if(number !== ''){
            callTo(number);
        }
    });

    delButtons.on('click', function ()
    {
        number = number.slice(0, -1);
        $('.js-tel-number').html(number);
    });

    addContactButtons.on('click', function ()
    {
        console.log(number);
        addContact(number);
    })
}
function callTo(number, name = '')
{
    let info;
    if(name !== '') info = name;
    else info = number;

    whiteStaff();
    $apps.html(`
        <div class="app call js-call">
            <span class="caller js-caller">${info}</span>
            <span class="status">вызов...</span>
            <a class="hang-off" onclick="closeApp()">
                <svg viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.41185 15.9284C3.77527 14.9629 3.12766 14.0049 2.55679 12.9955C1.59693 11.2985 0.769544 9.54473 0.296449 7.62984C0.0698895 6.70375 -0.0494355 5.76144 0.0194261 4.81156C0.0646329 4.1893 0.2176 3.57894 0.541407 3.03345C1.10529 2.09895 1.87831 1.31671 2.79597 0.752009C3.46934 0.338972 4.16847 0 4.97536 0C5.38747 0 5.70077 0.174622 5.93101 0.547113C7.02175 2.31225 8.12564 4.06874 9.22532 5.82794C9.24845 5.8647 9.27789 5.89768 9.30575 5.93228C9.44032 6.22422 9.63428 6.47777 9.80933 6.74322C10.1111 7.20058 10.1689 7.68228 10.0096 8.20669C9.83404 8.7857 9.56753 9.32092 9.28314 9.8464C8.973 10.4195 8.65971 10.992 8.31383 11.5418C8.02944 11.9938 8.01157 12.443 8.18556 12.9274C8.45733 13.6843 8.92149 14.3114 9.41088 14.9234C10.1994 15.9052 11.1324 16.7388 11.9998 17.6406C12.5633 18.2283 13.1415 18.8056 13.7124 19.3879C14.3815 20.1329 15.1117 20.8114 15.8592 21.4715C16.2889 21.8587 16.7538 22.2027 17.2474 22.4986C17.7946 22.8187 18.2945 22.7538 18.8323 22.4208C19.7448 21.8558 20.6658 21.3022 21.6588 20.8849C22.3511 20.5935 22.9866 20.6573 23.6063 21.0617C25.2049 22.1045 26.8838 23.0144 28.4393 24.1292C28.7589 24.3584 29.0774 24.5903 29.3786 24.8428C30.041 25.3975 30.175 26.1327 29.775 27.0102C29.4501 27.7211 29.0122 28.3617 28.5533 28.9851C28.2027 29.4624 27.8532 29.9328 27.3585 30.2766C26.6999 30.734 25.9734 30.9443 25.1959 30.9881C23.5695 31.08 22.042 30.6302 20.5743 29.9836C16.8527 28.3493 13.6319 25.97 10.8286 22.9712C10.2971 22.4024 9.7021 21.8932 9.1123 21.386C7.34556 19.8674 5.94625 18.0158 4.57165 16.142C4.52066 16.0679 4.46809 15.9987 4.41185 15.9284Z" fill="white"/>
                </svg>
            </a>
        </div>
    `);

    console.log('call to: ' + number);
}
function sendSmsTo(number, name = '') {
    console.log('Send SMS to: ', number);
    console.log('Send SMS to: ', name);
}
function addContact(number)
{
    blackStaff();

    buttonBack.blue;
    buttonBack.link = 'appTel()';
    buttonBack.text = 'Отменить';

    $apps
        .html(`
            <div class="app add-contact js-add-contact">
                <a class="save-contact js-save-contact">Готово</a>
                <p class="title">Новый контакт</p>
                <input class="js-input-name" type="text" placeholder="Имя">
                <input class="js-input-last-name" type="text" placeholder="Фамилия">
                <input class="js-input-number" type="text" value="${number}" placeholder="Телефон">
            </div>
        `);

    $('.js-input-name').focus();

    onlyNumber('.js-input-number');

    $('.js-save-contact').on('click',function () {
        let firstName = $('.js-input-name').val();
        let lastName = $('.js-input-last-name').val();
        let number = $('.js-input-number').val();

        if(firstName !== '' && lastName !== '' && number !== ''){
            console.log('Save firstName: ' + firstName + ', lastName: ' + lastName + ', number: ' + number);
        }
    })
}
function editContact(el)
{
    let thisIndex = el.getAttribute('data-index');
    console.log(thisIndex);

    blackStaff();

    buttonBack.blue;
    buttonBack.link = 'appTel()';
    buttonBack.text = 'Отменить';

    let firstName =contacts[thisIndex].firstName;
    let lastName =contacts[thisIndex].lastName;
    let number =contacts[thisIndex].number;

    $apps
        .html(`
            <div class="app add-contact js-add-contact">
                <a class="save-contact js-save-contact">Готово</a>
                <p class="title">Редактирование</p>
                <input class="js-input-name" value="${firstName}" type="text" placeholder="Имя">
                <input class="js-input-last-name" value="${lastName}" type="text" placeholder="Фамилия">
                <input class="js-input-number" type="text" value="${number}" placeholder="Телефон">
            </div>
        `);

    $('.js-input-name').focus();

    onlyNumber('.js-input-number');

    $('.js-save-contact').on('click',function () {
        let firstName = $('.js-input-name').val();
        let lastName = $('.js-input-last-name').val();
        let number = $('.js-input-number').val();

        if(firstName !== '' && lastName !== '' && number !== ''){
            console.log('Save firstName: ' + firstName + ', lastName: ' + lastName + ', number: ' + number);
        }
    })
}
function delContact(el)
{
    let thisIndex = el.getAttribute('data-index');
    console.log('del index:' + thisIndex);
}
function appendTelFooter(activeSelector)
{
    let $telFooter = $('.js-tel-footer');
    $telFooter.html(`
        <a class="favorite" onclick="telFavourites()">
            <svg viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A3A3A3" fill-rule="evenodd" clip-rule="evenodd" d="M27.3083 9.64186C27.1734 9.22718 26.8068 8.95887 26.3747 8.95887L17.5432 8.93651L14.7585 0.673587C14.6195 0.260949 14.256 -0.0165142 13.8169 0.0007637C13.3848 0.00584545 13.0202 0.276194 12.8903 0.691881L10.2829 8.93651L1.34461 8.95887C0.912549 8.95887 0.545955 9.22718 0.411 9.64084C0.275038 10.0555 0.413014 10.4915 0.76148 10.7497L7.75598 15.9544L5.01256 24.7021C4.88164 25.1178 5.02263 25.5508 5.37311 25.8069C5.54936 25.935 5.75079 26 5.95221 26C6.15162 26 6.35003 25.937 6.52225 25.812L13.8964 20.5676L21.1971 25.8079C21.5446 26.064 21.9998 26.063 22.3492 25.8069C22.6997 25.5518 22.8407 25.1188 22.7108 24.7031L19.9634 15.9544L26.9569 10.7507C27.3053 10.4915 27.4433 10.0555 27.3083 9.64186Z" />
            </svg>
        </a>
        <a class="recent" onclick="appRecentCall()">
            <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#A3A3A3" fill-rule="evenodd" clip-rule="evenodd" d="M14.2819 15.1412H7.13977C6.74732 15.1412 6.42992 14.8238 6.42992 14.4314C6.42992 14.0389 6.74732 13.7215 7.13977 13.7215H12.8622V4.98728C12.8622 4.59585 13.1796 4.27743 13.5721 4.27743C13.9645 4.27743 14.2819 4.59585 14.2819 4.98728V15.1412ZM13.4057 0.5C6.50192 0.5 0.90625 6.09668 0.90625 13.0005C0.90625 19.9033 6.50192 25.501 13.4057 25.501C20.3096 25.501 25.9062 19.9033 25.9062 13.0005C25.9062 6.09668 20.3096 0.5 13.4057 0.5Z"/>
            </svg>
        </a>
        <a class="contacts" onclick="appContacts()">
            <svg viewBox="0 0 35 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  fill-rule="evenodd" clip-rule="evenodd" d="M17.7563 16.8709C17.6635 16.8729 15.449 16.9286 13.7823 18.4706C12.1825 19.9499 12.1885 22.2942 12.1915 22.5H0.954988C0.954988 22.5 0.818262 19.1526 2.88712 17.9894C4.70409 16.9673 6.45284 16.6431 7.50243 16.4485C7.84337 16.3853 8.11054 16.3357 8.28231 16.2804L8.29431 16.2765C8.94456 16.0659 9.6376 15.8414 9.6376 14.9462C9.6376 14.904 9.63762 14.8635 9.63765 14.8247C9.63812 14.0354 9.63819 13.9235 9.42702 13.8088C9.00387 13.5772 8.75237 13.2193 8.69748 12.9409C8.65564 12.7296 8.62189 12.3635 8.58757 11.9911C8.53758 11.4486 8.48636 10.8928 8.40706 10.7825C8.35656 10.7121 8.2912 10.6906 8.22501 10.6688C8.1146 10.6324 8.00189 10.5952 7.95198 10.3292C7.91836 10.1518 7.89872 9.98355 7.88151 9.83606C7.85733 9.6289 7.83793 9.46272 7.7913 9.3698C7.71146 9.20974 7.43002 8.17877 7.60467 7.82385C7.68882 7.65075 7.81096 7.6219 7.90755 7.59908C7.98737 7.58023 8.04973 7.5655 8.05876 7.47688C8.06802 7.3898 8.03018 7.12718 7.97845 6.76824C7.8406 5.81162 7.60417 4.1709 7.89808 3.34604C8.27422 2.28959 8.67995 2.04823 9.06801 1.81738C9.11343 1.79036 9.15861 1.76348 9.20347 1.73546C9.36093 1.63747 9.49747 1.48326 9.65777 1.30223C9.93332 0.991024 10.2791 0.60053 10.922 0.279974C11.939 -0.226066 13.436 0.0672186 13.945 0.279974C14.0236 0.312977 14.1385 0.354204 14.2777 0.404157C15.0403 0.677731 16.5323 1.21302 16.7813 2.09237C16.7819 2.09453 16.7924 2.10879 16.8107 2.13356C16.919 2.28029 17.2993 2.7957 17.4949 3.34604C17.7883 4.16959 17.5531 5.80641 17.4155 6.76368C17.3636 7.12495 17.3256 7.38943 17.3352 7.47688C17.3438 7.56555 17.406 7.58025 17.4858 7.59912C17.5823 7.62193 17.7046 7.65083 17.7893 7.82385C17.9629 8.17877 17.6815 9.20974 17.6017 9.3698C17.5548 9.46314 17.5354 9.6304 17.5113 9.83885C17.4943 9.98567 17.475 10.1529 17.442 10.3292C17.3915 10.5951 17.2786 10.6323 17.1684 10.6687C17.1022 10.6905 17.0371 10.712 16.9869 10.7825C16.9075 10.8929 16.8559 11.4495 16.8056 11.9924C16.7711 12.3644 16.7373 12.7299 16.6955 12.9409C16.6406 13.2193 16.3901 13.5772 15.9659 13.8088C15.7557 13.923 15.7557 14.0345 15.7563 14.8147C15.7563 14.8566 15.7563 14.9004 15.7563 14.9462C15.7563 15.8411 16.4489 16.0657 17.0979 16.2763L17.1106 16.2804C17.2844 16.3359 17.559 16.3876 17.9082 16.4535C18.1846 16.5056 18.5079 16.5666 18.8651 16.6452C18.5098 16.7576 18.1416 16.8481 17.7563 16.8709ZM33.6814 19.199C35.0077 20.4258 34.9528 22.4997 34.9528 22.4997H13.1894C13.1894 22.4997 13.1355 20.4258 14.4618 19.199C15.867 17.8986 17.7752 17.8648 17.7752 17.8648C19.9079 17.7435 21.7073 16.2483 21.7073 16.2483V14.5482C21.7073 14.5482 19.1305 13.8185 18.2572 12.9307C18.2572 12.9307 18.8281 11.508 18.9768 10.994C19.1235 10.488 19.1135 9.83081 19.0467 8.76405C19.0367 8.6048 19.024 8.42535 19.0104 8.23196C18.9327 7.12872 18.8231 5.57168 18.9938 4.7207C19.1944 3.72055 19.7742 2.10699 20.7113 1.60592C21.6484 1.10684 22.7482 1.35539 22.7482 1.35539C22.7482 1.35539 23.4039 0.880165 24.3211 0.686299C25.0357 0.534189 26.2542 0.69127 26.8899 1.12473C27.5267 1.55919 28.3889 2.34659 28.7293 3.5078C29.1155 4.82708 29.1225 6.40087 28.9758 7.46664C28.8939 8.06116 28.9538 8.76007 28.9987 9.23132C29.0297 9.57133 29.1973 10.5019 29.4718 11.3459C29.7921 12.3342 30.2253 13.041 30.2253 13.041C30.2253 13.041 29.874 13.7141 28.6175 14.1078C27.2832 14.5253 26.4359 14.5482 26.4359 14.5482V16.2483C26.4359 16.2483 28.2353 17.7435 30.367 17.8648C30.367 17.8648 32.2752 17.8986 33.6814 19.199Z" />
            </svg>

        </a>
        <a class="tel" onclick="appTel()">
            <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 6.5C5.54493 6.5 7 5.04493 7 3.25C7 1.45507 5.54493 0 3.75 0C1.95507 0 0.5 1.45507 0.5 3.25C0.5 5.04493 1.95507 6.5 3.75 6.5ZM12.5 6.5C14.2949 6.5 15.75 5.04493 15.75 3.25C15.75 1.45507 14.2949 0 12.5 0C10.7051 0 9.25 1.45507 9.25 3.25C9.25 5.04493 10.7051 6.5 12.5 6.5ZM21.25 6.5C23.0449 6.5 24.5 5.04493 24.5 3.25C24.5 1.45507 23.0449 0 21.25 0C19.4551 0 18 1.45507 18 3.25C18 5.04493 19.4551 6.5 21.25 6.5ZM3.75 15.25C5.54493 15.25 7 13.7949 7 12C7 10.2051 5.54493 8.75 3.75 8.75C1.95507 8.75 0.5 10.2051 0.5 12C0.5 13.7949 1.95507 15.25 3.75 15.25ZM12.5 15.25C14.2949 15.25 15.75 13.7949 15.75 12C15.75 10.2051 14.2949 8.75 12.5 8.75C10.7051 8.75 9.25 10.2051 9.25 12C9.25 13.7949 10.7051 15.25 12.5 15.25ZM21.25 15.25C23.0449 15.25 24.5 13.7949 24.5 12C24.5 10.2051 23.0449 8.75 21.25 8.75C19.4551 8.75 18 10.2051 18 12C18 13.7949 19.4551 15.25 21.25 15.25ZM3.75 24C5.54493 24 7 22.5449 7 20.75C7 18.9551 5.54493 17.5 3.75 17.5C1.95507 17.5 0.5 18.9551 0.5 20.75C0.5 22.5449 1.95507 24 3.75 24ZM12.5 24C14.2949 24 15.75 22.5449 15.75 20.75C15.75 18.9551 14.2949 17.5 12.5 17.5C10.7051 17.5 9.25 18.9551 9.25 20.75C9.25 22.5449 10.7051 24 12.5 24ZM21.25 24C23.0449 24 24.5 22.5449 24.5 20.75C24.5 18.9551 23.0449 17.5 21.25 17.5C19.4551 17.5 18 18.9551 18 20.75C18 22.5449 19.4551 24 21.25 24Z"/>
            </svg>
        </a>
    `)
    $telFooter.find('.' + activeSelector).addClass('active')
}
function telFavourites()
{
    blackStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app favourites">
                <p class="title">Избранные</p>
                <ul class="favourites-container scroll js-favourites-container"></ul>
                <div class="tel-footer js-tel-footer"></div>
            </div>
        `);
    appendFavouritesContacts()
    appendTelFooter('favorite');

}
function appendFavouritesContacts()
{
    for(let i = 0; i < contacts.length; i++){
        if(contacts[i].favourites === true) {
            let firstName = contacts[i].firstName;
            let lastName = contacts[i].lastName;
            let number = contacts[i].number;

            $('.js-favourites-container').append(`
            <li>
                <a class="name" data-index="${i}" onclick="viewContact(this)">
                    <span class="first-name">${firstName}</span>
                    <span class="last-name">${lastName}</span>
                </a>
                <a class="call" onclick="callTo(${number}, '${firstName + ' ' + lastName}')">
                    <svg  viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.4082 13.373C8.23047 16.1953 11.6582 18.373 14.4609 18.373C15.7207 18.373 16.8242 17.9336 17.7129 16.957C18.2305 16.3809 18.5527 15.707 18.5527 15.043C18.5527 14.5547 18.3672 14.0859 17.9082 13.7539L14.9102 11.625C14.4512 11.3125 14.0703 11.1562 13.7188 11.1562C13.2793 11.1562 12.8789 11.4102 12.4297 11.8496L11.7363 12.5332C11.6289 12.6406 11.4922 12.6895 11.3652 12.6895C11.2188 12.6895 11.0723 12.6309 10.9746 12.582C10.3691 12.2598 9.33398 11.3711 8.36719 10.4141C7.41016 9.45703 6.52148 8.42188 6.20898 7.81641C6.16016 7.70898 6.10156 7.57227 6.10156 7.42578C6.10156 7.29883 6.14062 7.17188 6.24805 7.06445L6.94141 6.35156C7.37109 5.90234 7.63477 5.51172 7.63477 5.0625C7.63477 4.71094 7.46875 4.33008 7.14648 3.87109L5.04688 0.912109C4.70508 0.443359 4.22656 0.238281 3.69922 0.238281C3.05469 0.238281 2.39062 0.53125 1.81445 1.08789C0.867188 1.99609 0.447266 3.11914 0.447266 4.35938C0.447266 7.16211 2.58594 10.5605 5.4082 13.373Z" fill="#007AFF"/>
                    </svg>
                </a>
                <a class="send-sms" onclick="sendSmsTo(${number}, '${firstName + ' ' + lastName}')">
                    <svg  width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6088 9.46025C23.6088 14.3689 18.4121 18.3482 12.0017 18.3482C11.226 18.3482 10.4682 18.29 9.73515 18.1789C9.09038 18.1213 8.70718 18.1766 8.04598 18.3653C7.80135 18.4352 7.51555 18.5763 7.188 18.7379C6.45422 19.1001 5.51093 19.5657 4.35151 19.5657C4.32968 19.5657 4.40312 19.4986 4.52882 19.3837C4.94507 19.0032 5.93431 18.099 5.93431 17.3741V17.0387C2.61091 15.4753 0.394517 12.666 0.394517 9.46025C0.394517 4.55155 5.59121 0.572266 12.0017 0.572266C18.4121 0.572266 23.6088 4.55155 23.6088 9.46025Z" fill="#007AFF"/>
                    </svg>
                </a>
            </li>
        `)
        }

    }
}
function appContacts()
{
    blackStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app contacts">
                <p class="title">Контакты</p>
                <div class="player-info">
                    <div class="photo"><img src="img/player-img.jpg" alt=""></div>
                    <div>
                        <span class="player-name js-player-name"></span>
                        <span class="player-number js-player-number"></span>
                    </div>
                </div>
                <ul class="container-contacts scroll js-container-contacts"></ul>
                <div class="tel-footer js-tel-footer"></div>
            </div>
            
        `);
    playerInfo(playerName, playerNumber);
    appendContacts();
    appendTelFooter('contacts');
}
function appendContacts()
{
    for(let i = 0; i < contacts.length; i++){
        let firstName = contacts[i].firstName;
        let lastName = contacts[i].lastName;
        let number = contacts[i].number;

        $('.js-container-contacts').append(`
            <li>
                <a class="name" data-index="${i}" onclick="viewContact(this)">
                    <span class="first-name">${firstName}</span>
                    <span class="last-name">${lastName}</span>
                </a>
                <a class="call" onclick="callTo(${number}, '${firstName + ' ' + lastName}')">
                    <svg  viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.4082 13.373C8.23047 16.1953 11.6582 18.373 14.4609 18.373C15.7207 18.373 16.8242 17.9336 17.7129 16.957C18.2305 16.3809 18.5527 15.707 18.5527 15.043C18.5527 14.5547 18.3672 14.0859 17.9082 13.7539L14.9102 11.625C14.4512 11.3125 14.0703 11.1562 13.7188 11.1562C13.2793 11.1562 12.8789 11.4102 12.4297 11.8496L11.7363 12.5332C11.6289 12.6406 11.4922 12.6895 11.3652 12.6895C11.2188 12.6895 11.0723 12.6309 10.9746 12.582C10.3691 12.2598 9.33398 11.3711 8.36719 10.4141C7.41016 9.45703 6.52148 8.42188 6.20898 7.81641C6.16016 7.70898 6.10156 7.57227 6.10156 7.42578C6.10156 7.29883 6.14062 7.17188 6.24805 7.06445L6.94141 6.35156C7.37109 5.90234 7.63477 5.51172 7.63477 5.0625C7.63477 4.71094 7.46875 4.33008 7.14648 3.87109L5.04688 0.912109C4.70508 0.443359 4.22656 0.238281 3.69922 0.238281C3.05469 0.238281 2.39062 0.53125 1.81445 1.08789C0.867188 1.99609 0.447266 3.11914 0.447266 4.35938C0.447266 7.16211 2.58594 10.5605 5.4082 13.373Z" fill="#007AFF"/>
                    </svg>
                </a>
                <a class="send-sms" onclick="sendSmsTo(${number}, '${firstName + ' ' + lastName}')">
                    <svg  width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.6088 9.46025C23.6088 14.3689 18.4121 18.3482 12.0017 18.3482C11.226 18.3482 10.4682 18.29 9.73515 18.1789C9.09038 18.1213 8.70718 18.1766 8.04598 18.3653C7.80135 18.4352 7.51555 18.5763 7.188 18.7379C6.45422 19.1001 5.51093 19.5657 4.35151 19.5657C4.32968 19.5657 4.40312 19.4986 4.52882 19.3837C4.94507 19.0032 5.93431 18.099 5.93431 17.3741V17.0387C2.61091 15.4753 0.394517 12.666 0.394517 9.46025C0.394517 4.55155 5.59121 0.572266 12.0017 0.572266C18.4121 0.572266 23.6088 4.55155 23.6088 9.46025Z" fill="#007AFF"/>
                    </svg>
                </a>
            </li>
        `)
    }
}
function viewContact(el)
{
    let thisIndex = el.getAttribute('data-index');
    console.log(thisIndex);

    blackStaff();

    buttonBack.blue;
    buttonBack.link = 'appTel()';

    let firstName = contacts[thisIndex].firstName;
    let lastName = contacts[thisIndex].lastName;
    let number = contacts[thisIndex].number;

    $apps
        .html(`
            <div class="app view-contact js-view-contact">
                <a data-index="${thisIndex}" class="edit-contact js-save-contact" onclick="editContact(this)">Править</a>
                <div class="player-photo">
                    <img src="img/player-img.jpg" alt="">
                </div>
                <p class="title">${firstName + " " + lastName}</p>
                <div class="buttons">
                    <a class="call" onclick="callTo(${number},'${firstName + " " + lastName}')">
                        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.44357 7.2698C0.398423 5.37496 0 3.8474 0 2.81564C0 1.78388 0.253495 1.48796 0.510724 1.24889C0.767952 1.00983 1.92787 0.294698 2.1255 0.16133C2.32314 0.027961 3.07743 -0.231227 3.55046 0.449233C4.02349 1.12969 4.91426 2.49591 5.52839 3.40351C6.49208 4.68906 5.72433 5.25339 5.47634 5.59164C5.02001 6.21405 4.75726 6.36757 4.75726 7.13184C4.75726 7.8961 6.89317 10.0674 7.4039 10.6024C7.91074 11.1333 10.039 12.999 10.6985 13.0988C11.3626 13.1993 12.2516 12.4962 12.4407 12.3179C13.4023 11.5796 13.9451 12.1393 14.388 12.3826C14.8309 12.6259 16.8322 13.8729 17.4523 14.2933C18.036 14.7136 17.9995 15.3633 17.9995 15.3633C17.9995 15.3633 16.7957 17.2739 16.6498 17.5032C16.4674 17.7707 16.0296 18 15.0446 18C14.0597 18 13.0073 17.8201 10.5062 16.4446C8.45977 15.3191 6.50892 13.5567 5.48748 12.525C4.42955 11.4932 2.63743 9.43423 1.44357 7.2698Z" fill="#007AFF"/>
                        </svg>
                        позвонить
                    </a>
                    <a class="send-sms">
                        <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8791 16.8462C16.8875 16.8462 21.7582 13.075 21.7582 8.42308C21.7582 3.77114 16.8875 0 10.8791 0C4.87075 0 0 3.77114 0 8.42308C0 11.4617 2.07818 14.1245 5.19413 15.606V15.9232C5.19413 16.6101 4.26694 17.4671 3.8768 17.8276C3.75898 17.9365 3.69014 18.0002 3.71061 18.0002C4.7973 18.0002 5.68143 17.5589 6.36919 17.2157C6.67619 17.0625 6.94406 16.9288 7.17336 16.8626C7.79277 16.6838 8.15189 16.6314 8.75567 16.6858C9.44244 16.791 10.1525 16.8462 10.8791 16.8462Z" fill="#007AFF"/>
                        </svg>
                        написать
                    </a>
                </div>
                <p class="number"><span>телефон</span>${number}</p>
                <a data-index="${thisIndex}" class="del-contact js-del" onclick="delContact(this)">Удалить контакт</a>
            </div>
        `);
}
function appRecentCall()
{
    blackStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app favourites">
                <p class="title">История</p>
                <ul class="favourites-container scroll js-favourites-container"></ul>
                <div class="tel-footer js-tel-footer"></div>
            </div>
        `);
    appendRecentCalls();
    appendTelFooter('recent');

}
function appendRecentCalls()
{
    for(let i = 0; i < contacts.length; i++){
        if(contacts[i].recentCall !== '') {
            let firstName = contacts[i].firstName;
            let lastName = contacts[i].lastName;
            let number = contacts[i].number;
            let recentCallTime = contacts[i].recentCall;

            $('.js-favourites-container').append(`
            <li data-index="${i}" onclick="viewContact(this)">
                <span class="first-name">${firstName}</span>
                <span class="last-name">${lastName}</span>
                <span class="time">${recentCallTime}</span>
                <svg class="info"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.74503 5.13654C8.74503 5.71405 9.21297 6.182 9.79048 6.182C10.368 6.182 10.8359 5.71405 10.8359 5.13654C10.8359 4.55903 10.368 4.09109 9.79048 4.09109C9.21297 4.09109 8.74503 4.55903 8.74503 5.13654ZM8.32599 14.1272V14.5453H11.6714V14.1272H10.8351V7.85444V7.43626H9.16236H8.32599V7.85444H9.16236V14.1272H8.32599ZM10 18.6364C14.7697 18.6364 18.6364 14.7697 18.6364 10C18.6364 5.23027 14.7697 1.36364 10 1.36364C5.23027 1.36364 1.36364 5.23027 1.36364 10C1.36364 14.7697 5.23027 18.6364 10 18.6364ZM10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20Z" fill="#007AFF"/>
                </svg>
            </li>
        `)
        }

    }
}


/*
* App Transport
* */
$('.js-transport').on('click', function ()
{
    blackStaff();
    appTransport();
});
function appTransport()
{
    blackStaff();
    buttonBack.link = 'closeApp()';

    $apps
        .html(`
            <div class="app transport js-transport">
                <span class="hello">Добро пожаловать!</span>
                <p class="title">Сигнализация авто</p>
                <div class="container-transport js-container-transport scroll"></div>
            </div>
        `);
    appendTransport();
}
function appendTransport()
{
    for(let i = 0; i < transport.length; i++){
        let name = transport[i].transportName;
        let plate = transport[i].transportPlate;
        let image = transport[i].imageId;
        $('.js-container-transport')
            .append(`
            <a data-index="${i}" class="item" style="background-image: url('img/transport/${image}.jpg')" onclick="transportEvents(this)">
                <span class="name">${name}</span>
                <span class="plate">${plate}</span>
                <span class="arrow">→</span>
            </a>
        `)
    }
}
function transportEvents(el)
{
    whiteStaff();
    buttonBack.link = 'appTransport()';

    let thisIndex = el.getAttribute('data-index');

    let name = transport[thisIndex].transportName;
    let plate = transport[thisIndex].transportPlate;
    let image = transport[thisIndex].imageId;

    $apps.html(`
        <div class="app transport-events js-transport-events">
            <div class="header" style="background: url('img/transport/${image}.jpg')">
                <p class="text">Управление</p>
                <p class="name">${name}</p>
                <p class="plate">${plate}</p>
            </div>
            <div class="buttons">
                <a onclick="transportEvent(1)">Открыть</a>
                <a onclick="transportEvent(2)">Завести двигатель</a>
                <a onclick="transportEvent(3)">Эвакуировать</a>
                <a onclick="transportEvent(4)">Найти авто</a>
            </div>
        </div>
    `)
}
function transportEvent(type)
{
    if (type === 1) {
        console.log('Открыть')
    }
    if (type === 2) {
        console.log('Завести двигатель')
    }
    if (type === 3) {
        console.log('Эвакуировать')
    }
    if (type === 4) {
        console.log('Найти авто')
    }
}


/*
* App WeazelNews
* */
$('.js-news').on('click', function ()
{
    whiteStaff();
    appWeazelNews();
});
function appWeazelNews()
{
    buttonBack.hide();

    $apps
        .html(`
            <div class="app weazel-news">
                <img class="logo" src="img/weazel-logo.svg" >
                <a class="add-news js-add-news" onclick="addNews()">Подать объявление</a>
                <a class="view-recent-news js-show-recent-news" onclick="viewNews()">Смотреть последние объявления</a>
                <img class="man" src="img/weazel-img.svg" >
            </div>
        `);
}
function viewNews()
{
    blackStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app weazel-news-view">
                <div class="header">
                    <img src="img/weazel-logo-black.svg" alt="">
                    <a onclick="addNews()">Подать объявление</a>
                </div>
                <div class="container scroll js-news-container">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
            </div>
        `);
    appendNews();
}
function appendNews()
{
    for(let i = 0; i < news.length; ){
        for(let j = 1; j < 3; j++){
            console.log('i' + i + 'j' + j);
            $(`.js-news-container > div:nth-child(${j})`)
                .append(`
                    <div class="item">
                        <p class="text">
                            ${news[i].text} 
                            <span class="number">${news[i].number}</span>
                        </p>
                        <div class="buttons">
                            <a onclick="callTo(${news[i].number})" class="button-call">
                                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.44357 7.2698C0.398423 5.37496 0 3.8474 0 2.81564C0 1.78388 0.253495 1.48796 0.510724 1.24889C0.767952 1.00983 1.92787 0.294698 2.1255 0.16133C2.32314 0.027961 3.07743 -0.231227 3.55046 0.449233C4.02349 1.12969 4.91426 2.49591 5.52839 3.40351C6.49208 4.68906 5.72433 5.25339 5.47634 5.59164C5.02001 6.21405 4.75726 6.36757 4.75726 7.13184C4.75726 7.8961 6.89317 10.0674 7.4039 10.6024C7.91074 11.1333 10.039 12.999 10.6985 13.0988C11.3626 13.1993 12.2516 12.4962 12.4407 12.3179C13.4023 11.5796 13.9451 12.1393 14.388 12.3826C14.8309 12.6259 16.8322 13.8729 17.4523 14.2933C18.036 14.7136 17.9995 15.3633 17.9995 15.3633C17.9995 15.3633 16.7957 17.2739 16.6498 17.5032C16.4674 17.7707 16.0296 18 15.0446 18C14.0597 18 13.0073 17.8201 10.5062 16.4446C8.45977 15.3191 6.50892 13.5567 5.48748 12.525C4.42955 11.4932 2.63743 9.43423 1.44357 7.2698Z" fill="white"/>
                                </svg>
                            </a>
                            <a onclick="sendSmsTo(${news[i].number})" class="button-send-sms">
                                <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.87719 14.9741C15.2179 14.9741 19.5473 11.622 19.5473 7.48704C19.5473 3.35206 15.2179 0 9.87719 0C4.53651 0 0.207031 3.35206 0.207031 7.48704C0.207031 10.188 2.05427 12.5549 4.82395 13.8718V14.1537C4.82395 14.7643 3.9998 15.526 3.65302 15.8465C3.54829 15.9433 3.4871 15.9998 3.50529 15.9998C4.47122 15.9998 5.2571 15.6076 5.86843 15.3026C6.14132 15.1664 6.37942 15.0475 6.58324 14.9887C7.13381 14.8298 7.45301 14.7832 7.98969 14.8315C8.60015 14.9251 9.23127 14.9741 9.87719 14.9741Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                `);
            i++;
        }
    }
}
function addNews()
{
    whiteStaff();
    buttonBack.hide();

    $apps
        .html(`
            <div class="app weazel-news-add">
                <div class="header">
                    <img src="img/weazel-logo.svg" alt="">
                    <a onclick="appWeazelNews()">
                        <svg  viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94761 17.6336L0.24346 9.61095C-0.0811533 9.27324 -0.0811533 8.72764 0.24346 8.38905L7.94761 0.366438C8.41622 -0.122146 9.17865 -0.122146 9.64809 0.366438C10.1167 0.855023 10.1167 1.64799 9.64809 2.13657L3.05761 9.00044L9.64809 15.8626C10.1167 16.352 10.1167 17.145 9.64809 17.6336C9.17865 18.1221 8.41622 18.1221 7.94761 17.6336Z" fill="white"/>
                        </svg>
                        Назад
                    </a>
                </div>
                <p class="title">Создать объявление</p>
                <span class="calc">1 символ = $30</span>
                <textarea maxlength="200" rows="7" type="text" class="news-text scroll js-news-text" placeholder="Написать сообщение..."></textarea>
                <a class="send-news js-send-news">Опубликовать</a>
                <p class="news-cost">Цена к оплате: $<span class="js-news-cost">0</span></p>
                <a class="back-to-news" onclick="viewNews()">назад к списку объявлений</a>
            </div>
        `);
    calcNewsCost()

    $('.js-send-news').on('click', function () {
        let $newsInputText = $('.js-news-text');
        if($newsInputText.val() !== ''){
            let $thisText = $newsInputText.val();

            console.log('Player number:' + playerNumber + ' News text: ' + $thisText);
        }
    })

}
function calcNewsCost()
{
    let app = {
        vars: {
            input: $('.js-news-text')[0],
        },

        keyup: function() {
            if(app.vars.input.value.length >= 0) {
                setTimeout (function(){
                    let inputLength = $('.js-news-text').val().length;
                    let cost = inputLength * 30;
                    $('.js-news-cost').text(cost)
                }, 200);
            }
        },

        init: function() {
            app.vars.input.onkeyup = app.keyup;
        }
    };

    app.init();
}

/*
* App Radio
* */
$('.js-radio').on('click', function ()
{
    whiteStaff();
    appRadio();
});
function appRadio() {
    buttonBack.hide();

    $apps
        .html(`
            <div class="app radio">
                <div class="cover">
                              
                </div>
                <div class="player">
                    <p class="song-name">You Are My Sunshine</p>
                    <p class="song-artist">Leftover Cuties</p>
                    <div class="buttons">
                        <a class="prev">
                            <svg viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.0448 8.39617L3.0448 0.517811L-0.000867447 0.517811L-0.000865856 18.7144L3.0448 18.7144L3.0448 11.471L16.0977 19.1582L16.0977 0.709L3.0448 8.39617Z" fill="white"/>
                            </svg>
                        </a>
                        <a class="play">
                            <svg viewBox="0 0 103 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.3531 101.675C79.4298 101.675 102.19 78.9142 102.19 50.8374C102.19 22.7607 79.4298 0 51.3531 0C23.2763 0 0.515625 22.7607 0.515625 50.8374C0.515625 78.9142 23.2763 101.675 51.3531 101.675ZM40.3387 38.1288H46.7576V63.5475H40.3387V38.1288ZM55.1021 38.1288H61.521V63.5475H55.1021V38.1288Z" fill="white"/>
                            </svg>
                        </a>
                        <a class="next">
                            <svg viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6622 11.2796V19.158H16.7079V0.961397H13.6622V8.20475L0.609375 0.517578V18.9668L13.6622 11.2796Z" fill="white"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `);
}


/*
* App Messenger
* */
$('.js-messenger').on('click', function ()
{
    blackStaff();
    appMessenger();
});
function appMessenger()
{
    buttonBack.hide();

    $apps
        .html(`
            <div class="app messenger">
                <p class="title">Сообщения</p>
                <div class="js-message-container"></div>
            </div>
        `);
    appendMessageContact();
}
function appendMessageContact()
{
    $('.js-message-container')
        .append(`
            <a class="item">
                <div class="photo">
                    <img src="img/player-img.jpg" alt="">
                </div>
                <div class="right">
                    <p class="header">
                        <span class="name">Annie Hall</span>
                        <span class="time">
                            10:08
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0664062 1.87054L1.45949 0.5L8.06641 7L1.45949 13.5L0.0664062 12.1295L5.28023 7L0.0664062 1.87054Z" fill="#C7C7CC"/>
                            </svg>
                        </span>
                    </p>
                    <p class="text">Speaking of which, Peter really wants you to come in on Friday to chat about…</p>
                </div>
            </a>
            <a class="item">
                <div class="photo">
                    <img src="img/player-img.jpg" alt="">
                </div>
                <div class="right">
                    <p class="header">
                        <span class="name">Annie Hall</span>
                        <span class="time">
                            10:08
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0664062 1.87054L1.45949 0.5L8.06641 7L1.45949 13.5L0.0664062 12.1295L5.28023 7L0.0664062 1.87054Z" fill="#C7C7CC"/>
                            </svg>
                        </span>
                    </p>
                    <p class="text">Speaking of which, Peter really wants you to come in on Friday to chat about…</p>
                </div>
            </a>
            <a class="item">
                <div class="photo">
                    <img src="img/player-img.jpg" alt="">
                </div>
                <div class="right">
                    <p class="header">
                        <span class="name">Annie Hall</span>
                        <span class="time">
                            10:08
                            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0664062 1.87054L1.45949 0.5L8.06641 7L1.45949 13.5L0.0664062 12.1295L5.28023 7L0.0664062 1.87054Z" fill="#C7C7CC"/>
                            </svg>
                        </span>
                    </p>
                    <p class="text">Speaking of which, Peter really wants you to come in on Friday to chat about…</p>
                </div>
            </a>
        `)
}


/*
* App Trucking
* */







// Todo!

let images = [
    'img/wall/0.jpg',
    'img/wall/1.jpg',
    'img/wall/2.jpg',
    'img/wall/3.jpg',
    'img/wall/4.jpg',
    'img/wall/5.jpg',
    'img/wall/6.jpg',
    'img/wall/7.jpg',
    'img/wall/8.jpg',
    'img/wall/9.jpg',
    'img/wall/10.jpg',
    'img/wall/11.jpg',
    'img/wall/12.jpg',
    'img/wall/13.jpg',
    'img/wall/14.jpg',
    'img/wall/15.jpg',
];
let contacts = [
    {
        firstName: 'Bill',
        lastName: 'Anderson',
        number: 1000001,
        recentCall: '14:32'
    },
    {
        firstName: 'Milton',
        lastName: 'Aaron',
        number: 1000002,
        recentCall: ''
    },
    {
        firstName: 'Reid',
        lastName: 'Alex',
        number: 1000003,
        recentCall: '',
        favourites: true
    },
    {
        firstName: 'Bill',
        lastName: 'Tanderson',
        recentCall: '14:32',
        number: 1000004,
    },
    {
        firstName: 'Will',
        lastName: 'Baarda',
        recentCall: '',
        number: 1000005,
    },
    {
        firstName: 'Bill',
        lastName: 'Anderson',
        number: 1000006,
        favourites: true,
        recentCall: '14:32'
    },
    {
        firstName: 'Barlow',
        lastName: 'Michael',
        number: 1000007,
        recentCall: ''
    },
    {
        firstName: 'Bill',
        lastName: 'Ganderson',
        number: 1000008,
        recentCall: '14:32'
    },
    {
        firstName: 'Bill',
        lastName: 'Sanderson',
        number: 1000009,
        recentCall: '14:32',
        favourites: true
    },
    {
        firstName: 'Mike',
        lastName: 'Panderson',
        number: 10000010,
        recentCall: '14:32'
    }
];
let transport = [
    {
        transportName: 'AUDI A3',
        transportPlate:  'FH8534',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 5 ',
        transportPlate:  'FH8522',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    },
    {
        transportName: 'AUDI RS 6 AVANT',
        transportPlate:  'FH8532',
        imageId: 1
    }
];
let news = [
    {
        number: 1239239,
        text: 'We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 2239239,
        text: 'We had a meth addict in here this morning who was biologically younger. We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 3239239,
        text: 'We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 4239239,
        text: 'We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 5223239,
        text: 'We had a meth addict in here this morning who was biologically younger. We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 6239239,
        text: 'We had a meth addict in here this morning who was biologically younger. We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 7239239,
        text: 'We had a meth addict in here this morning who was biologically younger'
    },
    {
        number: 8239239,
        text: 'We had a meth addict in here this morning who was biologically younger'
    }
];
let taxiOrders = [
    {
        playerName: 'Petro Bamper',
        address: 'Pillbox Hill',
        distance: 13
    },
    {
        playerName: 'Igor Igor',
        address: 'Pillbox Hill, 228',
        distance: 2
    },
    {
        playerName: 'Helen Baba',
        address: 'Pillbox Hill, 228',
        distance: 5
    },
];

let playerWallpaperSelect = 1;
let bankBalance = 7534.14;
let playerName = 'Luther Wilson';
let playerNumber = 70852592;

wallpaperImage.select = playerWallpaperSelect;
clock();