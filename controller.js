var cart_list = new Array();


function pushToStorage(arr) {
	if (typeof (Storage) !== "undefined") {
		localStorage.clear("cart_list");
		localStorage.setItem("cart_list", JSON.stringify(arr));
		var stored_cartList = JSON.parse(localStorage.getItem("cart_list"));
	} else {
		console.log("your browser does not support Storage");
	}
}

function loadExisting() {
	var subtotal = 0, tax = 0, total = 0;
	var stored_cartList = JSON.parse(localStorage.getItem("cart_list"));
	if (stored_cartList != null) {
		cart_list = stored_cartList;

		stored_cartList.forEach(function (item, index, arr) {
			console.log(item);
			$("#cart_list_item").append(item);

			var pathname = window.location.pathname;
			var page = pathname.split('/');
			page = page[page.length - 1];

			if (page == "cart.html") {
				var n = item.lastIndexOf('$');
				subtotal += parseFloat(item.substring(n + 1).split('<')[0]);
				var quan = item.lastIndexOf("center;'>");
				quan = parseInt(item.substring(quan + 9, quan + 10));
				subtotal = subtotal * quan;
				$("#subTotal")[0].innerHTML = "$" + subtotal.toFixed(2);
				tax += 0.13 * subtotal;
				total = subtotal + tax;
				$("#tax")[0].innerHTML = "$" + tax.toFixed(2);
				$("#total")[0].innerHTML = "$" + total.toFixed(2);
			}

		});
		//count_items_in_wishlist_update();
	}
}

$(document).ready(function () {
	loadExisting();
	$(".cartlist").on("click", function () {
		$data = "";
		$product_id = $(this).attr("product_id");
		$product_name = $("#pname")[0].innerHTML;
		$product_price = $(this).attr("product_price");
		$product_src = $(this).attr("product_src");
		$product_size = $("#size")[0].value;
		$product_quan = $("#quan")[0].value;

		//check if the element is in the array
		if ($.inArray($product_id, cart_list) == -1) {
			$product_str = "<tr class='cartlist-item' id='list_id_" + $product_id + "'><td class='w-pname'>" + $product_name + "</td><td class='w-price'>$ " +
				$product_price + "</td><td class='w-premove' wpid='" + $product_id + "'>x</td></tr>";

			$product_str1 = "<tr><td><div class='cart-info' id='list_id_'><img src='" + $product_src + "' alt='buy-1'><div><p>" + $product_name + "</p><small>Size:" +
				$product_size + "</small><br><button class='w-premove' wpid='" + $product_id + "'>Remove</button></div></div></td><td style='text-align: center;'>" +
				$product_quan + "</td><td>" + $product_price + "</td></tr>";

			$("#cart").append($product_str1);
			cart_list.push($product_str1);
			pushToStorage(cart_list);
			show_message("Product " + $product_name + " added");
			//count_items_in_cartlist_update();

		}

	});
	$("#cart_list_item").on("click", ".w-premove", function () {
		$product_id = $(this).attr("wpid");
		$("#list_id_" + $product_id).remove();

		for (var i = 0; i < cart_list.length; i++) {
			if (cart_list[i].indexOf($product_id) > -1) {
				cart_list.splice(i, 1);
				document.getElementById("cart_list_item").deleteRow(i);
			}
		}
		cart_list = $.grep(cart_list, function (n, i) {
			return n != $product_id;
		});
		pushToStorage(cart_list);
		//count_items_in_cartlist_update();
		show_message("Product removed");
		loadExisting();
		window.location.reload()
	});


	// images in the pool
	var images = [
		'images/assets/image3.jpg',
		'images/assets/image1.jpg',
		'images/logo.png'
	];

	// next image to display
	var next = 0;

	// interval beetween images
	var INTERVAL = 2000;

	// main function
	var doCarrousel = function () {
		$("#top").fadeOut(function () {
			$(this).attr("src", images[next]).fadeIn(
				function () {
					setTimeout(doCarrousel, INTERVAL);
				});
		});
		if (++next >= images.length)
			next = 0;
	};

	//start carrousel
	doCarrousel();


	var MenuItems = document.getElementById("MenuItems");

	MenuItems.style.maxHeight = "0px";

	$(".menu-icon").on("click", function () {
		if (MenuItems.style.maxHeight == "0px") {
			MenuItems.style.maxHeight = "200px";
		} else {
			MenuItems.style.maxHeight = "0px";
		}

	});

	var scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1000,
		speedAsDuration: true
	});

	
	var pathname = window.location.pathname;
	var page = pathname.split('/');
	page = page[page.length - 1];

	if (page == "details1.html" || page == "details2.html") {
		var productImg = document.getElementById("productImg");
		var smallImg = document.getElementsByClassName("small-img");

		smallImg[0].onclick = function () {
			var display = productImg.src;
			productImg.src = smallImg[0].src;
			smallImg[0].src = display;
		}
		smallImg[1].onclick = function () {
			var display = productImg.src;
			productImg.src = smallImg[1].src;
			smallImg[1].src = display;
		}
		smallImg[2].onclick = function () {
			var display = productImg.src;
			productImg.src = smallImg[2].src;
			smallImg[2].src = display;
		}
		smallImg[3].onclick = function () {
			var display = productImg.src;
			productImg.src = smallImg[3].src;
			smallImg[3].src = display;
		}
		smallImg[4].onclick = function () {
			var display = productImg.src;
			productImg.src = smallImg[4].src;
			smallImg[4].src = display;
		}
	}
});

function show_message($msg) {
	var x = document.getElementById("snackbar");
	x.innerHTML = $msg;
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function checkout() {
	alert("Thank you for the purchase!")
}