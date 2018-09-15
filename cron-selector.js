(function ($) {
    
    var resultsName = "";
    var inputElement;
    var displayElement;
    
    $.fn.extend({
        cronSelector: function () {
            //create top menu
            var cronContainer = $("<div/>", { id: "CronContainer", style: "display:none;width:300px;height:300px;" });
            var mainDiv = $("<div/>", { id: "CronGenMainDiv", style: "width:480px;height:270px;" });
            var topMenu = $("<ul/>", { "class": "nav nav-tabs", id: "CronGenTabs" });
            $('<li/>', { 'class': 'active' }).html($('<a id="MinutesTab" href="#Minutes">分</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="HourlyTab" href="#Hourly">时</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="DailyTab" href="#Daily">天</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="WeeklyTab" href="#Weekly">周</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="MonthlyTab" href="#Monthly">月</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="YearlyTab" href="#Yearly">年</a>')).appendTo(topMenu);
            $(topMenu).appendTo(mainDiv);

            //create what's inside the tabs
            var container = $("<div/>", { "class": "container-fluid", "style": "margin-top: 10px" });
            var row = $("<div/>", { "class": "row-fluid" });
            var span12 = $("<div/>", { "class": "span12" });
            var tabContent = $("<div/>", { "class": "tab-content" });

            //creating the minutesTab
            var minutesTab = $("<div/>", { "class": "tab-pane active", id: "Minutes" });
            $(minutesTab).append("从每小时的第 0 分钟开始，每隔&emsp;");
            $("<input/>", { id: "MinutesInput", type: "text", value: "1", style: "width: 40px" }).appendTo(minutesTab);
            $(minutesTab).append("&emsp;分钟");
            $(minutesTab).appendTo(tabContent);

            //creating the hourlyTab
            var hourlyTab = $("<div/>", { "class": "tab-pane", id: "Hourly" });

            var hourlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "HourlyRadio", checked: "checked" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&emsp;从每天的 00:00 开始，每隔&emsp;");
            $("<input/>", { id: "HoursInput", type: "text", value: "1", style: "width: 40px" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&emsp;小时");
            $(hourlyOption1).appendTo(hourlyTab);

            var hourlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "HourlyRadio" }).appendTo(hourlyOption2);
            $(hourlyOption2).append("&emsp;每天的&emsp;");
            $(hourlyOption2).append('<select id="AtHours" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(hourlyOption2).append('<select id="AtMinutes" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
            $(hourlyOption2).appendTo(hourlyTab);

            $(hourlyTab).appendTo(tabContent);

            //craeting the dailyTab
            var dailyTab = $("<div/>", { "class": "tab-pane", id: "Daily" });

            var dailyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "DailyRadio", checked: "checked" }).appendTo(dailyOption1);
            $(dailyOption1).append("&emsp;从每月的第 1 天开始，每隔&emsp;");
            $("<input/>", { id: "DaysInput", type: "text", value: "1", style: "width: 40px" }).appendTo(dailyOption1);
            $(dailyOption1).append("&emsp;天");
            $(dailyOption1).appendTo(dailyTab);

            var dailyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "DailyRadio" }).appendTo(dailyOption2);
            $(dailyOption2).append("&emsp;周一到周五");
            $(dailyOption2).appendTo(dailyTab);

            $(dailyTab).append("&emsp;具体时间&emsp;");
            $(dailyTab).append('<select id="DailyHours" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(dailyTab).append('<select id="DailyMinutes" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');

            $(dailyTab).appendTo(tabContent);

            //craeting the weeklyTab
            var weeklyTab = $("<div/>", { "class": "tab-pane", id: "Weekly" });
            var weeklyWell = $("<div/>", { "class": "well well-small" });

            var span31 = $("<div/>", { "class": "span6 col-sm-6" });
            $("<input/>", { type: "checkbox", value: "MON" }).appendTo(span31);
            $(span31).append("&nbsp;星期一<br />");
			$("<input/>", { type: "checkbox", value: "TUE" }).appendTo(span31);
			$(span31).append("&nbsp;星期二<br />");
            $("<input/>", { type: "checkbox", value: "WED" }).appendTo(span31);
            $(span31).append("&nbsp;星期三<br />");
			$("<input/>", { type: "checkbox", value: "THU" }).appendTo(span31);
            $(span31).append("&nbsp;星期四<br />");

            var span32 = $("<div/>", { "class": "span6 col-sm-6" });
			$("<input/>", { type: "checkbox", value: "FRI" }).appendTo(span32);
            $(span32).append("&nbsp;星期五<br />");
            $("<input/>", { type: "checkbox", value: "SAT" }).appendTo(span32);
            $(span32).append("&nbsp;星期六<br />");
			$("<input/>", { type: "checkbox", value: "SUN" }).appendTo(span32);
            $(span32).append("&nbsp;星期日");

            $(span31).appendTo(weeklyWell);
            $(span32).appendTo(weeklyWell);
            //Hack to fix the well box
            $("<br /><br /><br /><br />").appendTo(weeklyWell);

            $(weeklyWell).appendTo(weeklyTab);

            $(weeklyTab).append("&emsp;具体时间&emsp;");
            $(weeklyTab).append('<select id="WeeklyHours" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(weeklyTab).append('<select id="WeeklyMinutes" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
			$(weeklyTab).append('<div style="color:#23527c;margin-top:20px;">提示：如果没有选择星期，则默认星期一。</div>');
            $(weeklyTab).appendTo(tabContent);

            //craeting the monthlyTab
            var monthlyTab = $("<div/>", { "class": "tab-pane", id: "Monthly" });

            var monthlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "MonthlyRadio", checked: "checked" }).appendTo(monthlyOption1);
			$(monthlyOption1).append("&emsp;从1月开始，每隔&emsp;");
			$("<input/>", { id: "MonthInput", type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption1);
			$(monthlyOption1).append("&emsp;个月的&emsp;");
			$("<input/>", { id: "DayOfMOnthInput", type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&emsp;日&emsp;");
            $(monthlyOption1).appendTo(monthlyTab);

            var monthlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "MonthlyRadio" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&emsp;每月&emsp;");
			$("<input/>", { id: "EveryMonthInput", type: "text", value: "1", style: "width: 40px" }).appendTo(monthlyOption2);
			$(monthlyOption2).append("&emsp;日的&emsp;");
            $(monthlyOption2).append('<select id="WeekDay" class="day-order-in-month" style="width: 80px"></select>');
			$(monthlyOption2).append("&nbsp;");
            $(monthlyOption2).append('<select id="DayInWeekOrder" class="week-days" style="width: 100px"></select>');
            $(monthlyOption2).appendTo(monthlyTab);

            $(monthlyTab).append("&emsp;具体时间&emsp;");
            $(monthlyTab).append('<select id="MonthlyHours" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(monthlyTab).append('<select id="MonthlyMinutes" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');
            $(monthlyTab).appendTo(tabContent);

            //craeting the yearlyTab
            var yearlyTab = $("<div/>", { "class": "tab-pane", id: "Yearly" });

            var yearlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "YearlyRadio", checked: "checked" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("&emsp;每年的&emsp;");
            $(yearlyOption1).append('<select id="MonthsOfYear" class="months" style="width: 40px"></select>');
			$(yearlyOption1).append("&emsp;月&emsp;");
            $("<input/>", { id: "YearInput", type: "text", value: "1", style: "width: 40px" }).appendTo(yearlyOption1);
			$(yearlyOption1).append("&emsp;日&emsp;");
            $(yearlyOption1).appendTo(yearlyTab);

            var yearlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "YearlyRadio" }).appendTo(yearlyOption2);
			$(yearlyOption2).append("&emsp;每年&emsp;");
			$(yearlyOption2).append('<select id="MonthsOfYear2" class="months" style="width: 40px"></select>');
			$(yearlyOption2).append("&emsp;月的&emsp;");
            $(yearlyOption2).append('<select id="DayOrderInYear" class="day-order-in-month" style="width: 80px"></select>');
			$(yearlyOption2).append("&nbsp;");
            $(yearlyOption2).append('<select id="DayWeekForYear" class="week-days" style="width: 100px"></select>');
            $(yearlyOption2).appendTo(yearlyTab);

            $(yearlyTab).append("&emsp;具体时间&emsp;");
            $(yearlyTab).append('<select id="YearlyHours" class="hours" style="width: 60px"></select>').append('&emsp;时&emsp;');
            $(yearlyTab).append('<select id="YearlyMinutes" class="minutes" style="width: 60px"></select>').append('&emsp;分&emsp;');

            $(yearlyTab).appendTo(tabContent);
            $(tabContent).appendTo(span12);

            //creating the button and results input           
            resultsName = $(this).prop("id");
            $(this).prop("name", resultsName);

            $(span12).appendTo(row);
            $(row).appendTo(container);
            $(container).appendTo(mainDiv);
            $(cronContainer).append(mainDiv);
			
			var footerDiv = $("<div style='text-align: right;'></div>");
			footerDiv.appendTo(cronContainer);
			var okBtn = $("<button id='okBtn' type='button' class='btn btn-primary'>确定</button>");
			var cancelBtn = $("<button id='cancelBtn' type='button' class='btn btn-primary'>取消</button>");
			$(okBtn).appendTo(footerDiv);
			footerDiv.append("&emsp;");
			$(cancelBtn).appendTo(footerDiv);
            
            var that = $(this);

            // Hide the original input
            that.hide();

            // Replace the input with an input group
            var $g = $("<div>").addClass("input-group");
            // Add an input
            var $i = $("<input>", { type: 'text', placeholder: '', readonly: 'readonly' }).addClass("form-control").val($(that).val());
            $i.appendTo($g);
            // Add the edit button
            var $b = $("<span class='input-group-addon' style='cursor:pointer;'><i class='glyphicon glyphicon-edit'></i><span>");
			
			$g.append($b);

            $(this).before($g);

            inputElement = that;
            displayElement = $i;

            $b.popover({
                html: true,
                content: function () {
                    return $(cronContainer).html();
                },
                template: '<div class="popover" style="max-width:500px !important; width:500px"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
                placement: 'bottom'

            }).on('click', function (e) {
                e.preventDefault();
                
                fillDataOfMinutesAndHoursSelectOptions();
                fillDayWeekInMonth();
                fillInWeekDays();
                fillInMonths();
                $('#CronGenTabs a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                    //generate();
                });
                $("#CronGenMainDiv select, #CronGenMainDiv input").change(function (e) {
                    generate();
                });
				
				$('#okBtn').click(function(){
					generate();
					$b.click();
				});
				
				$('#cancelBtn').click(function(){
					$b.click();
				});
            });
            return;
        }
    });
    

    var fillInMonths = function () {
        var days = [
            { text: "1", val: "1" },
            { text: "2", val: "2" },
            { text: "3", val: "3" },
            { text: "4", val: "4" },
            { text: "5", val: "5" },
            { text: "6", val: "6" },
            { text: "7", val: "7" },
            { text: "8", val: "8" },
            { text: "9", val: "9" },
            { text: "10", val: "10" },
            { text: "11", val: "11" },
            { text: "12", val: "12" }
        ];
        $(".months").each(function () {
            fillOptions(this, days);
        });
    };

    var fillOptions = function (elements, options) {
        for (var i = 0; i < options.length; i++)
            $(elements).append("<option value='" + options[i].val + "'>" + options[i].text + "</option>");
    };
    var fillDataOfMinutesAndHoursSelectOptions = function () {
        for (var i = 0; i < 60; i++) {
            if (i < 24) {
                $(".hours").each(function () { $(this).append(timeSelectOption(i)); });
            }
            $(".minutes").each(function () { $(this).append(timeSelectOption(i)); });
        }
    };
    var fillInWeekDays = function () {
        var days = [
            { text: "星期一", val: "MON" },
            { text: "星期二", val: "TUE" },
            { text: "星期三", val: "WED" },
            { text: "星期四", val: "THU" },
            { text: "星期五", val: "FRI" },
            { text: "星期六", val: "SAT" },
            { text: "星期日", val: "SUN" }
        ];
        $(".week-days").each(function () {
            fillOptions(this, days);
        });

    };
    var fillDayWeekInMonth = function () {
        var days = [
            { text: "第一个", val: "1" },
            { text: "第二个", val: "2" },
            { text: "第三个", val: "3" },
            { text: "第四个", val: "4" }
        ];
        $(".day-order-in-month").each(function () {
            fillOptions(this, days);
        });
    };
    var displayTimeUnit = function (unit) {
        if (unit.toString().length == 1)
            return "0" + unit;
        return unit;
    };
    var timeSelectOption = function (i) {
        return "<option id='" + i + "'>" + displayTimeUnit(i) + "</option>";
    };

    var generate = function () {

        var activeTab = $("ul#CronGenTabs li.active a").prop("id");
        var results = "";
        switch (activeTab) {
            case "MinutesTab":
                results = "0 0/" + $("#MinutesInput").val() + " * 1/1 * ? *";
                break;
            case "HourlyTab":
                switch ($("input:radio[name=HourlyRadio]:checked").val()) {
                    case "1":
                        results = "0 0 0/" + $("#HoursInput").val() + " 1/1 * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#AtMinutes").val()) + " " + Number($("#AtHours").val()) + " 1/1 * ? *";
                        break;
                }
                break;
            case "DailyTab":
                switch ($("input:radio[name=DailyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " 1/" + $("#DaysInput").val() + " * ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " ? * MON-FRI *";
                        break;
                }
                break;
            case "WeeklyTab":
                var selectedDays = "";
                $("#Weekly input:checkbox:checked").each(function () { selectedDays += $(this).val() + ","; });
                if (selectedDays.length > 0){
                    selectedDays = selectedDays.substr(0, selectedDays.length - 1);
				} else {
					// 未选择周几，给个默认值：周一
					selectedDays = "MON";
				}
				results = "0 " + Number($("#WeeklyMinutes").val()) + " " + Number($("#WeeklyHours").val()) + " ? * " + selectedDays + " *";
                break;
            case "MonthlyTab":
                switch ($("input:radio[name=MonthlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " " + $("#DayOfMOnthInput").val() + " 1/" + $("#MonthInput").val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " ? 1/" + Number($("#EveryMonthInput").val()) + " " + $("#DayInWeekOrder").val() + "#" + $("#WeekDay").val() + " *";
                        break;
                }
                break;
            case "YearlyTab":
                switch ($("input:radio[name=YearlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " " + $("#YearInput").val() + " " + $("#MonthsOfYear").val() + " ? *";
                        break;
                    case "2":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " ? " + $("#MonthsOfYear2").val() + " " + $("#DayWeekForYear").val() + "#" + $("#DayOrderInYear").val() + " *";
                        break;
                }
                break;
        }

        // Update original control
        inputElement.val(results).change();
        // Update display
        displayElement.val(results);
    };

})(jQuery);

