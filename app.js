



window.onload = function () {
    // app.js code here



    $('head').append("<link href='http://fonts.googleapis.com/css?family=Oswald:400,300,700' rel='stylesheet' type='text/css'/>");

    $('head').append('<meta name="apple-mobile-web-app-capable" content="yes"/>');

    $('head').append('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.5, user-scalable=yes"/>');




    // handlebar methods
    Handlebars.registerHelper('diamondRating', function (rating, outOf) {
        var ratingDom = "";
        for (var i = 1; i <= rating; i++) {
            ratingDom = ratingDom + "<span class=\"tst-icon-diamond\"></span>";
        }
        for (var o = rating; o < outOf; o++) {
            ratingDom = ratingDom + "<span class=\"tst-icon-diamond disabled\"></span>";
        }
        return new Handlebars.SafeString(ratingDom);
    });

    // load card template
    var cardTemplate = Handlebars.compile($("#card-template").html());
    var hotelTemplate = Handlebars.compile($("#hotel-description").html());

    // cards

    /* "_id": "614e3dea468ceb405572ca49",
            "owner_name": "Felipe",
            "owner_mail": "Pedro@gmail.com",
            "article_year": 1998,
            "article_name": "Palanganaloca",
            "article_description": "loremipsum",
            "article_photo": "PATH",
            "initial_price": 99,
            "max_date": "2021-09-24T06:00:00.000Z",
            "current_max_price": 3000,
            "__v": 0*/

    
    /*nombre del artículo, la descripción, una fotografía,
    la fecha de publicación, la fecha de cierre de la subasta,
    el
    año del artículo, el precio inicial y el precio máxim */
    

    var cartas = [
        {
            "_id": "614e3de0468ceb405572ca47",
            "owner_name": "Pedro",
            "owner_mail": "Pedro@gmail.com",
            "article_year": 1998,
            "article_name": "Palanganaloca",
            "article_description": "loremipsum",
            "article_photo": "PATH",
            "initial_price": 99,
            "max_date": "2021-09-24T06:00:00.000Z",
            "current_max_price": 1000,
            "__v": 0
        },
        {
            "_id": "614e3dea468ceb405572ca49",
            "owner_name": "Felipe",
            "owner_mail": "Pedro@gmail.com",
            "article_year": 1998,
            "article_name": "Palanganaloca",
            "article_description": "loremipsum",
            "article_photo": "PATH",
            "initial_price": 99,
            "max_date": "2021-09-24T06:00:00.000Z",
            "current_max_price": 3000,
            "__v": 0
        }
    ]
    function renameKey ( obj, oldKey, newKey ) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }
    
    cartas.forEach( obj => renameKey( obj, '_id', 'id' ) );

    cartas.forEach(obj => renameKey(obj, 'article_name', 'title'));
    cartas.forEach(obj => renameKey(obj, 'current_max_price', 'price'));
    cartas.forEach(obj => renameKey(obj, 'article_description', 'description'));
    cartas.forEach(obj => renameKey(obj, 'max_date', 'featureMsg'));
    cartas.forEach(obj => renameKey(obj, 'article_year', 'saleMsg'));
    cartas.forEach(obj => renameKey(obj, 'article_photo', 'imgUrl'));

    for (var i = 0; i < cartas.length; i++) {
        cartas[i].description += " - Fecha Maxima: " + String(cartas[i].featureMsg) + " - Año: " + String(cartas[i].saleMsg) + " precio inicial: " + String(cartas[i].initial_price)
        cartas[i].imgUrl = "http://image.shutterstock.com/display_pic_with_logo/160510/123035896/stock-photo-hotel-room-123035896.jpg";

      }

    

    console.log(cartas)
    console.log("sdsdsds")


    var cards = [
        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/160510/123035896/stock-photo-hotel-room-123035896.jpg",
            price: "$4979",
            attributes: "featured",
            featureMsg: "Feature",
            currency: "USD",
            title: "Atlanta Marriott Buckhead Hotel ",
            description: new Handlebars.SafeString(hotelTemplate({
                diamondRating: "4",
                tripAdvisorUrl: "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-13883-1.gif",
                tripAdvisor: "3",
                address: "3405 Lenox Road, Atlanta, GA 30326 Unitied States",
                street: "3405 Lenox Road",
                cityState: "Atlanta, GA",
                zipcode: "30326",
                country: "Unitied States",
                phone: "1-800-555-1212"
            }))
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/82393/82393,1296425822,1/stock-photo-night-pool-side-of-rich-hotel-trademarks-were-removed-70110103.jpg",
            attributes: "sale featured",
            saleMsg: "Save 10%",
            featureMsg: "Featured",
            price: "$173",
            currency: "USD",
            title: "Atlanta Marriott Buckhead Hotel & Conference Center Part Two",
            description: new Handlebars.SafeString(hotelTemplate({
                diamondRating: "3",
                tripAdvisorUrl: "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/2.5-13883-1.gif",
                address: "123 Main Street, New York, NY 12345",
                street: "123 Main Street",
                cityState: "Atlanta, GA",
                zipcode: "12345",
                phone: "404-123-1234"
            }))
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/565474/142345144/stock-photo-day-view-of-a-hotel-exterior-with-window-to-dining-room-142345144.jpg",
            price: "$387",
            currency: "USD",
            title: "Best Western Hotel & Suites Airport South",
            description: new Handlebars.SafeString(hotelTemplate({
                address: "123 Main Street, New York, NY 12345",
                street: "123 Main Street",
                cityState: "Atlanta, GA",
                zipcode: "12345"
            }))
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/304396/112902592/stock-photo-modern-lobby-for-five-stars-hotel-112902592.jpg",
            price: "$843",
            currency: "USD",
            title: "Another Awesome Hotel Name",
            description: new Handlebars.SafeString(hotelTemplate({
                diamondRating: "3",
                address: "123 Main Street, New York, NY 12345",
                street: "123 Main Street",
                cityState: "Atlanta, GA",
                zipcode: "12345"
            }))
        },

        {
            imgUrl: "https://dashboard.qa.tstllc.net/images/car/hertz/cars/ZEUSSCAR999.jpg",
            saleMsg: "5% discount",
            attributes: "sale",
            price: "$19",
            period: "/day",
            currency: "USD",
            description: "car description",
            title: "Economy - Kia Rio Or Similar"
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/749500/106135718/stock-photo-night-pool-side-of-rich-hotel-106135718.jpg",
            price: "$231",
            currency: "USD",
            title: "Another Awesome Hotel Name",
            description: new Handlebars.SafeString(hotelTemplate({
                diamondRating: "5",
                address: "123 Main Street, New York, NY 12345 United States",
                street: "123 Main Street",
                cityState: "Atlanta, GA",
                zipcode: "12345"
            }))
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/102438/102438,1251667798,5/stock-photo-detail-of-a-four-stars-hotel-with-reflection-36184549.jpg",
            saleMsg: "Save 15% Now!",
            attributes: "sale",
            price: "$112",
            currency: "CAD",
            title: "Another Awesome Hotel Name",
            description: new Handlebars.SafeString(hotelTemplate({
                street: "123 Main Street",
                cityState: "Atlanta, GA",
                zipcode: "12345"
            }))
        },

        {
            imgUrl: "https://dashboard.qa.tstllc.net/images/car/hertz/cars/ZEUSCCAR999.jpg",
            vendorLogoUrl: "https://amatravel.qa.tstllc.net/car/assets/images/car_vendor_logo/hertz.png",
            price: "$47",
            period: "/day",
            currency: "CAD",
            description: "car description",
            title: "Economy - Kia Rio Or Similar"
        },

        {
            imgUrl: "https://dashboard.qa.tstllc.net/images/car/hertz/cars/ZEUSPCAR999.jpg",
            attributes: "",
            price: "$29",
            period: "/day",
            currency: "USD",
            description: "car description",
            title: "Economy - Kia Rio Or Similar"
        },

        // cruise

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/131785/106514864/stock-photo-bamboo-hut-on-a-tropical-beach-106514864.jpg",
            vendorLogoUrl: "https://amatravel.qa.tstllc.net/cruise/common/assets/images/cruise-line/rc.png",
            price: "$2345",
            currency: "USD",
            description: "cruise description",
            title: "Miami, Florida (RT)"
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/94501/94501,1329501415,3/stock-photo-romantic-cozy-hammock-in-the-shadow-of-the-palm-on-the-tropical-beach-by-the-sea-95647150.jpg",
            vendorLogoUrl: "https://amatravel.qa.tstllc.net/cruise/common/assets/images/cruise-line/cv.png",
            saleMsg: "5% Discount",
            attributes: "sale",
            price: "$664",
            currency: "CAD",
            description: "cruise description",
            title: "Port Canaveral, Florida (RT)"
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/100406/98774909/stock-photo-villas-on-the-green-tropical-beach-with-steps-into-water-98774909.jpg",
            price: "$1889",
            currency: "USD",
            description: "cruise description",
            title: "Miami, Florida (RT)"
        },

        {
            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/230092/144188068/stock-photo-the-wall-of-the-castle-on-the-cliff-alanya-turkey-144188068.jpg",
            saleMsg: "34% Savings",
            attributes: "sale",
            price: "$894",
            currency: "USD",
            description: "cruise description",
            title: "Charleston, South Carolina (RT)"
        },

        // flight

        {            imgUrl: "http://image.shutterstock.com/display_pic_with_logo/1375780/126301814/stock-photo-night-urban-city-skyline-bangkok-thailand-bangkok-is-the-capital-city-of-thailand-and-the-most-126301814.jpg",

            price: "$857",
            currency: "USD",
            description: "description"
        }
    ];

    cards = cartas

    $.each(cards, function (index, cards) {
        $(".cards").append(cardTemplate(cards));
    });

};