/*
Copyright 2017 Björn Usadel
This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
function ranks(v) {
	var toSort=v.slice();
	var ranks=[];
	for (var i = 0; i < toSort.length; i++) {
		toSort[i] = [toSort[i], i];
	}
	toSort.sort(function(left, right) {
		return left[0] < right[0] ? -1 : 1;
	});
	for (var j = 0; j < toSort.length; j++) {
		ranks.push(toSort[j][1]);
		toSort[j] = toSort[j][0];
	}
	return ranks;
}


function padjustBH(values){ 
	pvalues=values.slice(); //clone array as we muck it up
	var rankings=ranks(pvalues);
	
	for (var i = rankings.length-1; i >=0; i--) { // we start with the highest value
		pvalues[rankings[i]] = Math.min(pvalues[rankings[i]]*pvalues.length/(i+1),1);
		if ((i<rankings.length-1) && (pvalues[rankings[i]] >pvalues[rankings[i+1]] )) { //ensure continuity
			pvalues[rankings[i]]=pvalues[rankings[i+1]];
		}
	}
	
	return pvalues;
	
}


/*var test = [0.4,0.1,0.1,0.3,0.005]
alert(padjust(test));
alert(test);
*/