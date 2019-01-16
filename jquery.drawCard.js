/** 
* jQuery draw  card
* @version: v1.0.0
* @author: Munkh
* Usage:
	var settings = {
		expirationDate: "05/23",
		firstName: "FirstName",
		lastName: "LastName",
		cardNumber: "1234 4567 8910 1112",
		logo: "img/logo.png",
		cvc2: "003",
		flip: false,
	};
	$('#render').drawCard(settings);
**/
(function ($) {
    function roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    function front(ctx, settings, width, height) {
        var grd = ctx.createLinearGradient(200, 0, 0, 0);
        grd.addColorStop(0, "#989898");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        roundRect(ctx, 10, 10, width, height, { tl: 20, tr: 20, br: 20, bl: 20 })

        // Logo
        if (settings.logo.length != 0) {
            ctx.beginPath();
            var img = new Image();
            img.src = settings.logo;
            img.onload = function () {
                var width = img.width;
                var height = img.height;

                // Resize by width
                if (width > 100) {
                    var ratio = 100 / width;
                    width *= ratio;
                    height *= ratio;
                }

                // Resize by height
                if (height > 30) {
                    var ratio = 30 / width;
                    width *= ratio;
                    height *= ratio;
                }

                if (width != 0 && height != 0)
                    ctx.drawImage(img, 30, 30, width, height);
            }
            ctx.closePath();
        }

        // Card number
        var cardNumber = (settings.cardNumber.length > 15) ? settings.cardNumber.match(/.{1,4}/g).join(" ") : "";
        ctx.beginPath();
        ctx.font = "700 25px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(cardNumber, 30, 110);
        ctx.closePath();
        ctx.fill();

        // Exp date
        ctx.beginPath();
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText("Exp date " + settings.expirationDate, 150, 140);
        ctx.closePath();
        ctx.fill();

        // CH name
        var name = settings.firstName.length != 0 ? settings.firstName[0].toUpperCase() : "";
        name += " " + ((settings.lastName.length != 0) ? settings.lastName.toUpperCase() : "");
        ctx.beginPath();
        ctx.font = "16px sans-serif";
        ctx.fillStyle = "black";
        ctx.fillText(name, 30, 170);
        ctx.closePath();
        ctx.fill();
    };

    function back(ctx, settings, width, height, offset) {
        var grd = ctx.createLinearGradient(0, 0, 300, 0);
        grd.addColorStop(0, "#989898");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        roundRect(ctx, 10, offset + 10, width, height, { tl: 20, tr: 20, br: 20, bl: 20 })

        // Black area
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(10, offset + 50, width, 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // CVC2 area
        ctx.beginPath();
        ctx.fillStyle = "#5F749D";
        ctx.strokeStyle = "#2f528f";
        ctx.rect(30, offset + 90, width / 2, 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.rect(width / 2 + 30, offset + 90, 70, 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // CVC2 text
        ctx.beginPath();
        ctx.font = "italic 10pt sans-serif";
        ctx.strokeText(settings.cvc2, width / 2 + 50, offset + 110);
        ctx.closePath();
        ctx.stroke();
    };

    $.fn.drawCard = function (options) {
        var settings = $.extend({
            firstName: "",
            lastName: "",
            cardNumber: "",
            logo: "",
            expirationDate: "",
            cvc2: "",
            flip: false,
        }, options);

        var canvas = $('<canvas>').attr({
            id: 'card_canvas' + ((!settings.flip) ? '_front' : '_back'),
            width: 400,
            height: 200
        });

        this.html(canvas);

        var ctx = canvas[0].getContext("2d");
        var width = 300;
        var height = 180;

        if (!settings.flip) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            front(ctx, settings, width, height);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            back(ctx, settings, width, height, 0);
        }

        return this;
    };

}(jQuery));