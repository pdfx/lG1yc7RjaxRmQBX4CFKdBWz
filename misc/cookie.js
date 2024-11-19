        $('.close-sidebar').on('click', function () {
						var encodedid = btoa('mini-navbar');
            if (!$('body').hasClass('mini-navbar')) {
								runCookie('add', 'mini-navbar', 'paneltoggle');
            } else {
								runCookie('rem', 'mini-navbar', 'paneltoggle');
            };
        });

        $('.reveal-rightsidebar').on('click', function () {
            var el = $(this).parents('.panel');
						var panelid = el.attr('id');
            if (!$('body').hasClass('right-sidebar')) {
								runCookie('add', 'right-sidebar', 'paneltoggle');
            } else {
								runCookie('rem', 'right-sidebar', 'paneltoggle');
            };
        });

        $('.view-panel').on('click', function () {
            var el = $(this).parents('.panel');
						var panelid = el.attr('id');
            if (!$(this).hasClass('gridpanel')) {
								runCookie('add', 'gridpanel_'+panelid, 'paneltoggle');
            } else {
								runCookie('rem', 'gridpanel_'+panelid, 'paneltoggle');
            };
        });

        $('.panel-options .expand-panel').on('click', function (e) {
            var el = $(this).parents('.panel');
						var panelid = el.attr('id');
            if (el.hasClass("panel-fullsize")) {
						runCookie('rem', 'fullsize_'+panelid, 'paneltoggle');
            } else {
						runCookie('add', 'fullsize_'+panelid, 'paneltoggle');
            }
            e.preventDefault();
        });


        $('.panel-options .minimise-panel').on('click', function (e) {
            var el = $(this).parents('.panel');
						var panelid = el.attr('id');
            if (el.hasClass("minimized")) {
						runCookie('rem', 'minimise_'+panelid, 'paneltoggle');
            } else {
						runCookie('add', 'minimise_'+panelid, 'paneltoggle');
            }
            e.preventDefault();
        });


    function toggleleftsidebar(){
        $("body").toggleClass("mini-navbar");
        $('#sidebar-collapse').attr('style', '');
        $("body").removeClass('fixed-sidebar');
        // Toggle right-sidebar if mini-navbar is opened
        if ((!$('body').hasClass('768')) && ($('body').hasClass('right-sidebar')) && (!$('body').hasClass('mini-navbar'))) { $("body").toggleClass("right-sidebar"); }
        if (($('body').hasClass('768')) && ($('body').hasClass('mini-navbar')) && ($('body').hasClass('right-sidebar'))) { $("body").toggleClass("right-sidebar"); }
        if (!$('body').hasClass('mini-navbar')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#sidebar-collapse').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#sidebar-collapse').fadeIn(500);
            }, 100);
        }
    }

    function togglerightsidebar(){
        $("body").toggleClass("right-sidebar");
        // Toggle mini-navbar if right-sidebar is opened
        if ((!$('body').hasClass('768')) && (!$('body').hasClass('mini-navbar')) && ($('body').hasClass('right-sidebar'))) { $("body").toggleClass("mini-navbar"); }
        if (($('body').hasClass('768')) && ($('body').hasClass('right-sidebar')) && ($('body').hasClass('mini-navbar'))) { $("body").toggleClass("mini-navbar"); }
        if ($('body').hasClass('right-sidebar')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#right-sidebar-id').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#right-sidebar-id').fadeIn(600);
            }, 100);
        }else{

        }
    }

			function runCookie(act, thisid='', cookiename=''){
			var editcookie;
			var thiscookie = $.cookie(cookiename);

			var encodedid = btoa(thisid);
			var decodedid = atob(encodedid);
//alert(encodedid);
//alert(decodedid);
				if (thiscookie) {
				thiscookie = thiscookie.replace('//','/');
					}
			
				if(act=='add'){
					if (typeof thiscookie === 'undefined'){
				 		$.cookie(cookiename, cookiename);
						 $.cookie(cookiename, cookiename + '/, ' + encodedid);
					}else{
						if(thiscookie.indexOf(encodedid) == -1){
						 $.cookie(cookiename, thiscookie + ', ' + encodedid);
						}
					}
				}
			
				if(act=='rem'){
					editcookie = thiscookie.replace(', '+encodedid+'/','');
					$.cookie(cookiename, editcookie);
				}
				if(act=='del'){
					if (thiscookie) {
					editcookie = thiscookie.replace(thiscookie,'');
					$.cookie(cookiename, editcookie);
					document.cookie = cookiename +'=; Path=/;SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					$.removeCookie(cookiename);
					return false;
					}
				}
			}
			
	$('.clearnavcookies').on('click','', function(){
			Swal.fire({
			  title: "Are you sure you want to clear cookies?",
			  text: "You won't be able to revert this!",
			  icon: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#3085d6",
			  cancelButtonColor: "#d33",
			  confirmButtonText: "Yes, clear it!"
			}).then((result) => {
			  if (result.isConfirmed) {
			  	clearCookie('paneltoggle');
			    Swal.fire({
			      title: "Cleared!",
			      text: "Your cookies has been cleared.",
			      icon: "success"
			    });
			  }
			});
	});

			function clearCookie(cookiename){
			  		runCookie('del', '', cookiename);
						$('*[class*=allpanel]').each(function() {
										$(this).children(".panel-body").removeClass('panel-body-hidden');
										$(this).children(".panel-body").show();
										$(this).find(".panel-collapse").removeClass("expand").addClass("collapses");
										$(this).find(".panel-tools a").show();
										$(this).removeClass('curhand');
						});
							$('body').removeClass('navigation-small');
				    	$('.navdate').show();
			}


			function actionCookie(cookiename){
			var thiscookie = $.cookie(cookiename);
					if (typeof thiscookie !== 'undefined'){
						$('*[class*=allpanel]').each(function() {
						var thisid = $(this).attr('id');

						var minimise = btoa('minimise_'+thisid);
						if(thiscookie.indexOf(minimise) != -1){
							$('#'+thisid).addClass('minimized');
      				$('#'+thisid).find(".panel-body").hide();
						}


						var fullsize = btoa('fullsize_'+thisid);
						if(thiscookie.indexOf(fullsize) != -1){
							$('#'+thisid).addClass('panel-fullsize');
							$('#'+thisid).find(".expand-panel i").removeClass('mi-open_in_full').addClass('mi-close_fullscreen');
							$('#'+thisid).find(".expand-panel").attr('title', 'Exit Full Window');
            	$('#'+thisid).find(".expand-panel").siblings('a').not(this).hide();
            	$("body").addClass('nobodyscroll');
						}

						var gridpanel = btoa('gridpanel_'+thisid);
						if(thiscookie.indexOf(gridpanel) != -1){
							$('#'+thisid).find(".table").addClass('gridview');
							$('#'+thisid).find(".view-panel").addClass('gridpanel').removeClass('listpanel').attr('title', 'List');
							$('#'+thisid).find(".view-panel i").removeClass('mi-grid_view').addClass('mi-view_list');
							var thistblid = $('#'+thisid).find(".table").attr('id');
								var eltable = $('#'+thisid).find(".table");

							setTimeout(function() {
								$(document).find("table td").each(function(e) {
								    var titletxt = $(this).attr('data-title');
								    if(!$(this).hasClass('imgcol')){
								    	$(this).attr('title', titletxt).addClass('text-center');
										}

								});

								$(document).find('.sortseldiv').show();
								$(document).find('#table_sortsel').val('reset');
							}, 1000);

						}

						});
						var mininavbar = btoa('mini-navbar');
						if(thiscookie.indexOf(mininavbar) != -1){
							toggleleftsidebar();
						}

						var rightsidebar = btoa('right-sidebar');
						if(thiscookie.indexOf(rightsidebar) != -1){
							togglerightsidebar();
						}

				}
			}
			//runCookie('del', '', 'paneltoggle');
			actionCookie('paneltoggle');
