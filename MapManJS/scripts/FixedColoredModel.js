
    const BlueRed={ no: 0, name :"+Blue Red- *MM"};
    const RedBlue={no: 1, name:"+Red Blue-"};
    const BlueGreen={no : 2, name:"+Blue Green-"};
    const GreenBlue={no : 3, name:"+Green Blue-"};
    const RedGreen={no : 4,name: "+Red Green-"};
    const GreenRed={no : 5, name:"+Green Red-"};
    const BlueYellow={no : 6, name:"+Blue Yellow-"};
    const YellowBlue={no : 7, name:"+Yellow Blue-"};
    const RedBlackGreen={no : 8, name: "+Red black Green-"};
	
    const GreenBlackRed={no : 9,name: "+Green black Red-"};
    const BlueBlackRed={no : 10, name:"+Blue black Red-"};
    const RedBlackBlue={no : 11, name:"+Red black Blue-"};
    const pastellBlueRed = {no: 64, name: "+pastellBlue Red-"};

    /** Fixed value which determines how to derive a saturated color from a bright color */
const COLORBORDER = 0.65;
modelno= 0;


    function calcColor(value) {
        // calculate the color of the present value
        var component1 = 0;
        var component2 = 0;
        var component3 = 0;
		var model=modelno;
        // we are going over white
       // FixedColorModel model = this;
        if ( modelno < RedBlackGreen.no ) {
            if ( value >= 1 ) { // positive saturation
                component1 = 0;
                component2 = 0;
                component3 = dark(1.0);
            } else if ( value <= -1 ) { // negative saturation
                component1 = dark(1.0);
                component2 = 0;
                component3 = 0;
            } else if ( value >= 0 ) { // positive scaledValue
                value = value * value;
                component1 = 1.0 - getvalue(value);
                component2 = 1.0 - getvalue(value);
                component3 = dark(value);
            } else if ( value < 0 ) { // negative scaledValue
                value = value * value;
                component1 = dark(value);
                component2 = 1.0 - getvalue(value);
                component3 = 1.0 - getvalue(value);
            }
            // we do have a model going over pastel
        } else if ( model.no >= pastellBlueRed.no ) {
            if ( value >= 1 ) {
                value = 1;
            }
            if ( value < -1 ) {
                value = -1;
            }
            if ( value >= 0 ) { // positive scaledValue
                component1 = 1.0 - value;
                component3 = 1.0;
                component2 = 1.0 - value;
            }
            if ( value < 0 ) { // positive scaledValue
                component1 = 1.0;
                component3 = 1.0 + value;
                component2 = 1.0 + value;
            }
             model = modelno - pastellBlueRed.no; // finalCalc
            // like
            // normal

            // we do have a model going over black
        } else {
            if ( value > 1 )
                value = 1;
            else if ( value < -1 )
                value = -1;

            if ( value <= 0 ) {
                value = -value;
                component1 = 0.0;
                component2 = 0.0;
                component3 = value;
            } else {
                component1 = 0.0;
                component2 = value;
                component3 = 0.0;

            }
        }
		//console.log("model"+model+pastellBlueRed.no);
        switch (model) {

            case BlueRed.no:
                return [Math.floor(component1*255), Math.floor(component2*255), Math.floor(component3*255)];
            case RedBlue.no:
                return new Color(component3, component2, component1);
            case BlueGreen.no:
                return new Color(component2, component1, component3);
            case GreenBlue.no:
                return new Color(component2, component3, component1);
            case RedGreen.no:
                return new Color(component3, component1, component2);
            case GreenRed.no:
                return new Color(component1, component3, component2);
            case BlueYellow.no:
                return new Color(component1, component1, component3);
            case YellowBlue.no:
                return new Color(component3, component3, component1);
            case RedBlackGreen.no:
                return new Color(component2, component3, component1);
            case GreenBlackRed.no:
                return new Color(component3, component2, component1);
            case BlueBlackRed.no:
                return new Color(component3, component1, component2);
            case RedBlackBlue.no:
                return new Color(component2, component1, component3);
            default:
                return ("black");
        }
    }

    function getvalue( value) {
      if (value <= COLORBORDER) return  value / COLORBORDER;
	  return 1.0;
    }

    function dark( value) {
        if (value <= COLORBORDER) return 1.0;
		return 1.0 + COLORBORDER - value;
    }


