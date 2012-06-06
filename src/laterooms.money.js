
(function(global) {

function Money(value, thousand, decimal, places) {
	if (value instanceof Money) {
		return val;
	}
	this._value = value;
	this._thousand = this.getThousandSeperator();
	this._decimal = this.getDecimalSeperator();
	this._places = this.getPlaces();
	this._realValue = this.parseCurrency(value);
};

Money.prototype = {
	parseCurrency : function(value){
		if(!this.isCurrency())
			return NaN;

		var thousandRemoved = value.toString().replace(new RegExp(this._regEscape(this._thousand),'g'), '');
		var decimalRemoved = thousandRemoved.replace(this._regEscape(this._decimal), '.');
		return parseFloat(decimalRemoved) ;
	},

	_regEscape : function(valueToEscape){

		var regExp = new RegExp('\\s');

		if(valueToEscape.match(regExp))
			return '\\s';

		return valueToEscape === '.' ? '\\.' : valueToEscape;
	},

	formatMoney : function() {
		var number = this._value,
			negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(this._places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return negative + (j ? i.substr(0, j) + this._thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + this._thousand) + (this._places ? this._decimal + Math.abs(number - i).toFixed(this._places).slice(2) : "");
	},

	getThousandSeperator : function(){
		if(this.isLocaleSet()){
			return window.laterooms.culture.currency.thousand;
		}
		return ",";
	},

	getDecimalSeperator : function(){
		if(this.isLocaleSet()){
			return window.laterooms.culture.currency.decimal;
		}
		return ".";
	},

	getPlaces : function(){
		var places;
		if(this.isLocaleSet()){
			places = window.laterooms.culture.currency.places;
		}
		else{
			places = 2;
		}
		return !isNaN(places = Math.abs(places)) ? places : 2;
	},

	 isLocaleSet : function(){
		 return window.laterooms && window.laterooms.culture && window.laterooms.culture.currency;
	 },

	 getValue : function(){
		return this._realValue;
	 },

	 isCurrency : function() {

		if(this._value.toString().length > 	20)
			return false;

		var regExp = new RegExp('(?:^\\d{1,3}(?:' + this._regEscape(this._thousand) + '?\\d{3})*(?:' + this._regEscape(this._decimal) + '\\d{1,2})?$)');
		var result = this._value.toString().match(regExp);
		return result !== null;
	}


};

// exports
global.Money = Money;

}(this));

