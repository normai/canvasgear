#!/usr/bin/env python

# id : 20190402°0411 canvasgear/build.py
# version : 20210426°1111
# encoding : UTF-8-with-BOM
# interpeter : Python 3.6
# issues: • Local Closure Compiler path is hardcoded
#    • The drive letter changing is done quick-n-dirty
#    • After changing CWD, it were nice to restore it afterwards.
#    • Howler.min.js causes two very ugly warnings with GoCloCom
# todo : Provide alternative calling online Closure Compiler online API
# todo : Create files list programmatically from all riders\*.js files
# note : In version 20210426°1111, the code is simplified. Some interesting sequences
#        are lost. About how to combine files with a loop over an array of tupels, see
#        www.trekta.biz/svn/canvasgeardev/tags/20190402o0641.canvasgear.v023/combine.py
#        seq 20190402°0443. Remember ref 20190402°0437 'stackoverflow → python concatenate text files'

"""
   This minifies and combines canvasgear.js and its rider scripts one single file
   canvasgear.combi.js. Dependency: Have Closure Compiler available on local drive.
"""

import os, pathlib, sys

sBinGoCloCom = 'G:/work/gipsydrive/app.composer/trunk/bin/goclocom/closure-compiler-v20210406.jar'

print ('*** canvasgear/build.py ***')

os.chdir(os.path.dirname(__file__))

# Get time of target file
p = pathlib.Path('canvasgear.combi.js')                                # using pathlib just for fun
if p.is_file() :
   tTgt = os.path.getmtime('canvasgear.combi.js') 
else :
   tTgt = 0

# Is any of the source files younger than the target file?
bBuild = False
if (     tTgt < os.path.getmtime('./canvasgear.js')
      or tTgt < os.path.getmtime('./riders/canvasgear.Hamster.js')
      or tTgt < os.path.getmtime('./riders/canvasgear.MyAlgo.js')
      or tTgt < os.path.getmtime('./riders/canvasgear.Noisy1.js')
      or tTgt < os.path.getmtime('./riders/canvasgear.Template.js')
      or tTgt < os.path.getmtime('./howler/howler.min.js')
       ) :
   bBuild = True

sCmd = 'java.exe -jar ' + sBinGoCloCom + ' ./canvasgear.js ./riders/canvasgear.Hamster.js ./riders/canvasgear.MyAlgo.js ./riders/canvasgear.Noisy1.js ./riders/canvasgear.Template.js ./howler/howler.min.js --js_output_file ./canvasgear.combi.js --create_source_map ./canvasgear.combi.js.map --formatting PRETTY_PRINT --charset UTF-8'

if bBuild :
   print (' - canvasgear building ..')
   os.system(sCmd)
else :
   print (' - canvasgear nothing to do.')

print(' - canvasgear finish.')
