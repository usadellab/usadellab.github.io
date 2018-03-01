
# MapManJS
pure web implementations of MapMan

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


## Funding
This work was funded in part by the project IdeResModBar by the German Ministry of Education and Research and the EU Horizon2020 project GoodBerry
