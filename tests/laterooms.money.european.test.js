
module("Money European", {

	setup: function() {
		window.laterooms = {
			culture : {
				currency : {
							thousand : '.',
							decimal : ',',
							places : 2
						}
			}
		};
	},

	teardown: function() {
	}

});

test("should return a default currencies when window.laterooms.culture.currency not been set", function() {

	window.laterooms = null;

	equal(new Money('100').formatMoney(),'100.00', 'result should be 100.00' );
	equal(new Money('100000.99').formatMoney(),'100,000.99', 'result should be 100,000.99' );
	equal(new Money('0.99').formatMoney(),'0.99', 'result should be 0.99' );
});

test("should return a currencies when window.laterooms.culture.currency been set to european", function() {
	equal(new Money('100').formatMoney(),'100,00', 'result should be 100,00' );
	equal(new Money('100000.99').formatMoney(),'100.000,99', 'result should be 100.000,99' );
	equal(new Money('0.99').formatMoney(),'0,99', 'result should be 0,99' );
});

test("should return false is numeric", function() {
	equal(new Money('RACK RATE').isCurrency(), false, 'result should be false' );
	equal(new Money('CLOSE OUT').isCurrency(), false, 'result should be false' );
	equal(new Money('SOME RUBBISH').isCurrency(), false, 'result should be false' );
	equal(new Money('1.1').isCurrency(), false, 'result should be false' );
	equal(new Money('1.10').isCurrency(), false, 'result should be false' );
	equal(new Money('1.10.000').isCurrency(), false, 'result should be false' );
});

test("should return true is numeric", function() {
	equal(new Money('1').isCurrency(), true, 'result should be true' );
	equal(new Money('10').isCurrency(), true, 'result should be true' );
	equal(new Money('100').isCurrency(), true, 'result should be true' );
	equal(new Money('1000').isCurrency(), true, 'result should be true' );
	equal(new Money('1.000').isCurrency(), true, 'result should be true' );
	equal(new Money('1.000.000').isCurrency(), true, 'result should be true' );
	equal(new Money('1,00').isCurrency(), true, 'result should be true' );
	equal(new Money('10,00').isCurrency(), true, 'result should be true' );
	equal(new Money('100,00').isCurrency(), true, 'result should be true' );
	equal(new Money('1000,00').isCurrency(), true, 'result should be true' );
	equal(new Money('10,50').isCurrency(), true, 'result should be true' );
	equal(new Money('9.000,99').isCurrency(), true, 'result should be true' );
	equal(new Money('9.000,50').isCurrency(), true, 'result should be true' );
	equal(new Money('9.999.000,99').isCurrency(), true, 'result should be true' );
	equal(new Money('9.999.999.000,50').isCurrency(), true, 'result should be true' );
	equal(new Money('1,1').isCurrency(), true, 'result should be true' );

});

test("should get money value for european culture", function() {
	equal(new Money('100').getValue(), 100, 'result should be 100' );
	equal( new Money('10,50').getValue(), 10.50, 'result should be 10.50' );
	equal(new Money('1.000').getValue(), 1000, 'result should be 1000' );
	equal(new Money('1.000,50').getValue(), 1000.50, 'result should be 1000.50' );
	equal(new Money('1.000.000,50').getValue(), 1000000.50, 'result should be 1000000.50' );
});

test("should get money value for european culture with empty thousand seperator", function() {

	window.laterooms = {
				culture : {
					currency : {
								thousand : ' ',
								decimal : ',',
								places : 2
							}
				}
			};

	equal(new Money('100').getValue(), 100, 'result should be 100' );
	equal(new Money('1050').getValue(), 1050, 'result should be 10.50' );
	equal(new Money('1000').getValue(), 1000, 'result should be 1000' );
	equal(new Money('1000,50').getValue(), 1000.50, 'result should be 1000.50' );
	equal(new Money('1000000,50').getValue(), 1000000.50, 'result should be 1000000.50' );

	equal(new Money('1 500').isCurrency(), true, 'result should be true' );

});