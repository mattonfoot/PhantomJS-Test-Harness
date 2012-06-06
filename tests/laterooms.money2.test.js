
module("Money2 British", {

	setup: function() {
		window.laterooms = {
			culture : {
				currency : {
							thousand : ',',
							decimal : '.',
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
	equal( new Money('0.99').formatMoney(),'0.99', 'result should be 0.99' );
});

test("should return a currencies when window.laterooms.culture.currency been set to british", function() {

	equal(new Money('100').formatMoney(),'100.00', 'result should be 100.00' );
	equal( new Money('100000.99', ',' ,'.', 2).formatMoney(),'100,000.99', 'result should be 100,000.99' );
	equal( new Money('0.99', ',' ,'.', 2).formatMoney(),'0.99', 'result should be 0.99' );
});

test("should return false is numeric", function() {

	equal(new Money('RACK RATE').isCurrency(), false, 'result should be false' );
	equal(new Money('CLOSE OUT').isCurrency(), false, 'result should be false' );
	equal(new Money('SOME RUBBISH').isCurrency(), false, 'result should be false' );
	equal(new Money('1,0').isCurrency(), false, 'result should be false' );
	equal(new Money('1,00').isCurrency(), false, 'result should be false' );
	equal(new Money('1,00,000').isCurrency(), false, 'result should be false' );
	equal(new Money('1,jj000,000').isCurrency(), false, 'result should be false' );
	equal(new Money('1000000000000000000000000000000000000000000000.00').isCurrency(), false, 'result should be false' );
});

test("should return true is numeric", function() {

	equal(new Money('1').isCurrency(), true, 'result should be true' );
	equal(new Money('10').isCurrency(), true, 'result should be true' );
	equal(new Money('100').isCurrency(), true, 'result should be true' );
	equal(new Money('1000').isCurrency(), true, 'result should be true' );
	equal(new Money('1,000').isCurrency(), true, 'result should be true' );
	equal(new Money('1,000,000').isCurrency(), true, 'result should be true' );
	equal(new Money('1.00').isCurrency(), true, 'result should be true' );
	equal(new Money('10.00').isCurrency(), true, 'result should be true' );
	equal(new Money('100.00').isCurrency(), true, 'result should be true' );
	equal(new Money('1,000.00').isCurrency(), true, 'result should be true' );
	equal(new Money('10.50').isCurrency(), true, 'result should be true' );
	equal(new Money('9,000.99').isCurrency(), true, 'result should be true' );
	equal(new Money('9,000.50').isCurrency(), true, 'result should be true' );
	equal(new Money('9,999,000.99').isCurrency(), true, 'result should be true' );
	equal(new Money('9,999,999,000.50').isCurrency(), true, 'result should be true' );
	equal(new Money('1.1').isCurrency(), true, 'result should be true' );

});

test("should get money value for british", function() {

	var objectUnderTest = new Money('100');
	equal( objectUnderTest.getValue(), 100, 'result should be 100' );

	var objectUnderTest1 = new Money('10.50');
	equal( objectUnderTest1.getValue(), 10.50, 'result should be 10.50' );

	var objectUnderTest2 = new Money('1,000');
	equal( objectUnderTest2.getValue(), 1000, 'result should be 1000' );

	var objectUnderTest3 = new Money('1,000.50');
	equal( objectUnderTest3.getValue(), 1000.50, 'result should be 1000.50' );

	var objectUnderTest3 = new Money('1,000,000.50');
	equal( objectUnderTest3.getValue(), 1000000.50, 'result should be 1000000.50' );

});

test("should get money value for european with . for thousand", function() {

	window.laterooms = {
		culture : {
			currency : {
						thousand : '.',
						decimal : ',',
						places : 2
					}
		}
	};
	var objectUnderTest = new Money('101.000');
	equal( objectUnderTest.getValue(), 101000, 'result should be 101' );

});