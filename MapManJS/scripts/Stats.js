/* lanczos_7_c comes from the GSL and was transated into JAVA around 2007 for MapMan  and from JAVA to JS in 2018 */
/* GPL */  

  var lanczos_7_c = [0.99999999999980993227684700473478, 
   676.520368121885098567009190444019, 
   -1259.13921672240287047156078755283, 
   771.3234287776530788486528258894, 
   -176.61502916214059906584551354, 
   12.507343278686904814458936853, 
   -0.13857109526572011689554707, 
   9.984369578019570859563e-6, 
   1.50563273514931155834e-7 ];

    var LogRootTwoPi_ = 0.9189385332046727418;
    var M_E           = 2.7182818284590452353602874713527;

	function lngamma_lanczos( x) {
        var k;
        var Ag;
        var term1, term2;

        x -= 1.0; /* Lanczos writes z! instead of Gamma(z) */

        Ag = lanczos_7_c[0];
        for (k = 1; k <= 8; k++) {
            Ag += lanczos_7_c[k] / (x + k);
        }

        /* (x+0.5)*log(x+7.5) - (x+7.5) + LogRootTwoPi_ + log(Ag(x)) */
        term1 = (x + 0.5) * Math.log((x + 7.5) / M_E);
        term2 = LogRootTwoPi_ + Math.log(Ag);
        return (term1 + (term2 - 7.0));

    }
	
	
	function lnchoose(n,k) {
        if ( (k > n) || (k < 0) ) {
            return 0;
        }
        return lngamma_lanczos(n + 1) - lngamma_lanczos(k + 1)
               - lngamma_lanczos(n - k + 1);
    }
	
	
	
	function hypergeometric(x,m,n,k) {

        if ( !((m > 0) && (n > 0) && (k > 0) && (k <= m + n) && (x <= k)) ) {

            throw ("Numbers not ok"+x + "  m" + m + " n" + n + " k" + k);
        }

        return Math.exp(lnchoose(m,x) + lnchoose(n,k - x) - lnchoose(m + n,k));

    }
	
	function FisherTest(a,b,c,d) {
        if ( (a < 0) || (b < 0) || (c < 0) || (d < 0) ) {
            throw ("values can't be negative");
        }
        if ( (a == 0) && (c == 0) )
            return 1.0;
        if ( (b == 0) && (d == 0) )
            return 1.0;
        var $ERR = 1.0 + 1E-9;
        var x = a;
        var m = a + c;
        var n = b + d;
        var k = a + b;
        var lo = Math.max(0,k - n);
        var hi = Math.min(k,m);
        var h;
        // my @logdc;
        var table = hypergeometric(x,m,n,k);
        var sum = 0;
        for (var z = lo; z <= hi; z++) {
            h = hypergeometric(z,m,n,k);
            if ( h <= table * $ERR ) {
                sum = sum + h;
            }
        }
        return sum;
    }




	
	