These are just mapping files. This might lead to the eventual retirement of the proprietary MapManstore.  
They are always featuring a header with the line  
BINCODE NAME IDENTIFIER DESCRIPTION TYPE  
then each line describes either a non root level-bin (i.e. no identifier) 
1   PHOTOSYNTHESIS  
or associates an identifier with a BIN e.g.  
1.1 PHOTOSYNTHESIS.LIGHT  'atg1g33333'  'a made up gene' T

BINCODE is a numerical representation of BINS, NAME a textual representation where the ontology is a simple tree and the hierarchy is indicated by dots (.).  
IDENTIFIER gives your specific identifiers, and the DESCRIPTION can provide a textual description. TYPE is always T for transcripts (or genes).

All Files seperate fields by tabstops ("\t")
