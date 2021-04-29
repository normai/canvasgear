#!/usr/bin/env python

# file         : 20190402°0411 canvasgear/build.py
# version      : 20210426°1111
# encoding     : UTF-8-with-BOM
# interpeter   : Python 3.6
# requirements : • Closure Compiler on drive • Java path set • Python path set
# issues       : • Closure Compiler path is hardcoded
#                • The drive letter changing is done quick-n-dirty
#                • After changing CWD, it were nice to restore it afterwards.
#                • Howler.min.js causes two ugly warnings with GoCloCom
# todo         : Provide alternative calling online Closure Compiler online API
# todo         : Create files list programmatically from all riders\*.js files
# note         : In version 20210426°1111, the code is simplified. Some interesting sequences
#                are lost. About how to combine files with a loop over an array of tupels, see
#                www.trekta.biz/svn/canvasgeardev/tags/20190402o0641.canvasgear.v023/combine.py
#                seq 20190402°0443. Remember ref 20190402°0437 'stackoverflow → python concatenate text files'
# re

"""
   This minifies and combines canvasgear.js and its rider scripts to one single file
   canvasgear.combi.js. Dependency: Have Closure Compiler available on local drive.
"""

import os, pathlib, sys

sBinGoCloCom = 'G:/work/gipsydrive/app.composer/trunk/bin/goclocom/closure-compiler-v20210406.jar'

sSp = ' '

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

sCmd = 'java.exe -jar ' + sBinGoCloCom                                 \
      + sSp + './canvasgear.js'                                        \
      + sSp + './riders/canvasgear.Hamster.js'                         \
      + sSp + './riders/canvasgear.MyAlgo.js'                          \
      + sSp + './riders/canvasgear.Noisy1.js'                          \
      + sSp + './riders/canvasgear.Template.js'                        \
      + sSp + './howler/howler.min.js'                                 \
      + sSp + '--js_output_file' + sSp + './canvasgear.combi.js'       \
      + sSp + '--create_source_map' + sSp + './canvasgear.combi.js.map' \
      + sSp + '--formatting' + sSp + 'PRETTY_PRINT'                    \
      + sSp + '--charset UTF-8'                                        \
      + sSp + '--jscomp_off' + sSp + 'uselessCode'                     # [JSC_USELESS_CODE] in howler.min.js

if bBuild :
   print (' - canvasgear building ..')
   os.system(sCmd)
else :
   print (' - canvasgear nothing to do.')

print(' - canvasgear finish.')
