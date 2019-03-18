
# MapManJS
pure web implementations of MapMan
over represention analysis
head over to https://usadellab.github.io/MapManJS/test_oo11.html  
a portable rewrite of MapMan in Javascript https://usadellab.github.io/MapManJS/ultramicro.html

## MapMan JS
This is a new implementation of MapMan partially translating the original Java sources  
xml parsing is very rudimentary at the moment and might be in the future become obsolete

## Over Representation Analysis
Starting with enrichment analysis for categories.
This relies on a D3 v3 at the moment.
Genes are counted in both your selection as well as in the reference and then for each Bin a Fisher's exact test for an over(under)representation is run. All p-values are globally corrected using a Benjamini Hochberg type procedure.

Statistics is a partial backport of a Java port from the GSL. 



### ToDo
add other charting capabilities
make table more flexible
port to D3 v5
add hierarchical p-value




### ChangeLog
v 0.11 first public version  
v 0.12 June 2018 added first public MapMan web version 

## Citation
please cite one of the latest MapMan papers or Schwacke, Bolger et al. MapMan and Mercator X4  
Schwacke R, Ponce-Soto GY, Krause K, Bolger AM, Arsova B, Hallab A, Gruden K, 
Stitt M, Bolger ME, Usadel B. MapMan4: a refined protein classification and
annotation framework applicable to multi-omics data analysis. Mol Plant. 2019 Jan
8. pii: S1674-2052(19)30008-5. doi: 10.1016/j.molp.2019.01.003.

## Funding
This work was funded in part by the project IdeResModBar by the German Ministry of Education and Research and the EU Horizon2020 project GoodBerry
